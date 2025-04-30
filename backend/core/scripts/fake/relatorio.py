import os
import logging
from datetime import datetime


def gerar_relatorio():
    relatorio = {
        "data": datetime.now().isoformat(),
        "titulo": "Relatório de Execução",
        "conteudo": "Tudo ocorreu conforme esperado. Nenhum erro identificado."
    }

    os.makedirs("relatorios", exist_ok=True)
    caminho = f"relatorios/relatorio_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"

    try:
        with open(caminho, "w", encoding="utf-8") as f:
            f.write(f"Título: {relatorio['titulo']}\n")
            f.write(f"Data: {relatorio['data']}\n\n")
            f.write(f"{relatorio['conteudo']}\n")

        logging.info("Relatório gerado com sucesso.")
        print(f">> RELATÓRIO gerado: {caminho}")
        return {"status": "ok", "relatorio": relatorio, "caminho": caminho}

    except Exception as e:
        logging.error(f"Erro ao gerar relatório: {e}")
        return {"status": "erro", "mensagem": str(e)}


if __name__ == "__main__":
    gerar_relatorio()
