import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")


def verificar_integridade():
    hash_simulado = f"simulacao-{datetime.now().strftime('%H%M%S')}-hash123abc"

    logging.info(f"Hash simulado: {hash_simulado}")
    return {
        "status": "ok",
        "mensagem": "Verificação simulada concluída.",
        "hash": hash_simulado
    }


if __name__ == "__main__":
    verificar_integridade()
