import React from 'react';
import { Button, Row, Col, Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { logout, isAdmin, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Giriş yapmamış kullanıcılar için basit navigation
  if (!isAuthenticated()) {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            🚗 KM Takip Sistemi
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate('/login')}>Giriş Yap</Nav.Link>
              <Nav.Link onClick={() => navigate('/register')}>Kayıt Ol</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  // Giriş yapmış kullanıcılar için tam navigation
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          🚗 KM Takip Sistemi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
            <Nav.Link onClick={() => navigate('/km-gecmisi')}>KM Geçmişi</Nav.Link>
            {isAdmin() && (
              <Nav.Link onClick={() => navigate('/plaka-ekle')}>Plaka Ekle</Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Çıkış Yap</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation; 