from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from .views import status_view, register_view, ProcessoViewSet, ExecucaoProcessoViewSet, criar_usuario_teste

router = DefaultRouter()
router.register(r'processos', ProcessoViewSet)
router.register(r'execucoes', ExecucaoProcessoViewSet)

urlpatterns = [
    path('status/', status_view),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_view),
    path("criar-usuario/", criar_usuario_teste),
]

urlpatterns += router.urls
