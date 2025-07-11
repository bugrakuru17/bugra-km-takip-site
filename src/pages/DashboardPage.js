import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const [plakalar, setPlakalar] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const kayıtlıPlakalar = JSON.parse(localStorage.getItem("plakalar")) || [];
    setPlakalar(kayıtlıPlakalar);
  }, []);

  const handleKmDuzenle = (plaka) => {
    navigate(`/km-ekle?plaka=${plaka}`);
  };

  const handleKmGecmisi = (plaka) => {
    navigate(`/km-gecmisi?plaka=${plaka}`);
  };

  const handlePlakaSil = (plaka) => {
    const yeniListe = plakalar.filter((p) => p !== plaka);
    setPlakalar(yeniListe);
    localStorage.setItem("plakalar", JSON.stringify(yeniListe));

    localStorage.removeItem(`km_${plaka}`);
    localStorage.removeItem(`km_gecmisi_${plaka}`);
  };

  return (
    <Container className="mt-5">
      <h3>Plakalar</h3>
      {plakalar.length === 0 ? (
        <p>Henüz hiç plaka eklenmemiş.</p>
      ) : (
        <ListGroup>
          {plakalar.map((plaka, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col xs={6}>
                  <strong>{plaka}</strong>
                  <div className="text-muted small">
                    Son KM:{" "}
                    {
                      JSON.parse(localStorage.getItem(`km_gecmisi_${plaka}`) || "[]").slice(-1)[0]?.km ||
                      "Veri yok"
                    }
                  </div>
                </Col>
                <Col xs={6} className="text-end">
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleKmDuzenle(plaka)}
                  >
                    KM Düzenle
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleKmGecmisi(plaka)}
                  >
                    KM Geçmişi
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handlePlakaSil(plaka)}
                  >
                    Sil
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default DashboardPage;
