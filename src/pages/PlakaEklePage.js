// src/pages/PlakaEklePage.js
import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PlakaEklePage() {
  const [plaka, setPlaka] = useState("");
  const [mesaj, setMesaj] = useState(null);
  const navigate = useNavigate();

  const handlePlakaEkle = (e) => {
    e.preventDefault();

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
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
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
  );
}

export default PlakaEklePage;
