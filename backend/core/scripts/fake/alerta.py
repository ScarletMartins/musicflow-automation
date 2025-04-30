from datetime import datetime


def enviar_alerta():
    log = {
        "tipo": "alerta",
        "data": datetime.now().isoformat(),
        "mensagem": "Alerta simulado enviado para os administradores.",
        "destinatarios": ["scrltmrtns@gmail.com"]
    }

    print(">> ALERTA:", log["mensagem"])
    return {"status": "simulado", "log": log}


if __name__ == "__main__":
    enviar_alerta()
