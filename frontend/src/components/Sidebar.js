import React from "react";
import { Link } from "react-router-dom";
import { Home, FileText, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 h-screen p-5">
      <h2 className="text-xl font-bold mb-5">Menu</h2>
      <ul>
        <li className="mb-2">
          <Link to="/etudiant" className="flex items-center hover:text-accent">
            <Home className="mr-2" /> Tableau de bord
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/professeur" className="flex items-center hover:text-accent">
            <FileText className="mr-2" /> Exercices
          </Link>
        </li>
        <li className="mt-5">
          <Link to="/" className="flex items-center hover:text-red-400">
            <LogOut className="mr-2" /> Déconnexion
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

