from django.core.mail import EmailMessage
from django.conf import settings
import os


def enviar_email_execucao(destinatario, assunto, mensagem, anexo_path=None):
    email = EmailMessage(
        subject=assunto,
        body=mensagem,
        from_email=settings.EMAIL_HOST_USER,
        to=[destinatario],
    )

    if anexo_path and os.path.exists(anexo_path):
        email.attach_file(anexo_path)

    email.send(fail_silently=False)
