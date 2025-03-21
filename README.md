# Projet SGBD - Plateforme de Gestion d'Exercices SQL

## Description
Ce projet est une plateforme permettant aux **professeurs** de publier des exercices en SQL et aux **étudiants** de soumettre leurs réponses sous forme de fichiers PDF. Après soumission, une **correction automatique par IA** est effectuée.

## Technologies utilisées
- **Backend** : Django Rest Framework (Python)
- **Frontend** : React.js (JavaScript)
- **Base de données** : SQLite (peut être migré vers PostgreSQL)
- **Hébergement** : AWS (EC2 + S3)
- **Authentification** : Token JWT

##  Installation et exécution
  ### Clonez le projet:
https://github.com/Hamit-Amir-Mahamat/Master1-SRT-SGBD-2024_2025.git
  ### Backend (Django)**
cd backend
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
  ### Frontend
cd frontend
npm install
npm start

### Déploiement AWS
Backend hébergé sur EC2 + Gunicorn + Nginx
Frontend sur S3 + CloudFront
Base de données présentes sur RDS PostgreSQL




