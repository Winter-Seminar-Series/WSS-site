import { Button, ButtonGroup } from '@mui/material';
import React from 'react';

function RegistrationButton() {
  return (
    <ButtonGroup
      disableElevation
      variant="contained"
      size="small"
      aria-label="Disabled elevation buttons">
      <Button
        sx={{
          borderTopLeftRadius: '999rem',
          borderBottomLeftRadius: '999rem',
          textTransform: 'capitalize',
        }}>
        Sign Up
      </Button>
      <Button
        sx={{
          borderTopRightRadius: '999rem',
          borderBottomRightRadius: '999rem',
          backgroundColor: '#fff',
          textTransform: 'capitalize',
        }}
        variant="outlined">
        Login
      </Button>
    </ButtonGroup>
  );
}

export default RegistrationButton;
