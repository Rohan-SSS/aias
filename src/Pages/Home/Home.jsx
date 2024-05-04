import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Aadhaar identification and authentication
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Proof of concept
      </Typography>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          component={Link}
          to="/register"
          sx={{ mx: 2 }}
        >
          Register
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/login"
          sx={{ mx: 2 }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/view"
          sx={{ mx: 2 }}
        >
          View
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/roles"
          sx={{ mx: 2 }}
        >
          Roles
        </Button>
      </Container>
    </Container>
  );
}

export default Home;
