import hashlib


def verificar_integridade(caminho="db.sqlite3"):
    try:
        with open(caminho, "rb") as f:
            hash_value = hashlib.sha256(f.read()).hexdigest()

        print(">> VERIFICAÇÃO concluída. Hash gerado.")
        return {"status": "ok", "hash": hash_value}
    except FileNotFoundError:
        print(">> ERRO: Arquivo não encontrado.")
        return {"status": "erro", "mensagem": "Arquivo não encontrado"}
