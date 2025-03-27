import sys
import os
import time
import django

# Caminho absoluto da raiz do projeto
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)

# Configura variável de ambiente para o Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Inicializa o Django
django.setup()

print(">> Iniciando verificação de processos agendados...", flush=True)

from django.utils import timezone
from core.models import ProcessoAutomatizado, ExecucaoProcesso

while True:
    agora = timezone.now()

    processos = ProcessoAutomatizado.objects.filter(
        ativo=True,
        data_execucao_agendada__lte=agora
    )

    for processo in processos:
        print(f"Executando: {processo.nome}", flush=True)

        saida = f"Processo '{processo.nome}' executado automaticamente em {agora.strftime('%d/%m/%Y %H:%M:%S')}."

        ExecucaoProcesso.objects.create(
            processo=processo,
            status="SUCESSO",
            saida=saida,
            resumo=processo.descricao[:200]
        )

        processo.data_execucao_agendada = None
        processo.save()

    time.sleep(60)
