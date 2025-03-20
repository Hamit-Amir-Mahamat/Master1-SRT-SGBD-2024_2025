import React, { useState } from "react";
import api from "../utils/api";
import { UploadCloud } from "lucide-react";

export default function DashboardProfesseur() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [contenu, setContenu] = useState(""); // ✅ Texte à envoyer au lieu d'un fichier
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!titre || !description || !contenu) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await api.post("http://localhost:8000/api/exercices/", {
        titre,
        description,
        contenu, // ✅ Envoi du texte au lieu d'un fichier
      });

      if (response.status === 201) {
        setMessage("Exercice publié avec succès !");
        setTitre("");
        setDescription("");
        setContenu("");
      } else {
        setMessage("Erreur lors de la publication.");
      }
    } catch (error) {
      setMessage("Erreur réseau : " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Tableau de Bord Professeur</h1>

      <div className="mt-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
          <UploadCloud className="mr-2 text-blue-600" /> Publier un exercice
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Titre de l'exercice"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="border p-2 w-full"
          />

          <textarea
            placeholder="Description de l'exercice"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
          />

          <textarea
            placeholder="Contenu de l'exercice (au lieu d'un fichier)"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            className="border p-2 w-full h-40"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Publier
          </button>
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
}

