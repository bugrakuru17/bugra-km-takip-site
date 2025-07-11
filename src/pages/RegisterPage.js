// src/pages/RegisterPage.js
import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [mesaj, setMesaj] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kayıt işlemi simülasyonu
    if (email && sifre) {
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_password", sifre);
      setMesaj("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");

      // 1 saniye sonra login sayfasına yönlendir
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setMesaj("Lütfen tüm alanları doldurun.");
    }
  };

  return (
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
  );
}

export default RegisterPage;
