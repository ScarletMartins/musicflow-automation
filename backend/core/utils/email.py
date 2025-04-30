from django.core.mail import send_mail
from django.conf import settings


def enviar_email_execucao(destinatario, assunto, mensagem_simples):
    html_formatado = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #d63384;">🎵 MusicFlow Automation</h2>
        <p>Olá,</p>
        <p>O processo <strong>{assunto.replace('[MusicFlow] Execução de ', '')}</strong> foi executado automaticamente.</p>

        <h4 style="margin-top: 20px;">📋 Resumo da Execução:</h4>
        <pre style="background-color: #f8f9fa; padding: 12px; border-left: 4px solid #d63384; white-space: pre-wrap; font-size: 14px;">
{mensagem_simples}
        </pre>

        <p style="margin-top: 20px;">Para mais detalhes, acesse a aba <strong>Histórico</strong> da aplicação.</p>
        <hr style="margin-top: 30px;">
        <p style="font-size: 0.85em; color: #888;">Este é um e-mail automático enviado pelo sistema MusicFlow Automation.</p>
      </body>
    </html>
    """

    send_mail(
        subject=assunto,
        message=mensagem_simples,
        html_message=html_formatado,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[destinatario],
        fail_silently=False,
    )
