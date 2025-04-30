import logging
import sys
from datetime import datetime

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")


def enviar_alerta():
    log = {
        "tipo": "alerta",
        "data": datetime.now().isoformat(),
        "mensagem": "Alerta simulado enviado para os administradores.",
        "destinatarios": ["scrltmrtns@gmail.com"]
    }

    logging.info(f"ALERTA: {log['mensagem']}")
    sys.exit(1)  # Simula erro proposital para forçar status de FALHA


if __name__ == "__main__":
    enviar_alerta()
