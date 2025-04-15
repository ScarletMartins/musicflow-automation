from django.core.mail import send_mail
from django.conf import settings


def enviar_email_execucao(destinatario, assunto, mensagem):
    send_mail(
        subject=assunto,
        message=mensagem,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[destinatario],
        fail_silently=False,
    )
