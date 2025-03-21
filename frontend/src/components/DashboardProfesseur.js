import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { UploadCloud } from "lucide-react";

export default function DashboardProfesseur() {
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [exercices, setExercices] = useState([]);
  const [soumissions, setSoumissions] = useState([]);
  const [message, setMessage] = useState("");

  // Charger les exercices et soumissions à l'arrivée
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resEx, resSoum] = await Promise.all([
        api.get("/exercices/"),
        api.get("/soumissions/")
      ]);
      setExercices(resEx.data);
      setSoumissions(resSoum.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titre || !contenu) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await api.post("/exercices/", { titre, contenu });
      if (response.status === 201) {
        setMessage("✅ Exercice publié avec succès !");
        setTitre("");
        setContenu("");
        fetchData();
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur réseau : " + error.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Tableau de Bord Professeur</h1>

      {/* Formulaire publication */}
      <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-600">
          <UploadCloud className="mr-2" /> Publier un exercice
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Titre de l'exercice"
            className="border p-2 w-full rounded"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
          <textarea
            rows={4}
            placeholder="Contenu de l'exercice"
            className="border p-2 w-full rounded"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Publier
          </button>
        </form>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>

      {/* Liste des exercices */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">📘 Exercices publiés</h2>
        <div className="grid grid-cols-1 gap-4">
          {exercices.map((ex) => (
            <Card key={ex.id} className="bg-gray-100">
              <CardHeader>
                <CardTitle>{ex.titre}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{ex.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Soumissions reçues */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">📩 Soumissions des étudiants</h2>
        <div className="space-y-4">
          {soumissions.map((soumission) => (
            <Card key={soumission.id}>
              <CardHeader>
                <CardTitle>
                  Étudiant : {soumission.etudiant_username} — Exercice : {soumission.exercice_titre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">📄 Note : {soumission.note ?? "Non corrigée"}</p>
                <p className="text-gray-600">📝 Feedback : {soumission.feedback ?? "En attente..."}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

