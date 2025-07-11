// src/pages/ArabalarPage.js
import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ArabalarPage() {
  const [plakalar, setPlakalar] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const kayitli = JSON.parse(localStorage.getItem("plakalar")) || [];
    setPlakalar(kayitli);
  }, []);

  const handleSil = (plaka) => {
    const yeniListe = plakalar.filter((item) => item !== plaka);
    setPlakalar(yeniListe);
    localStorage.setItem("plakalar", JSON.stringify(yeniListe));

    // KM verisini de sil
    localStorage.removeItem(`km_${plaka}`);
  };

  const handleDuzenle = (plaka) => {
    navigate(`/km-ekle?plaka=${encodeURIComponent(plaka)}`);
  };

  return (
    <Container className="mt-4">
      <h3>Arabalar</h3>
      <ListGroup>
        {plakalar.map((plaka, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col xs={6}>{plaka}</Col>
              <Col className="text-end">
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDuzenle(plaka)}
                >
                  KM Düzenle
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleSil(plaka)}
                >
                  Sil
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default ArabalarPage;
