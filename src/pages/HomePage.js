import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h2>Welcome to the KM Tracking System</h2>
      <Button variant="primary" onClick={() => navigate("/login")} className="m-2">
        Login
      </Button>
      <Button variant="success" onClick={() => navigate("/register")} className="m-2">
        Register
      </Button>
    </Container>
  );
}

export default HomePage;
