import os
import sys
import django
from datetime import timedelta
from django.utils import timezone

# Corrige o path para o manage.py (subindo dois níveis)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(BASE_DIR, "../../"))
sys.path.append(ROOT_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()


from django.contrib.auth.models import User
from core.models import ProcessoAutomatizado

user = User.objects.first()
print("Usuário:", user)

processos = [
    {
        "nome": "Backup diário",
        "descricao": "Simula backup automático diário do banco.",
        "comando": "python core/scripts/fake/backup.py"
    },
    {
        "nome": "Relatório mensal",
        "descricao": "Simula geração de relatório de performance.",
        "comando": "python core/scripts/fake/relatorio.py"
    },
    {
        "nome": "Verificação de integridade",
        "descricao": "Executa verificação fake nos dados.",
        "comando": "python core/scripts/fake/validador.py"
    },
    {
        "nome": "Alerta de erro crítico",
        "descricao": "Dispara alerta fake para a equipe.",
        "comando": "python core/scripts/fake/alerta.py"
    },
]

for i, p in enumerate(processos):
    processo = ProcessoAutomatizado.objects.create(
        nome=p["nome"],
        descricao=p["descricao"],
        comando=p["comando"],
        ativo=True,
        criado_por=user,
        data_execucao_agendada=timezone.now() + timedelta(seconds=60 * (i + 1))
    )
    print(">> Criado:", processo.nome)
