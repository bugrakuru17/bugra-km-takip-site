// src/pages/PlakaEklePage.js
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navigation from "../components/Navigation";

function PlakaEklePage() {
  const [plaka, setPlaka] = useState("");
  const [mesaj, setMesaj] = useState(null);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin()) {
      setMesaj("Bu sayfaya erişim yetkiniz yok. Sadece admin kullanıcılar plaka ekleyebilir.");
    }
  }, [isAdmin]);

  const handlePlakaEkle = (e) => {
    e.preventDefault();

    if (!isAdmin()) {
      setMesaj("Bu işlem için admin yetkisi gereklidir.");
      return;
    }

    if (plaka.trim() === "") {
      setMesaj("Plaka boş olamaz.");
      return;
    }

    const mevcutlar = JSON.parse(localStorage.getItem("plakalar")) || [];

    if (mevcutlar.includes(plaka)) {
      setMesaj("Bu plaka zaten eklenmiş.");
      return;
    }

    mevcutlar.push(plaka);
    localStorage.setItem("plakalar", JSON.stringify(mevcutlar));

    setMesaj("Plaka başarıyla eklendi!");
    setPlaka("");

    // İsteğe bağlı: plaka ekleyince dashboard'a yönlendir
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <>
      <Navigation />
      <Container className="mt-5" style={{ maxWidth: "600px" }}>
        <h3>Plaka Ekle</h3>
      {mesaj && (
        <Alert variant={mesaj.includes("başarı") ? "success" : "warning"}>
          {mesaj}
        </Alert>
      )}
      <Form onSubmit={handlePlakaEkle}>
        <Form.Group className="mb-3">
          <Form.Label>Plaka</Form.Label>
          <Form.Control
            type="text"
            placeholder="34ABC123"
            value={plaka}
            onChange={(e) => setPlaka(e.target.value.toUpperCase())}
            required
          />
        </Form.Group>
        <Button type="submit" variant="success" className="w-100">
          Plakayı Ekle
        </Button>
      </Form>
      </Container>
    </>
  );
}

export default PlakaEklePage;
