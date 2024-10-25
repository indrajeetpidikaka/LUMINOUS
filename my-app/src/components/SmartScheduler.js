import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { lightGreen } from '@mui/material/colors';

const appliances = [
  { id: 1, name: 'Washing Machine', power: 5 },
  { id: 2, name: 'Dishwasher', power: 5 },
  { id: 3, name: 'Electric Vehicle Charger', power: 8 },
  { id: 4, name: 'Refrigerator', power: 0.5 },
  { id: 5, name: 'Air Conditioner', power: 3.5 },
  { id: 6, name: 'Heater', power: 2.5 },
  { id: 7, name: 'Microwave', power: 1.2 },
  { id: 8, name: 'Television', power: 0.1 },
];

const lowTariffTimes = ['08:00 AM', '10:00 PM'];
const HIGH_CONSUMPTION_THRESHOLD = 5;

function SmartScheduler() {
  const [currentPowerConsumption, setCurrentPowerConsumption] = useState(0);
  
  const [scheduledAppliances, setScheduledAppliances] = useState([]);
  
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const randomConsumption = Math.random() * 10;
      setCurrentPowerConsumption(randomConsumption);
      if (randomConsumption > HIGH_CONSUMPTION_THRESHOLD) {
        scheduleAppliances();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scheduleAppliances = () => {
    // Remove alert and directly handle scheduling
    const highPowerAppliances = appliances
      .filter(appliance => appliance.power >= HIGH_CONSUMPTION_THRESHOLD)
      .sort((a, b) => b.power - a.power);
    
    if (highPowerAppliances.length > 0) {
      const newScheduledAppliances = highPowerAppliances.map(appliance => {
        const time = lowTariffTimes[Math.floor(Math.random() * lowTariffTimes.length)];
        return { ...appliance, time };
      });

      setScheduledAppliances(newScheduledAppliances);
      
      const notificationMessage = newScheduledAppliances.map(appliance => 
        `${appliance.name} scheduled at ${appliance.time}`
      ).join(', ');
      
      setNotification(notificationMessage);

      setTimeout(() => {
        setNotification('');
      }, 6000);
    } else {
      // Optionally handle no appliances scheduled
      setNotification('No appliances can be scheduled due to low power consumption.');
      setTimeout(() => {
        setNotification('');
      }, 6000);
    }
  };

  return (
    <>
      <Card variant="outlined" style={{ marginBottom: '20px', borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center', fontFamily: 'serif', textTransform: 'uppercase', fontWeight: 'bolder', backgroundColor: 'lightGreen' }}>
            Smart Scheduling
          </Typography>

          <Typography variant="body1" style={{ marginTop: '20px', textAlign: 'center' }}>
            Current Power Consumption: {currentPowerConsumption.toFixed(2)} kW
          </Typography>

          <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
            Scheduled Appliances:
          </Typography>
          
          {scheduledAppliances.length === 0 ? (
            <Typography variant="body2" style={{ textAlign: 'center' }}>
              No appliances scheduled yet.
            </Typography>
          ) : (
            <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
              {scheduledAppliances.map((appliance) => (
                <li key={appliance.id}>
                  {appliance.name} - Scheduled at {appliance.time}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Notification Component */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          backgroundColor: '#4caf50',
          color: '#fff',
          padding: '10px',
          borderRadius: '5px',
          zIndex: '1000',
        }}>
          • {notification}
        </div>
      )}
    </>
  );
}

export default SmartScheduler;
