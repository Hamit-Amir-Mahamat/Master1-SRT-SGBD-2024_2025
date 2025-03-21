import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { UploadCloud, FileText, CheckCircle } from "lucide-react";

export default function DashboardEtudiant() {
  const [exercices, setExercices] = useState([]);
  const [soumissions, setSoumissions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedExercice, setSelectedExercice] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exerciceRes, soumissionRes] = await Promise.all([
          api.get("/exercices/"),
          api.get("/soumissions/"),
        ]);
        setExercices(exerciceRes.data);
        setSoumissions(soumissionRes.data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !selectedExercice) {
      setMessage("Veuillez choisir un exercice et un fichier PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("fichier_soumis", selectedFile);
    formData.append("exercice", selectedExercice);

    try {
      const res = await api.post("/soumissions/", formData);
      setMessage("✅ Soumission envoyée avec succès !");
      setSelectedFile(null);
      setSelectedExercice("");
    } catch (error) {
      setMessage("❌ Erreur lors de la soumission : " + error.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tableau de Bord Étudiant</h1>

      {/* Formulaire de soumission */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <UploadCloud className="mr-2 text-blue-600" /> Soumettre une réponse
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={selectedExercice}
            onChange={(e) => setSelectedExercice(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Choisissez un exercice --</option>
            {exercices.map((exo) => (
              <option key={exo.id} value={exo.id}>
                {exo.titre}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Envoyer ma réponse
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      </div>

      {/* Liste des soumissions */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <CheckCircle className="mr-2 text-green-600" /> Mes Corrections
        </h2>
        {soumissions.length === 0 ? (
          <p className="text-gray-600">Aucune soumission pour l’instant.</p>
        ) : (
          <ul className="space-y-4">
            {soumissions.map((s) => (
              <li key={s.id} className="border p-4 rounded shadow-sm">
                <p className="font-medium">Exercice : {s.exercice_titre}</p>
                <p className="text-sm text-gray-600">Note : {s.note ?? "en attente..."}</p>
                <p className="text-sm text-gray-700">Feedback : {s.feedback ?? "en attente..."}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

