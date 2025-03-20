import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("token/", { username, password });

      // Stocker le token
      localStorage.setItem("token", response.data.token);

      // Récupérer le rôle de l'utilisateur
      const userResponse = await api.get("users/me/", {
        headers: { Authorization: `Token ${response.data.token}` },
      });
      const role = userResponse.data.role;

      // Rediriger vers le bon tableau de bord
      if (role === "Etudiant") {
        navigate("/etudiant");
      } else if (role === "Professeur") {
        navigate("/professeur");
      } else {
        alert("Rôle inconnu, contactez l'administrateur !");
      }
    } catch (error) {
      alert("Échec de connexion, vérifiez vos identifiants !");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">Connexion</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </div>
    </div>
  );
};

export default Login;

