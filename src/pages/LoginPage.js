import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [mesaj, setMesaj] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    const kayıtlıEmail = localStorage.getItem("user_email");
    const kayıtlıSifre = localStorage.getItem("user_password");

    if (email === kayıtlıEmail && sifre === kayıtlıSifre) {
      setMesaj("Giriş başarılı! Yönlendiriliyorsunuz...");
      setTimeout(() => {
        navigate("/plaka-ekle"); // ✅ Başarılı giriş sonrası yönlendirme
      }, 1000);
    } else {
      setMesaj("E-posta veya şifre hatalı.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h3>Giriş Yap</h3>
      {mesaj && <Alert variant={mesaj.includes("başarılı") ? "success" : "danger"}>{mesaj}</Alert>}

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Şifre</Form.Label>
          <Form.Control
            type="password"
            placeholder="••••••••"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Giriş Yap
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
