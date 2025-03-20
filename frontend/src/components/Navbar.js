import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Système d'Évaluation</h1>
      <div>
        <Link className="mr-4 hover:underline" to="/etudiant">Étudiant</Link>
        <Link className="hover:underline" to="/professeur">Professeur</Link>
      </div>
    </nav>
  );
};

export default Navbar;

