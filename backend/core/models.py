from django.db import models
from django.contrib.auth.models import User


class ProcessoAutomatizado(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    comando = models.TextField(help_text="Comando Python ou shell a ser executado")
    ativo = models.BooleanField(default=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    criado_por = models.ForeignKey(User, on_delete=models.CASCADE)
    email_alerta = models.EmailField(blank=True, null=True)
    data_execucao_agendada = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Data/hora para execução automática do processo"
    )

    def __str__(self):
        return self.nome


class ExecucaoProcesso(models.Model):
    processo = models.ForeignKey(ProcessoAutomatizado, on_delete=models.CASCADE)
    data_execucao = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('SUCESSO', 'Sucesso'),
        ('FALHA', 'Falha')
    ])
    saida = models.TextField(blank=True)
    resumo = models.CharField(max_length=1000, blank=True)

    def __str__(self):
        return f"{self.processo.nome} - {self.data_execucao.strftime('%d/%m/%Y %H:%M')}"
