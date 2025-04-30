import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")


def executar_backup():
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    nome_backup_simulado = f"backup_simulado_{timestamp}.sqlite3"

    logging.info(f"Backup simulado gerado com sucesso: {nome_backup_simulado}")
    return {
        "status": "ok",
        "arquivo": nome_backup_simulado,
        "mensagem": "Backup simulado com sucesso."
    }


if __name__ == "__main__":
    executar_backup()
