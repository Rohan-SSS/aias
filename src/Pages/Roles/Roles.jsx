import React, { useState } from "react";
import { TextField, Button, Typography, Snackbar } from "@mui/material";
import {
  addSupervisorByOwner,
  removeSupervisorByOwner,
  addRegistrarBySupervisor,
  removeRegistrarBySupervisor,
} from "../../roleInteractions";

const Roles = () => {
    const [supervisorAddress, setSupervisorAddress] = useState("");
    const [registrarAddress, setRegistrarAddress] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  
    const handleAddSupervisor = async () => {
      try {
        await addSupervisorByOwner(supervisorAddress);
        setSnackbarMessage("Supervisor added successfully by owner.");
        setSnackbarOpen(true);
      } catch (error) {
        console.error(`Error adding supervisor: ${error}`);
      }
    };
  
    const handleRemoveSupervisor = async () => {
      try {
        await removeSupervisorByOwner(supervisorAddress);
        setSnackbarMessage("Supervisor removed successfully by owner.");
        setSnackbarOpen(true);
      } catch (error) {
        console.error(`Error removing supervisor: ${error}`);
      }
    };
  
    const handleAddRegistrar = async () => {
      try {
        await addRegistrarBySupervisor(registrarAddress);
        setSnackbarMessage("Registrar added successfully by supervisor.");
        setSnackbarOpen(true);
      } catch (error) {
        console.error(`Error adding registrar: ${error}`);
      }
    };
  
    const handleRemoveRegistrar = async () => {
      try {
        await removeRegistrarBySupervisor(registrarAddress);
        setSnackbarMessage("Registrar removed successfully by supervisor.");
        setSnackbarOpen(true);
      } catch (error) {
        console.error(`Error removing registrar: ${error}`);
      }
    };
  
    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    };
  
    return (
      <div>
        <Typography variant="h2">Role Management Panel</Typography>
        <div>
          <Typography variant="h4">Add Supervisor</Typography>
          <TextField
            type="text"
            value={supervisorAddress}
            onChange={(e) => setSupervisorAddress(e.target.value)}
            label="Supervisor Address"
            variant="outlined"
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddSupervisor}>
            Add Supervisor
          </Button>
          <Button variant="contained" onClick={handleRemoveSupervisor}>
            Remove Supervisor
          </Button>
        </div>
        <div>
          <Typography variant="h4">Add Registrar</Typography>
          <TextField
            type="text"
            value={registrarAddress}
            onChange={(e) => setRegistrarAddress(e.target.value)}
            label="Registrar Address"
            variant="outlined"
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddRegistrar}>
            Add Registrar
          </Button>
          <Button variant="contained" onClick={handleRemoveRegistrar}>
            Remove Registrar
          </Button>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </div>
    );
  };
  
  export default Roles;