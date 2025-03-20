import React, { useState } from "react";
import api from "../utils/api";

export default function UploadExercice() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Veuillez sélectionner un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append("fichier_soumis", file);
    formData.append("etudiant", localStorage.getItem("userId"));  // 👈 Ajoute l'ID étudiant
    formData.append("exercice", "1"); // Remplace avec l'ID correct de l'exercice

    try {
      const response = await api.post("/soumissions/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Exercice soumis avec succès !");
    } catch (error) {
      console.error("Erreur de soumission :", error.response);
      alert("Erreur lors de la soumission de l'exercice.");
    }
  };

  return (
    <div>
      <h2>Soumettre un Exercice</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="application/pdf" />
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
}

