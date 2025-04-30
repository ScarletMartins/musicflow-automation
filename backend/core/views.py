from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework import status, viewsets, permissions
from .models import ProcessoAutomatizado, ExecucaoProcesso
from .serializers import ProcessoSerializer, ExecucaoProcessoSerializer
from core.utils.email import enviar_email_execucao
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from decouple import config
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def status_view(request):
    return Response({
        "status": "ok",
        "usuario": request.user.username,
        "mensagem": "Você está autenticado 🎉"
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"erro": "Usuário e senha são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"erro": "Usuário já existe."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({"mensagem": "Usuário criado com sucesso!"}, status=status.HTTP_201_CREATED)


class ProcessoViewSet(viewsets.ModelViewSet):
    queryset = ProcessoAutomatizado.objects.all().order_by('-criado_em')
    serializer_class = ProcessoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(criado_por=self.request.user)


class ExecucaoProcessoViewSet(viewsets.ModelViewSet):
    queryset = ExecucaoProcesso.objects.all().order_by('-data_execucao')
    serializer_class = ExecucaoProcessoSerializer


@csrf_exempt
def executar_agendados_view(request):
    token = request.headers.get("X-CRON-TOKEN")
    token_esperado = config("PROCESSOS_CRON_TOKEN")

    if token != token_esperado:
        return JsonResponse({"error": "Token inválido"}, status=403)

    agora = timezone.now()

    processos = ProcessoAutomatizado.objects.filter(
        ativo=True,
        data_execucao_agendada__lte=agora
    )

    resultados = []

    for processo in processos:
        saida = f"Processo '{processo.nome}' executado automaticamente em {agora.strftime('%d/%m/%Y %H:%M:%S')}."

        ExecucaoProcesso.objects.create(
            processo=processo,
            status="SUCESSO",
            saida=saida,
            resumo=processo.descricao[:200]
        )

        processo.data_execucao_agendada = None
        processo.save()

        if processo.email_alerta:
            try:
                mensagem = f"""
                    <h2>Execução Agendada Concluída</h2>
                    <p>O processo <strong>{processo.nome}</strong> foi executado automaticamente em {agora.strftime('%d/%m/%Y %H:%M:%S')}.</p>
                    <p><strong>Status:</strong> SUCESSO</p>
                    <p><strong>Resumo:</strong> {processo.descricao[:200]}</p>
                """
                enviar_email_execucao(
                    destinatario=processo.email_alerta,
                    assunto=f"[MusicFlow] Execução de {processo.nome}",
                    mensagem_html=mensagem
                )
                resultados.append(f"{processo.nome}: Email enviado.")
            except Exception as e:
                resultados.append(f"{processo.nome}: Erro ao enviar email: {e}")
        else:
            resultados.append(f"{processo.nome}: Executado sem email.")

    return JsonResponse({"mensagem": "Execuções processadas", "resultados": resultados})


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

    def post(self, request, *args, **kwargs):
        id_token = request.data.get("credential")
        if not id_token:
            return Response({"error": "Token ausente."}, status=status.HTTP_400_BAD_REQUEST)

        mutable_data = request.data.copy()
        mutable_data["id_token"] = id_token
        mutable_data["access_token"] = id_token
        request._full_data = mutable_data

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200 and response.data.get('key'):
            user = self.request.user
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            })

        return response


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
