from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework import status, viewsets, permissions
from .models import ProcessoAutomatizado, ExecucaoProcesso
from .serializers import ProcessoSerializer, ExecucaoProcessoSerializer
from django.http import JsonResponse


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

    def perform_create(self, serializer):
        serializer.save(criado_por=self.request.user)


class ExecucaoProcessoViewSet(viewsets.ModelViewSet):
    queryset = ExecucaoProcesso.objects.all().order_by('-data_execucao')
    serializer_class = ExecucaoProcessoSerializer


def criar_usuario_teste(request):
    if not User.objects.filter(username='admin').exists():
        User.objects.create_user('admin', 'admin@email.com', 'senha123')
        return JsonResponse({'status': 'Usuário criado'})
    return JsonResponse({'status': 'Já existe'})
