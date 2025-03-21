from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Exercice, Soumission

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ExerciceSerializer(serializers.ModelSerializer):
    destinataires = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)

    class Meta:
        model = Exercice
        fields = ['id', 'professeur', 'titre', 'description', 'contenu', 'fichier_sujet', 'date_creation', 'destinataires']
class SoumissionSerializer(serializers.ModelSerializer):
    exercice_titre = serializers.ReadOnlyField(source='exercice.titre')

    class Meta:
        model = Soumission
        fields = ['id', 'exercice', 'fichier_soumis', 'note', 'feedback', 'exercice_titre']


