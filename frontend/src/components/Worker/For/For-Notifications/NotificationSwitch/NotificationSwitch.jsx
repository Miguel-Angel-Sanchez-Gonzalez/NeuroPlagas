import React, { useState } from 'react';
import { Switch, Box, styled } from '@mui/material';

const primaryColor = '#c62426';

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 80,
  height: 40,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 1,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(40px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: primaryColor,
        opacity: 1,
        border: 0,
      },
      '& .MuiSwitch-thumb': {
        color: '#fff',
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      width: 36,
      height: 36,
      borderRadius: 18,
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 20,
    backgroundColor: theme.palette.mode === 'dark' ? '#39393D' : '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    position: 'relative',
  },
}));

const NotificationSwitch = ({ onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onChange(event.target.checked ? 'Tratada' : 'Sin ver');
  };

  return (
    <Box display="flex" alignItems="center">
      <StyledSwitch checked={checked} onChange={handleChange} />
    </Box>
  );
};

export default NotificationSwitch;
