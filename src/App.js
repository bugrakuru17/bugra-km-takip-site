import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import KmGecmisiPage from "./pages/KmGecmisiPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PlakaEklePage from "./pages/PlakaEklePage";
import KmEklePage from "./pages/KmEklePage";
import TestPage from "./pages/TestPage";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Giriş yapılmadan erişilemez */}
          <Route path="/km-gecmisi" element={<PrivateRoute element={KmGecmisiPage} />} />
          <Route path="/plaka-ekle" element={<PrivateRoute element={PlakaEklePage} />} />
          <Route path="/km-ekle" element={<PrivateRoute element={KmEklePage} />} />

          {/* Tüm kullanıcılar erişebilir */}
          <Route path="/dashboard" element={<PrivateRoute element={DashboardPage} />} />
          
          {/* Test sayfası */}
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
