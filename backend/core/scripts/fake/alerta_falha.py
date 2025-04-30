import logging
import sys


def enviar_alerta():
    logging.error("ALERTA FALHA: Erro crítico simulado!")
    sys.exit(1)


if __name__ == "__main__":
    enviar_alerta()
