import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isValidPassword, setIsValidPassword] = useState(false);

  // Function to validate password and update strength
  const validatePassword = (password) => {
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const specialCharacterCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;
    if (lengthCriteria) strength += 25;
    if (uppercaseCriteria) strength += 25;
    if (numberCriteria) strength += 25;
    if (specialCharacterCriteria) strength += 25;

    setPasswordStrength(strength);
    setIsValidPassword(strength === 100);
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        width: '50vh',
        borderRadius: '5px',
        borderWidth: '3px',
        borderColor: '#333',
        borderStyle: 'solid',
      }}
    >
      <Typography variant="h4" style={{ marginBottom: '20px', color: '#333' }}>
        Sign In
      </Typography>
      <TextField
        label="Phone number, username or email"
        variant="outlined"
        type="text"
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        style={{ marginBottom: '20px', width: '300px' }}
        onChange={(e) => {
          setPassword(e.target.value);
          validatePassword(e.target.value);
        }}
      />
      
      {/* Password Strength Indicator */}
      <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#e0e0e0',
          borderRadius: '5px',
          marginBottom: '10px'
      }}>
        <div style={{
            height: '100%',
            width: `${passwordStrength}%`,
            backgroundColor:
              passwordStrength === 100 ? '#4caf50' : 
              passwordStrength >= 75 ? '#ffeb3b' : 
              passwordStrength >= 50 ? '#ff9800' : 
              '#f44336',
            borderRadius: '5px'
          }} />
      </div>

      {/* Password Requirements */}
      <Typography variant="body2" style={{ marginBottom: '10px', color: '#666' }}>
        Password must be:
      </Typography>
      <ul style={{ listStyleType: 'none', paddingLeft: '0', marginBottom: '20px' }}>
        <li style={{ color: password.length >= 8 ? '#4caf50' : '#f44336' }}>
          • At least 8 characters long
        </li>
        <li style={{ color: /[A-Z]/.test(password) ? '#4caf50' : '#f44336' }}>
          • At least one uppercase letter
        </li>
        <li style={{ color: /\d/.test(password) ? '#4caf50' : '#f44336' }}>
          • At least one number
        </li>
        <li style={{ color: /[!@#$%^&*(),.?":{}|<>]/.test(password) ? '#4caf50' : '#f44336' }}>
          • At least one special character
        </li>
      </ul>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/dashboard')}
        disabled={!isValidPassword}
        style={{
          backgroundColor: '#0ea5e9',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: '#1e40af',
          },
        }}
      >
        Sign In
      </Button>
    </Container>
  );
};

export default Home;
