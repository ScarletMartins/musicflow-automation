from django.core.mail import EmailMultiAlternatives
from django.conf import settings


def enviar_email_execucao(destinatario, assunto, mensagem_html):
    msg = EmailMultiAlternatives(
        subject=assunto,
        body="Para visualizar este e-mail, utilize um cliente que suporte HTML.",
        from_email=settings.EMAIL_HOST_USER,
        to=[destinatario],
    )
    msg.attach_alternative(mensagem_html, "text/html")
    msg.send(fail_silently=False)
