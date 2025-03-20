import React from "react";
import DashboardProfesseur from "../components/DashboardProfesseur";

const Professeur = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Espace Professeur</h1>
      <DashboardProfesseur />
    </div>
  );
};

export default Professeur;

