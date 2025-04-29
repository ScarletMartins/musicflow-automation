from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from .views import status_view, register_view, ProcessoViewSet, ExecucaoProcessoViewSet, executar_agendados_view, GoogleLogin

router = DefaultRouter()
router.register(r'processos', ProcessoViewSet)
router.register(r'execucoes', ExecucaoProcessoViewSet)

urlpatterns = [
    path('status/', status_view),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_view),
    path("executar-agendados/", executar_agendados_view),
    path("auth/google/", GoogleLogin.as_view(), name="google_login"),
]

urlpatterns += router.urls
