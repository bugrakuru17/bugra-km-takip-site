import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { setupTestData } from "../utils/setupTestData";

function TestPage() {
  const { user, isAdmin, isAuthenticated } = useAuth();
  const [localStorageData, setLocalStorageData] = useState({});

  useEffect(() => {
    // localStorage verilerini kontrol et
    const data = {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('email'),
      userRole: localStorage.getItem('userRole'),
      user_email: localStorage.getItem('user_email'),
      user_password: localStorage.getItem('user_password'),
      admin_email: localStorage.getItem('admin_email'),
      admin_password: localStorage.getItem('admin_password'),
      admin_role: localStorage.getItem('admin_role'),
      plakalar: localStorage.getItem('plakalar'),
    };
    setLocalStorageData(data);
  }, []);

  const handleSetupTestData = () => {
    setupTestData();
    window.location.reload();
  };

  const handleClearData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Container className="mt-5">
      <h2>🔧 Test Sayfası</h2>
      
      <div className="row">
        <div className="col-md-6">
          <h4>AuthContext Durumu</h4>
          <Alert variant="info">
            <strong>User:</strong> {JSON.stringify(user, null, 2)}<br/>
            <strong>isAuthenticated:</strong> {isAuthenticated().toString()}<br/>
            <strong>isAdmin:</strong> {isAdmin().toString()}
          </Alert>
        </div>
        
        <div className="col-md-6">
          <h4>localStorage Durumu</h4>
          <Alert variant="warning">
            <pre>{JSON.stringify(localStorageData, null, 2)}</pre>
          </Alert>
        </div>
      </div>

      <div className="mt-4">
        <h4>Test İşlemleri</h4>
        <Button onClick={handleSetupTestData} variant="success" className="me-2">
          Test Verilerini Yükle
        </Button>
        <Button onClick={handleClearData} variant="danger" className="me-2">
          Tüm Verileri Temizle
        </Button>
        <Button onClick={() => window.location.reload()} variant="primary">
          Sayfayı Yenile
        </Button>
      </div>

      <div className="mt-4">
        <h4>Hızlı Test</h4>
        <Button 
          onClick={() => {
            localStorage.setItem('admin_email', 'admin@test.com');
            localStorage.setItem('admin_password', 'admin123');
            localStorage.setItem('admin_role', 'admin');
            localStorage.setItem('token', Math.random().toString(36).substr(2, 9));
            localStorage.setItem('email', 'admin@test.com');
            localStorage.setItem('userRole', 'admin');
            window.location.reload();
          }} 
          variant="info" 
          className="me-2"
        >
          Admin Hesabı Oluştur
        </Button>
        <Button 
          onClick={() => {
            localStorage.setItem('user_email', 'user@test.com');
            localStorage.setItem('user_password', 'user123');
            localStorage.setItem('userRole', 'user');
            localStorage.setItem('token', Math.random().toString(36).substr(2, 9));
            localStorage.setItem('email', 'user@test.com');
            window.location.reload();
          }} 
          variant="secondary"
        >
          User Hesabı Oluştur
        </Button>
      </div>
    </Container>
  );
}

export default TestPage; 