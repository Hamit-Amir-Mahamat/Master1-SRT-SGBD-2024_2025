import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import DashboardEtudiant from "./components/DashboardEtudiant";
import DashboardProfesseur from "./components/DashboardProfesseur";
import Login from "./components/Login";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/etudiant" element={<PrivateRoute element={<DashboardEtudiant />} />} />
        <Route path="/professeur" element={<PrivateRoute element={<DashboardProfesseur />} />} />
      </Routes>
    </Router>
  );
}

export default App;

