import React, { useState } from "react";
import { Container, Form, Button, Table, Alert } from "react-bootstrap";
import Navigation from "../components/Navigation";

function KmGecmisiPage() {
  const [plaka, setPlaka] = useState("");
  const [gecmis, setGecmis] = useState([]);
  const [mesaj, setMesaj] = useState("");

  const handleSorgula = () => {
    if (!plaka) {
      setMesaj("Plaka giriniz.");
      return;
    }

    const veriler = JSON.parse(localStorage.getItem(`km_gecmisi_${plaka.toUpperCase()}`));

    if (veriler && veriler.length > 0) {
      setGecmis(veriler.sort((a, b) => new Date(b.tarih) - new Date(a.tarih)));
      setMesaj("");
    } else {
      setGecmis([]);
      setMesaj("Bu plakaya ait KM geçmişi bulunamadı.");
    }
  };

  return (
    <>
      <Navigation />
      <Container className="mt-4">
        <h3>KM Geçmişi Sorgulama</h3>
        
        {/* Kullanıcı Rehberi */}
        <div className="alert alert-info mb-3">
          <h6>💡 Nasıl Kullanılır?</h6>
          <ul className="mb-0">
            <li><strong>Plaka:</strong> Geçmişini görmek istediğiniz aracın plakasını girin</li>
            <li><strong>Sorgula:</strong> Butona tıklayarak KM geçmişini görüntüleyin</li>
            <li><strong>Sonuçlar:</strong> Tarih, KM ve kaydeden kişi bilgilerini göreceksiniz</li>
          </ul>
        </div>
        
        <Form className="mb-3">
        <Form.Group>
          <Form.Label>Plaka</Form.Label>
          <Form.Control
            type="text"
            value={plaka}
            onChange={(e) => setPlaka(e.target.value.toUpperCase())}
            placeholder="Örn: 34ABC123"
          />
        </Form.Group>
        <Button className="mt-2" onClick={handleSorgula}>
          Sorgula
        </Button>
      </Form>

      {mesaj && <Alert variant="info">{mesaj}</Alert>}

      {gecmis.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>KM</th>
              <th>Kaydeden</th>
            </tr>
          </thead>
          <tbody>
            {gecmis.map((veri, index) => (
              <tr key={index}>
                <td>{veri.tarih}</td>
                <td>{veri.km}</td>
                <td>{veri.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </Container>
    </>
  );
}

export default KmGecmisiPage;
