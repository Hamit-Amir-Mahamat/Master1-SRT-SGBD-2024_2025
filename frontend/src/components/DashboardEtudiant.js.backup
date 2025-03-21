import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { UploadCloud } from "lucide-react";

export default function DashboardEtudiant() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [exercices, setExercices] = useState([]);
  const [selectedExercice, setSelectedExercice] = useState("");

  useEffect(() => {
    api.get("/exercices/")
      .then(response => setExercices(response.data))
      .catch(error => setMessage("Erreur chargement exercices."));
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || !selectedExercice) {
      setMessage("Sélectionnez un exercice et un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append("fichier_soumis", selectedFile);
    formData.append("exercice", selectedExercice);

    try {
      const response = await api.post("/soumissions/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setMessage(`Exercice soumis ! Note obtenue : ${response.data.note}/20`);
    } catch (error) {
      setMessage("Erreur réseau : " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Tableau de Bord Étudiant</h1>

      <div className="mt-6 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
          <UploadCloud className="mr-2 text-blue-600" /> Soumettre un exercice
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select value={selectedExercice} onChange={(e) => setSelectedExercice(e.target.value)} className="border p-2 w-full">
            <option value="">Sélectionnez un exercice</option>
            {exercices.map((exercice) => (
              <option key={exercice.id} value={exercice.id}>{exercice.titre}</option>
            ))}
          </select>

          <input type="file" accept="application/pdf" onChange={handleFileChange} className="border p-2 w-full" />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Soumettre</button>
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
}

