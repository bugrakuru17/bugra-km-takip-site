import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, ListGroup, Button } from "react-bootstrap";

function KmGecmisiPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const plaka = queryParams.get("plaka");

  const [gecmis, setGecmis] = useState([]);

  useEffect(() => {
    const kayitlar = JSON.parse(localStorage.getItem(`km_gecmisi_${plaka}`)) || [];
    setGecmis(kayitlar);
  }, [plaka]);

  return (
    <Container className="mt-5">
      <h3>{plaka} KM Geçmişi</h3>
      <ListGroup className="mt-3">
        {gecmis.length === 0 ? (
          <ListGroup.Item>Hiç kayıt bulunamadı.</ListGroup.Item>
        ) : (
          gecmis.map((k, index) => (
            <ListGroup.Item key={index}>
              <strong>{k.km}</strong> – <small>{k.tarih}</small>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
      <Button variant="secondary" className="mt-3" onClick={() => navigate("/dashboard")}>
        Geri Dön
      </Button>
    </Container>
  );
}

export default KmGecmisiPage;
