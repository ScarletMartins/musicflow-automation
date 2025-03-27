from django.test import TestCase
from core.scripts.fake import alerta, backup, relatorio, validador


class TestProcessosSimulados(TestCase):

    def test_alerta_simulado(self):
        resultado = alerta.enviar_alerta()
        self.assertEqual(resultado["status"], "simulado")
        self.assertIn("mensagem", resultado["log"])

    def test_backup_simulado(self):
        resultado = backup.executar_backup()
        self.assertIn(resultado["status"], ["ok", "erro"])
        if resultado["status"] == "ok":
            self.assertTrue(resultado["arquivo"].endswith(".sqlite3"))

    def test_relatorio_simulado(self):
        resultado = relatorio.gerar_relatorio()
        self.assertEqual(resultado["status"], "ok")
        self.assertIn("conteudo", resultado["relatorio"])

    def test_validador_integridade(self):
        resultado = validador.verificar_integridade()
        self.assertIn(resultado["status"], ["ok", "erro"])
        if resultado["status"] == "ok":
            self.assertEqual(len(resultado["hash"]), 64)