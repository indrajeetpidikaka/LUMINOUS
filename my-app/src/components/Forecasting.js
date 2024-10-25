import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Snackbar,
  Alert,
  TextField,
} from '@mui/material';

// Dummy data for energy consumption and solar production
const dummyData = {
  consumption: 80, // kWh
  solarProduction: 50, // kWh
  peakTariff: 0.30, // $/kWh
  offPeakTariff: 0.10, // $/kWh
};

function Forecasting() {
  const [shiftedUsage, setShiftedUsage] = useState('');
  const [potentialSavings, setPotentialSavings] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const calculateSavings = () => {
    const shiftedUsageValue = parseInt(shiftedUsage);
    if (!isNaN(shiftedUsageValue) && shiftedUsageValue <= dummyData.consumption) {
      const savings = (dummyData.peakTariff - dummyData.offPeakTariff) * shiftedUsageValue;
      setPotentialSavings(savings);
      setOpenSnackbar(true);
    } else {
      alert("Please enter a valid number of kWh to shift.");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setPotentialSavings(null);
    setShiftedUsage('');
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '20px', borderRadius: '8px' }}>
      <CardContent>
        <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center', fontFamily: 'serif', textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bolder',backgroundColor: 'lightgreen' }}>
          Energy Usage Forecasting
        </Typography>
        
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              Current Energy Consumption: {dummyData.consumption} kWh
            </Typography>
            <Typography variant="body1">
              Solar Production: {dummyData.solarProduction} kWh
            </Typography>
            <Typography variant="body1">
              Peak Tariff: ${dummyData.peakTariff}/kWh
            </Typography>
            <Typography variant="body1">
              Off-Peak Tariff: ${dummyData.offPeakTariff}/kWh
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField 
              label="Shifted Usage (kWh)" 
              variant="outlined" 
              fullWidth 
              value={shiftedUsage}
              onChange={(e) => setShiftedUsage(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={calculateSavings}
              fullWidth
            >
              Calculate Potential Savings
            </Button>
          </Grid>
        </Grid>

        {potentialSavings !== null && (
          <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
            Potential Savings: ${potentialSavings.toFixed(2)}
          </Typography>
        )}

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Savings calculated successfully!
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}

export default Forecasting;
