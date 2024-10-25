import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Divider,
  Avatar,
} from '@mui/material';

// Dummy data for solar management
const fetchDummyData = () => {
  return {
    production: Math.floor(Math.random() * 100) + 1, // Random production between 1 and 100 kWh
    consumption: Math.floor(Math.random() * 100) + 1, // Random consumption between 1 and 100 kWh
    batteryLevel: Math.floor(Math.random() * 100) + 1, // Random battery level between 1 and 100%
  };
};

function SolarManagement() {
  const [loading, setLoading] = useState(true);
  const [solarData, setSolarData] = useState({
    production: 0,
    consumption: 0,
    batteryLevel: 0,
  });

  useEffect(() => {
    const fetchData = () => {
      const data = fetchDummyData();
      setSolarData(data);
      setLoading(false);
    };

    fetchData();

    // Fetch new data every minute
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Card variant="outlined" style={{ marginBottom: '20px', borderRadius: '8px' }}>
      <CardContent>
        <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center',fontFamily: 'serif', fontWeight: 'bolder', textTransform: 'uppercase',backgroundColor: 'lightgreen' }}>
          Solar Energy Management
        </Typography>
        
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined" style={{ padding: '10px', textAlign: 'center' }}>
                <Avatar 
                  alt="Solar Production"
                  src="/path/to/production-logo.png" // Replace with your logo path
                  style={{ marginBottom: '10px', backgroundColor: '#4caf50' }}
                />
                <Typography variant="h6">Production</Typography>
                <Typography variant="body1">{solarData.production} kWh</Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined" style={{ padding: '10px', textAlign: 'center' }}>
                <Avatar 
                  alt="Energy Consumption"
                  src="/path/to/consumption-logo.png" // Replace with your logo path
                  style={{ marginBottom: '10px', backgroundColor: '#f44336' }}
                />
                <Typography variant="h6">Consumption</Typography>
                <Typography variant="body1">{solarData.consumption} kWh</Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card variant="outlined" style={{ padding: '10px', textAlign: 'center' }}>
                <Avatar 
                  alt="Battery Level"
                  src="/path/to/battery-logo.png" // Replace with your logo path
                  style={{ marginBottom: '10px', backgroundColor: '#2196f3' }}
                />
                <Typography variant="h6">Battery Level</Typography>
                <Typography variant="body1">{solarData.batteryLevel}%</Typography>
              </Card>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default SolarManagement;
