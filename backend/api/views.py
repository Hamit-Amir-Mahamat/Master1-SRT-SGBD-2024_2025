from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Exercice, Soumission
from .serializers import UserSerializer, ExerciceSerializer, SoumissionSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import correction_ia

# ✅ Gestion des utilisateurs
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

# ✅ Vue Profil Utilisateur
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = "Etudiant" if user.groups.filter(name="Etudiant").exists() else "Professeur"
        return Response({"username": user.username, "role": role})


class ExerciceViewSet(viewsets.ModelViewSet):
    queryset = Exercice.objects.all()
    serializer_class = ExerciceSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        exercice = serializer.save(professeur=self.request.user)

        # Ajouter tous les étudiants comme destinataires
        etudiants = User.objects.filter(groups__name="Etudiant")
        exercice.destinataires.set(etudiants)



class SoumissionViewSet(viewsets.ModelViewSet):
    queryset = Soumission.objects.all()
    serializer_class = SoumissionSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        fichier_soumis = request.FILES.get("fichier_soumis")
        exercice_id = request.data.get("exercice")

        if not fichier_soumis or not exercice_id:
            return Response({"error": "Veuillez sélectionner un exercice et un fichier."}, status=status.HTTP_400_BAD_REQUEST)

        exercice = get_object_or_404(Exercice, id=exercice_id)

        # Création de la soumission
        soumission = Soumission.objects.create(
            etudiant=request.user,
            exercice=exercice,
            fichier_soumis=fichier_soumis
        )

        # Appel de l'IA pour correction
        note, feedback = correction_ia(soumission.fichier_soumis.path)

        # Mise à jour de la soumission avec la note et le feedback
        soumission.note = note
        soumission.feedback = feedback
        soumission.save()

        return Response(SoumissionSerializer(soumission).data, status=status.HTTP_201_CREATED)


# ✅ Correction IA via APIView
class CorrectionIAAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """Corrige un fichier soumis en utilisant l'IA."""
        pdf_path = request.data.get('pdf_path')

        if not pdf_path:
            return Response({"error": "Veuillez fournir le chemin du PDF (pdf_path)."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Appelle la correction IA
        resultat_ia = correction_ia(pdf_path)

        return Response({"correction_ia": resultat_ia}, status=status.HTTP_200_OK)

