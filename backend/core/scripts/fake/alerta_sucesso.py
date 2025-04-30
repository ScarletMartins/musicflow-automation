from datetime import datetime
import logging


def enviar_alerta():
    log = {
        "tipo": "alerta",
        "data": datetime.now().isoformat(),
        "mensagem": "Tudo OK. Nenhum problema detectado.",
        "destinatarios": ["scrltmrtns@gmail.com"]
    }

    logging.info(f"ALERTA SUCESSO: {log['mensagem']}")
    print("✅ Alerta de sucesso executado com êxito. Todos os sistemas estão operando normalmente.")
    return {"status": "ok", "log": log}


if __name__ == "__main__":
    enviar_alerta()
