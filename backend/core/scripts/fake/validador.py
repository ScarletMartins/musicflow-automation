import hashlib
import logging


def verificar_integridade(caminho="db.sqlite3"):
    try:
        with open(caminho, "rb") as f:
            hash_value = hashlib.sha256(f.read()).hexdigest()
        logging.info(f"Hash gerado com sucesso: {hash_value}")
        print("✅ Validação concluída. A integridade do arquivo foi confirmada com sucesso.")
        return {"status": "ok", "hash": hash_value}
    except FileNotFoundError:
        logging.error("Arquivo não encontrado.")
        print("❌ Arquivo não encontrado. Ação necessária por parte dos administradores.")
        return {"status": "erro", "mensagem": "Arquivo não encontrado"}
    except Exception as e:
        logging.error(f"Erro inesperado: {e}")
        print("❌ Erro inesperado. Ação necessária por parte dos administradores.")
        return {"status": "erro", "mensagem": str(e)}


if __name__ == "__main__":
    verificar_integridade()
