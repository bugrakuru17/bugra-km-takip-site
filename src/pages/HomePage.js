import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { setupTestData } from "../utils/setupTestData";
import Navigation from "../components/Navigation";

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <Container className="text-center mt-5">
        <h2>Welcome to the KM Tracking System</h2>
      <Button variant="primary" onClick={() => navigate("/login")} className="m-2">
        Login
      </Button>
      <Button variant="success" onClick={() => navigate("/register")} className="m-2">
        Register
      </Button>
      <br />
      <Button variant="info" onClick={setupTestData} className="m-2">
        Test Verilerini Yükle
      </Button>
      </Container>
    </>
  );
}

export default HomePage;
