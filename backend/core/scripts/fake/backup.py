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
        print("✅ Backup concluído com sucesso. O arquivo foi salvo na pasta designada.")
        return {"status": "ok", "arquivo": destino}
    except Exception as e:
        logging.error(f"Erro ao realizar backup: {e}")
        print("❌ Erro crítico ao executar o backup. Ação necessária por parte dos administradores.")
        return {"status": "erro", "mensagem": str(e)}


if __name__ == "__main__":
    executar_backup()
