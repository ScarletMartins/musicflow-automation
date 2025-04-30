from django.test import TestCase
from core.scripts.fake import alerta_sucesso, alerta_falha, alerta, backup, relatorio, validador


class TestProcessosSimulados(TestCase):

    def test_alerta_sucesso(self):
        resultado = alerta_sucesso.enviar_alerta()
        self.assertEqual(resultado["status"], "ok")
        self.assertIn("mensagem", resultado["log"])

    def test_alerta_falha(self):
        with self.assertRaises(SystemExit) as cm:
            alerta_falha.enviar_alerta()
        self.assertEqual(cm.exception.code, 1)

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
        else:
            self.assertIn("mensagem", resultado)
