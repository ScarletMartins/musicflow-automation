import sys
import os
import django
import logging
import subprocess
from django.utils import timezone

# Setup do Django
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from core.models import ProcessoAutomatizado, ExecucaoProcesso
from core.utils.email import enviar_email_execucao

# Setup do Logging
LOG_DIR = os.path.join(BASE_DIR, "logs")
os.makedirs(LOG_DIR, exist_ok=True)

logging.basicConfig(
    filename=os.path.join(LOG_DIR, "executar_agendados.log"),
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)


def executar_agendados():
    logging.info(">> Iniciando verificação de processos agendados...")
    agora = timezone.now()

    processos = ProcessoAutomatizado.objects.filter(
        ativo=True,
        data_execucao_agendada__lte=agora
    )

    for processo in processos:
        logging.info(f"Executando: {processo.nome}")
        relatorio_path = None

        try:
            try:
                resultado = subprocess.run(
                    processo.comando,
                    shell=True,
                    check=True,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True
                )
                saida = resultado.stdout or "(Sem saída)"
                status_execucao = "SUCESSO"
            except subprocess.CalledProcessError as e:
                saida = e.stderr or str(e)
                status_execucao = "FALHA"

            if "RELATÓRIO gerado:" in saida:
                for linha in saida.splitlines():
                    if linha.startswith(">> RELATÓRIO gerado:"):
                        relatorio_path = linha.split(":", 1)[-1].strip()

            ExecucaoProcesso.objects.create(
                processo=processo,
                status=status_execucao,
                saida=saida,
                resumo=processo.descricao[:200]
            )

            if processo.email_alerta:
                try:
                    assunto = f"[MusicFlow] Execução de {processo.nome} - {status_execucao}"
                    mensagem = (
                        f"📄 *Resumo da Execução*\n\n"
                        f"🛠️ Processo: {processo.nome}\n"
                        f"🕒 Horário: {agora.strftime('%d/%m/%Y %H:%M:%S')}\n"
                        f"📌 Status: {status_execucao}\n\n"
                        f"💬 Saída:\n{saida}"
                    )
                    enviar_email_execucao(
                        destinatario=processo.email_alerta,
                        assunto=assunto,
                        mensagem=mensagem,
                        anexo_path=relatorio_path
                    )
                    logging.info(f"E-mail enviado para {processo.email_alerta}.")
                except Exception as e2:
                    logging.error(f"Erro ao enviar e-mail: {e2}")

            processo.data_execucao_agendada = None
            processo.save()

        except Exception as e:
            erro_msg = f"Erro ao executar o processo '{processo.nome}': {str(e)}"
            logging.error(erro_msg)

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
                        assunto=f"[MusicFlow] Execução de {processo.nome} - FALHA",
                        mensagem=erro_msg
                    )
                except Exception as e2:
                    logging.error(f"Erro ao enviar e-mail de falha: {e2}")
