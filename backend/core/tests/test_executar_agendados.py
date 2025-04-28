import pytest
from django.contrib.auth import get_user_model
from django.utils import timezone
from core.models import ProcessoAutomatizado, ExecucaoProcesso
from core.scripts.executar_agendados import executar_agendados

User = get_user_model()


@pytest.mark.django_db
def test_execucao_processos_sucesso():
    user = User.objects.create_user(username="testuser", password="12345")
    agora = timezone.now()

    processo = ProcessoAutomatizado.objects.create(
        nome="Teste Script Sucesso",
        descricao="Simula execução de sucesso",
        comando="echo 'Hello World'",
        ativo=True,
        data_execucao_agendada=agora,
        email_alerta=None,
        criado_por=user,
    )

    executar_agendados()

    execucoes = ExecucaoProcesso.objects.filter(processo=processo)
    assert execucoes.exists()
    assert execucoes.first().status == "SUCESSO"


@pytest.mark.django_db
def test_execucao_processos_falha():
    user = User.objects.create_user(username="testuser", password="12345")
    agora = timezone.now()

    processo = ProcessoAutomatizado.objects.create(
        nome="Teste Script Falha",
        descricao="Simula execução de falha",
        comando="invalid_command%",
        ativo=True,
        data_execucao_agendada=agora,
        email_alerta=None,
        criado_por=user,
    )

    executar_agendados()

    execucoes = ExecucaoProcesso.objects.filter(processo=processo)
    assert execucoes.exists()
    assert execucoes.first().status == "FALHA"
