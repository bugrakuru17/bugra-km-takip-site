// src/pages/ArabaEklePage.js
import React, { useState, useEffect } from "react";
import { Container, Form, Button, ListGroup } from "react-bootstrap";

function ArabaEklePage() {
  const [plaka, setPlaka] = useState("");
  const [plakalar, setPlakalar] = useState([]);

  useEffect(() => {
    const kayitli = JSON.parse(localStorage.getItem("plakalar")) || [];
    setPlakalar(kayitli);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (plaka.trim() === "") return;

    const yeniListe = [...plakalar, plaka];
    setPlakalar(yeniListe);
    localStorage.setItem("plakalar", JSON.stringify(yeniListe));
    setPlaka("");
  };

  return (
    <Container className="mt-4">
      <h3>Plaka Ekle</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Plaka</Form.Label>
          <Form.Control
            type="text"
            placeholder="34 ABC 123"
            value={plaka}
            onChange={(e) => setPlaka(e.target.value.toUpperCase())}
          />
        </Form.Group>
        <Button type="submit" variant="primary">Ekle</Button>
      </Form>

      <h5 className="mt-4">Eklenen Plakalar:</h5>
      <ListGroup>
        {plakalar.map((item, index) => (
          <ListGroup.Item key={index}>{item}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default ArabaEklePage;
