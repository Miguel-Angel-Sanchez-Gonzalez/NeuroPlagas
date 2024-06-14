import React, { useState } from 'react';
import { Switch, FormControlLabel, Typography, Box } from '@mui/material';

const NotificationSwitch = ({ onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onChange(event.target.checked ? 'Tratada' : 'Sin ver');
  };

  return (
    <Box display="flex" alignItems="center">
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label=""
      />
      <Typography variant="body1" marginLeft={1}>
        {checked ? 'Tratada' : 'Sin ver'}
      </Typography>
    </Box>
  );
};

export default NotificationSwitch;
