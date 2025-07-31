import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";

function KmEklePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const seciliPlaka = queryParams.get("plaka");

  const [km, setKm] = useState("");
  const [yeniAldim, setYeniAldim] = useState(false);
  const [mesaj, setMesaj] = useState(null);

  useEffect(() => {
    if (!seciliPlaka) {
      setMesaj("Plaka seçilmedi. Lütfen Dashboard'dan bir araç seçin.");
    }
  }, [seciliPlaka]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!yeniAldim && km.trim() === "") {
      setMesaj("KM bilgisi boş olamaz.");
      return;
    }

    if (!seciliPlaka) return;

    const email = localStorage.getItem("email") || "bilinmiyor";

    const gecmisKey = `km_gecmisi_${seciliPlaka}`;
    const mevcutGecmis = JSON.parse(localStorage.getItem(gecmisKey)) || [];

    const yeniKayit = {
      km: yeniAldim ? "Yeni alındı (KM girilmedi)" : km,
      tarih: new Date().toLocaleString(),
      email: email, // ✅ email bilgisi eklendi
    };

    mevcutGecmis.push(yeniKayit);
    localStorage.setItem(gecmisKey, JSON.stringify(mevcutGecmis));

    setMesaj("KM bilgisi başarıyla eklendi.");
    setKm("");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <>
      <Navigation />
      <Container className="mt-5" style={{ maxWidth: "600px" }}>
        <h3>KM Ekle / Güncelle</h3>
        {seciliPlaka && <p><strong>Plaka:</strong> {seciliPlaka}</p>}
        {mesaj && <Alert variant="info">{mesaj}</Alert>}
        
        {/* Kullanıcı Rehberi */}
        <div className="alert alert-info mb-3">
          <h6>💡 Nasıl Kullanılır?</h6>
          <ul className="mb-0">
            <li><strong>KM Bilgisi:</strong> Aracın güncel kilometre bilgisini girin</li>
            <li><strong>Yeni Aldım:</strong> Yeni araç aldıysanız bu kutucuğu işaretleyin</li>
            <li><strong>Kaydet:</strong> Bilgileri kaydetmek için butona tıklayın</li>
          </ul>
        </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>KM Bilgisi</Form.Label>
          <Form.Control
            type="number"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            placeholder="Örn: 123456"
            disabled={yeniAldim}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Bu aracı yeni aldım (KM girmeden geç)"
            checked={yeniAldim}
            onChange={(e) => setYeniAldim(e.target.checked)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Kaydet
        </Button>
      </Form>
      </Container>
    </>
  );
}

export default KmEklePage;
