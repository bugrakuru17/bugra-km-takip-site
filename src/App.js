import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import KmGecmisiPage from "./pages/KmGecmisiPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PlakaEklePage from "./pages/PlakaEklePage";
import KmEklePage from "./pages/KmEklePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/km-gecmisi" element={<KmGecmisiPage />} /> 
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/plaka-ekle" element={<PlakaEklePage />} />
        <Route path="/km-ekle" element={<KmEklePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
