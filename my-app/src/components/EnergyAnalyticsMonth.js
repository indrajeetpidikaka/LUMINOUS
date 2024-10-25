import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function EnergyAnalytics() {
  const [loading, setLoading] = useState(true);
  const [energyData, setEnergyData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // Simulating data fetching with dummy data
    const fetchDummyData = () => {
      const dummyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dummyData = [30, 50, 70, 40, 60, 90, 80, 100, 120, 110, 130, 150];
      
      setLabels(dummyLabels);
      setEnergyData(dummyData);
      setLoading(false);
    };

    fetchDummyData();

    // Optionally set an interval for future data updates
    const interval = setInterval(fetchDummyData, 60000); // Fetch new data every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Energy Consumption (kWh)',
        data: energyData,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h5" style={{ fontWeight: 'bolder', fontFamily: 'serif', textAlign: 'center', textTransform: 'uppercase', backgroundColor: 'lightgreen',}}>
          Energy Consumption Analytics
        </Typography>
        
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Line data={chartData} />
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              This chart shows your energy consumption over the last 12 months.
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default EnergyAnalytics;