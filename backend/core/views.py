from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework import status, viewsets, permissions
from .models import ProcessoAutomatizado, ExecucaoProcesso
from .serializers import ProcessoSerializer, ExecucaoProcessoSerializer
from core.scripts.executar_agendados import executar_agendados
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from decouple import config
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from core.utils.scripts import listar_scripts_fake


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

    executar_agendados()

    return JsonResponse({"mensagem": "Execuções simuladas com subprocess foram processadas."})


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def scripts_disponiveis_view(request):
    scripts = listar_scripts_fake()
    return Response(scripts)