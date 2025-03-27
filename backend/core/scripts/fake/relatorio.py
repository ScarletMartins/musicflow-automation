from datetime import datetime


def gerar_relatorio():
    relatorio = {
        "data": datetime.now().isoformat(),
        "titulo": "Relatório de Execução",
        "conteudo": "Tudo ocorreu conforme esperado. Nenhum erro identificado."
    }

    print(">> RELATÓRIO gerado com sucesso.")
    return {"status": "ok", "relatorio": relatorio}
