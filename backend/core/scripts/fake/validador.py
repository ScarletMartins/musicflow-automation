import hashlib
import sys
import logging

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")


def verificar_integridade(caminho="db.sqlite3"):
    try:
        with open(caminho, "rb") as f:
            hash_value = hashlib.sha256(f.read()).hexdigest()
        logging.info(f"Hash gerado com sucesso: {hash_value}")
    except FileNotFoundError:
        logging.error("Arquivo não encontrado.")
        sys.exit(1)
    except Exception as e:
        logging.error(f"Erro inesperado: {e}")
        sys.exit(1)


if __name__ == "__main__":
    verificar_integridade()
