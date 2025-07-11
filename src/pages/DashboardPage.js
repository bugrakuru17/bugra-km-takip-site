import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function DashboardPage() {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">KM Takip Paneli</h2>

      {/* Butonlar */}
      <Row className="mb-4">
        <Col xs={12} sm={4} className="mb-2">
          <Button variant="primary" className="w-100">KM Ekle</Button>
        </Col>
        <Col xs={12} sm={4} className="mb-2">
          <Button variant="danger" className="w-100">KM Sil</Button>
        </Col>
        <Col xs={12} sm={4} className="mb-2">
          <Button variant="success" className="w-100">Yeni Aldım</Button>
        </Col>
      </Row>

      {/* KM Verileri Örneği */}
      <Card>
        <Card.Body>
          <Card.Title>Son KM Kayıtları</Card.Title>
          <Card.Text>
            Burada kullanıcının kaydettiği kilometre verileri listelenecek.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DashboardPage;
