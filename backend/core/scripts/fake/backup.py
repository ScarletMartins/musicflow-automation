import os
import shutil
import sys
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")


def executar_backup():
    origem = "db.sqlite3"
    destino = f"backup/backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.sqlite3"

    os.makedirs("backup", exist_ok=True)

    try:
        shutil.copyfile(origem, destino)
        logging.info(f"BACKUP realizado com sucesso: {destino}")
    except Exception as e:
        logging.error(f"Erro ao realizar backup: {e}")
        sys.exit(1)


if __name__ == "__main__":
    executar_backup()
