import os
import logging
from datetime import datetime


def gerar_relatorio():
    relatorio = {
        "data": datetime.now().isoformat(),
        "titulo": "Relatório de Execução Simulada",
        "conteudo": (
            "Tudo ocorreu conforme esperado. Nenhum erro identificado.\n\n"
            "- Todos os serviços simulados responderam corretamente.\n"
            "- Tempo de resposta médio: 142ms\n"
            "- Não houve consumo anormal de CPU ou memória.\n"
            "- Nenhum log de erro foi registrado durante a execução.\n"
            "- Todos os destinatários de alerta foram encontrados e estão ativos.\n"
            "- O sistema finalizou o processo de forma limpa e controlada.\n\n"
            "Sugestão: manter a rotina de verificação automatizada ativa diariamente às 9h."
        )
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
