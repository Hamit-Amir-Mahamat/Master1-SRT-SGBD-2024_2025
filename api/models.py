from django.db import models
from django.contrib.auth.models import User

class Exercice(models.Model):
    professeur = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    titre = models.CharField(max_length=200)
    description = models.TextField()
    contenu = models.TextField(null=True, blank=True)  # ✅ Permet d'avoir du contenu vide
    date_creation = models.DateTimeField(auto_now_add=True)


class ModeleCorrection(models.Model):
    exercice = models.ForeignKey(
        Exercice, 
        on_delete=models.CASCADE, 
        related_name="corrections"
    )
    fichier_correction = models.FileField(upload_to='corrections/')
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Correction pour {self.exercice.titre}"

class Soumission(models.Model):
    etudiant = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="soumissions"
    )
    exercice = models.ForeignKey(
        Exercice, 
        on_delete=models.CASCADE, 
        related_name="soumissions"
    )
    fichier_soumis = models.FileField(upload_to='soumissions/')
    date_soumission = models.DateTimeField(auto_now_add=True)
    note = models.FloatField(null=True, blank=True)
    feedback = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Soumission de {self.etudiant.username} pour {self.exercice.titre}"

