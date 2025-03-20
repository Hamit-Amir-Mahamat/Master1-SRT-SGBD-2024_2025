from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Exercice, Soumission

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ExerciceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercice
        fields = ["id", "titre", "description", "contenu", "date_creation"]  # ✅ Ajout du champ texte

class SoumissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soumission
        fields = '__all__'

