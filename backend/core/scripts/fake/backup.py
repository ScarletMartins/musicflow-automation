import os
import shutil
from datetime import datetime
import logging


def executar_backup():
    origem = "db.sqlite3"
    destino = f"backup/backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.sqlite3"
    os.makedirs("backup", exist_ok=True)

    try:
        shutil.copyfile(origem, destino)
        logging.info(f"BACKUP realizado: {destino}")
        print("✅ Backup concluído com sucesso.")
        return {"status": "ok", "arquivo": destino}
    except Exception as e:
        logging.error(f"Erro ao realizar backup: {e}")
        print("❌ Erro crítico ao executar o backup.")
        return {"status": "erro", "mensagem": str(e)}


if __name__ == "__main__":
    resultado = executar_backup()
    if resultado["status"] != "ok":
        sys.exit(1)
