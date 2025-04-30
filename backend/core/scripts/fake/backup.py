import os
import shutil
from datetime import datetime


def executar_backup():
    origem = "db.sqlite3"
    destino = f"backup/backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.sqlite3"

    os.makedirs("backup", exist_ok=True)

    try:
        shutil.copyfile(origem, destino)
        print(f">> BACKUP realizado: {destino}")
        return {"status": "ok", "arquivo": destino}
    except Exception as e:
        print(">> ERRO no backup:", e)
        return {"status": "erro", "mensagem": str(e)}


if __name__ == "__main__":
    executar_backup()
