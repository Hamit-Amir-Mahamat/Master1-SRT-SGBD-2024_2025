import requests
from PyPDF2 import PdfReader

def extraire_texte_pdf(pdf_path):
    """ Extrait le texte depuis un PDF """
    texte_complet = ""
    with open(pdf_path, 'rb') as fichier:
        lecteur = PdfReader(fichier)
        for page in lecteur.pages:
            texte_complet += page.extract_text()
    return texte_complet

def correction_ia(pdf_path):
    """ Envoie le texte extrait du PDF à l'IA pour une correction automatique """
    texte_pdf = extraire_texte_pdf(pdf_path)

    url = "http://localhost:11434/api/generate"
    data = {
        "model": "deepseek-coder",
        "prompt": f"""
        Vous êtes un professeur de base de données.
        Voici la réponse d'un étudiant à un exercice :\n\n{texte_pdf}\n\n
        Corrigez ce devoir en identifiant les erreurs, proposez une amélioration,
        et donnez une note sur 20 avec un feedback clair.
        """
    }
    
    response = requests.post(url, json=data)

    if response.status_code == 200:
        resultat = response.json()
        correction = resultat.get('response', 'Aucune réponse reçue de l\'IA.')
        note = 12.5  # Placeholder, on peut l'améliorer avec un meilleur traitement NLP
    else:
        correction = "Erreur lors de l'appel à l'IA."
        note = None

    return note, correction

