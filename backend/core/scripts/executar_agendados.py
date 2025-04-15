import sys
import os
import django
from django.utils import timezone

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from core.models import ProcessoAutomatizado, ExecucaoProcesso
from core.utils.email import enviar_email_execucao

print(">> Executando verificação de processos agendados...", flush=True)

agora = timezone.now()

processos = ProcessoAutomatizado.objects.filter(
    ativo=True,
    data_execucao_agendada__lte=agora
)

for processo in processos:
    print(f"Executando: {processo.nome}", flush=True)

    try:
        # Simula execução com sucesso
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
            enviar_email_execucao(
                destinatario=processo.email_alerta,
                assunto=f"[MusicFlow] Execução de {processo.nome}",
                mensagem=saida
            )
            print(">> E-mail enviado com sucesso.", flush=True)

    except Exception as e:
        erro_msg = f"Erro ao executar o processo '{processo.nome}': {str(e)}"
        print(erro_msg, flush=True)

        ExecucaoProcesso.objects.create(
            processo=processo,
            status="FALHA",
            saida=erro_msg,
            resumo=processo.descricao[:200]
        )

        if processo.email_alerta:
            try:
                enviar_email_execucao(
                    destinatario=processo.email_alerta,
                    assunto=f"[MusicFlow] Falha na execução de {processo.nome}",
                    mensagem=erro_msg
                )
                print(">> E-mail de falha enviado com sucesso.", flush=True)
            except Exception as e2:
                print(f"Erro ao enviar e-mail de falha: {e2}", flush=True)
