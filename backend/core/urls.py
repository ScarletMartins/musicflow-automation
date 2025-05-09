from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from .views import status_view, register_view, ProcessoViewSet, ExecucaoProcessoViewSet, executar_agendados_view, GoogleLogin, CustomTokenObtainPairView, scripts_disponiveis_view

router = DefaultRouter()
router.register(r'processos', ProcessoViewSet)
router.register(r'execucoes', ExecucaoProcessoViewSet)

urlpatterns = [
    path('status/', status_view),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_view),
    path("executar-agendados/", executar_agendados_view),
    path("auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("scripts/", scripts_disponiveis_view, name="scripts_disponiveis"),
]

urlpatterns += router.urls
