from rest_framework import serializers
from .models import ProcessoAutomatizado, ExecucaoProcesso


class ProcessoSerializer(serializers.ModelSerializer):
    criado_por_nome = serializers.SerializerMethodField()

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
