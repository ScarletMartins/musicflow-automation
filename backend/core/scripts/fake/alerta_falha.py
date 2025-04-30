import logging
import sys


def enviar_alerta():
    logging.error("ALERTA FALHA: Erro crítico simulado!")
    print("❌ Erro crítico simulado. Ação necessária por parte dos administradores.")
    sys.exit(1)


if __name__ == "__main__":
    enviar_alerta()
