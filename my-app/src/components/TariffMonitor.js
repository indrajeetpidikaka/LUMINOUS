import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { green } from '@mui/material/colors';

// Expanded dummy tariff data
const initialTariffs = [
  { id: 1, time: '12:00 AM', price: 0.10 },
  { id: 2, time: '01:00 AM', price: 0.09 },
  { id: 3, time: '02:00 AM', price: 0.08 },
  { id: 4, time: '03:00 AM', price: 0.07 },
  { id: 5, time: '04:00 AM', price: 0.06 },
  { id: 6, time: '05:00 AM', price: 0.07 },
  { id: 7, time: '06:00 AM', price: 0.12 },
  { id: 8, time: '07:00 AM', price: 0.15 },
  { id: 9, time: '08:00 AM', price: 0.20 },
  { id: 10, time: '09:00 AM', price: 0.25 },
  { id: 11, time: '10:00 AM', price: 0.30 },
  { id: 12, time: '11:00 AM', price: 0.28 },
];

// Expanded dummy future tariff data (forecast)
const futureTariffs = [
    { time:'12:00 AM', price : .11},
    {time:'01:00 AM', price : .10},
    {time:'02:00 AM', price : .09},
    {time:'03:00 AM', price : .08},
    {time:'04:00 AM', price : .07},
    {time:'05:00 AM', price : .06},
    {time:'06:00 AM', price : .15},
    {time:'07:00 AM', price : .20},
    {time:'08:00 AM', price : .30},
    {time:'09:00 AM', price : .35},
    {time:'10:00 AM', price : .40},
    {time:'11:00 AM', price : .38},
];

function TariffMonitor() {
    const [tariffs, setTariffs] = useState(initialTariffs);
    const [loading, setLoading] = useState(true);
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        // Simulate fetching real-time data
        const fetchTariffs = () => {
            setTimeout(() => {
                setTariffs(initialTariffs); // Simulate fetching current rates
                setLoading(false);
            },1000);
        };

        fetchTariffs();

        // Fetch new data every minute
        const interval = setInterval(fetchTariffs,60000);

        return () => clearInterval(interval);
    },[]);

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
        console.log("Selected Time:", event.target.value);
    };

    // Get current prices based on selected time
    const currentPrice = tariffs.find(tariff => tariff.time === selectedTime);

    // Get upcoming prices based on selected time (next two)
    const upcomingPrices = futureTariffs.filter(futureTariff => futureTariff.time > selectedTime).slice(0,2); // Get next two upcoming prices

    return (
        <Card variant="outlined" style={{ marginBottom:'20px' , borderRadius:'8px'}}>
            <CardContent>
                <Typography variant="h5" style={{ marginBottom:'20px' , textAlign:'center' , fontWeight:'bolder' , fontFamily :'serif' , textTransform :'uppercase', backgroundColor: 'lightgreen'}}>
                    Real-Time Tariff Monitoring
                </Typography>

                {/* Loading spinner */}
                {
                    loading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <FormControl fullWidth variant="outlined" style={{ marginBottom :'20px'}}>
                                <InputLabel id="time-select-label">Select Time</InputLabel>
                                <Select
                                    labelId="time-select-label"
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                    label="Select Time"
                                >
                                    {/* Populate select options with tariff times */}
                                    {
                                        tariffs.map((tariff) => (
                                            <MenuItem key={tariff.id} value={tariff.time}>
                                                {tariff.time}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                            {/* Display current prices if a time is selected */}
                            {
                                selectedTime && currentPrice && (
                                    <Card variant="outlined" style={{ padding :'10px' , textAlign :'center' , marginBottom :'20px'}}>
                                        <Typography variant="h6">{currentPrice.time}</Typography>
                                        <Typography variant="body1">Current Price:${currentPrice.price.toFixed(2)}</Typography>
                                    </Card>
                                )
                            }

                            {/* Display upcoming prices if a time is selected */}
                            {
                                selectedTime && upcomingPrices.length >0 && (
                                    <>
                                        <Typography variant="h6" style={{ marginTop :'20px' , textAlign :'center'}}>
                                            Upcoming Prices
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {
                                                upcomingPrices.map((futureTariff , index) => (
                                                    <Grid item xs={12} md={6} key={index}>
                                                        <Card variant="outlined" style={{ padding :'10px' , textAlign :'center'}}>
                                                            <Typography variant="h6">{futureTariff.time}</Typography>
                                                            <Typography variant="body1">Forecast Price:${futureTariff.price.toFixed(2)}</Typography>
                                                        </Card>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </>
                                )
                            }
                        </>
                    )
                }
            </CardContent>
        </Card>
    );
}

export default TariffMonitor;