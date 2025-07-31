// src/pages/RegisterPage.js
import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { setupTestData } from "../utils/setupTestData";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [mesaj, setMesaj] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kayıt işlemi simülasyonu
    if (email && sifre) {
      // Mevcut kullanıcı bilgilerini kontrol et
      const mevcutEmail = localStorage.getItem("user_email");
      const mevcutRole = localStorage.getItem("userRole");
      
      // Eğer mevcut kullanıcı admin ise, onun bilgilerini koru
      if (mevcutEmail && mevcutRole === "admin") {
        // Admin bilgilerini ayrı bir yerde sakla
        localStorage.setItem("admin_email", mevcutEmail);
        localStorage.setItem("admin_password", localStorage.getItem("user_password"));
        localStorage.setItem("admin_role", mevcutRole);
      }
      
      // Yeni kullanıcı bilgilerini kaydet
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_password", sifre);
      localStorage.setItem("userRole", "user"); // Yeni kullanıcı her zaman user olur
      
      // Token oluştur ve kaydet (otomatik giriş için)
      const token = Math.random().toString(36).substr(2, 9);
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      
      // Yeni kullanıcı için test verilerini yükle
      setupTestData();
      
      setMesaj("Kayıt başarılı! User hesabı oluşturuldu. Otomatik giriş yapılıyor...");

      // 1 saniye sonra dashboard'a yönlendir
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } else {
      setMesaj("Lütfen tüm alanları doldurun.");
    }
  };

  return (
    <>
      <Navigation />
      <Container className="mt-5" style={{ maxWidth: "400px" }}>
        <h3>Kayıt Ol</h3>
      {mesaj && <Alert variant="info">{mesaj}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Şifre</Form.Label>
          <Form.Control
            type="password"
            placeholder="••••••••"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="success" className="w-100">
          Kayıt Ol
        </Button>
      </Form>
      </Container>
    </>
  );
}

export default RegisterPage;
