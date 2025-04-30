from rest_framework import serializers
from .models import ProcessoAutomatizado, ExecucaoProcesso
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class ProcessoSerializer(serializers.ModelSerializer):
    criado_por_nome = serializers.SerializerMethodField()
    data_execucao_agendada = serializers.DateTimeField(required=False, allow_null=True)

    class Meta:
        model = ProcessoAutomatizado
        fields = '__all__'
        read_only_fields = ['criado_em', 'atualizado_em', 'criado_por']

    def get_criado_por_nome(self, obj):
        return obj.criado_por.username


class ExecucaoProcessoSerializer(serializers.ModelSerializer):
    processo_nome = serializers.CharField(source="processo.nome", read_only=True)

    class Meta:
        model = ExecucaoProcesso
        fields = [
            'id',
            'processo',
            'processo_nome',
            'data_execucao',
            'resumo',
            'status',
            'saida',
        ]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["is_staff"] = user.is_staff
        return token
