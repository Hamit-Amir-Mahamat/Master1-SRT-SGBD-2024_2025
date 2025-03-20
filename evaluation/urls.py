from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Fonction simple pour afficher un message d'accueil
def home(request):
    return HttpResponse("<h1>Bienvenue sur l'API de gestion des exercices !</h1>")

urlpatterns = [
    path('', home),  # 👈 Ajoute cette ligne pour gérer "/"
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

