from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = "Cria um superusuário padrão se não existir"

    def handle(self, *args, **kwargs):
        username = "admin"
        password = "admin123"
        email = "admin@example.com"

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, password=password, email=email)
            self.stdout.write(self.style.SUCCESS(f"Superusuário '{username}' criado com sucesso!"))
        else:
            self.stdout.write(self.style.WARNING(f"O superusuário '{username}' já existe."))
