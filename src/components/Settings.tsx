import React, { Dispatch, SetStateAction } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface SettingsProps {
  workTime: number;
  setWorkTime: Dispatch<SetStateAction<number>>;
  restTime: number;
  setRestTime: Dispatch<SetStateAction<number>>;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  setIsResting: Dispatch<SetStateAction<boolean>>;
  setIsPaused: Dispatch<SetStateAction<boolean | null>>;
  mode: string;
}

const Settings: React.FC<SettingsProps> = ({
  workTime,
  setWorkTime,
  restTime,
  setRestTime,
  setTimeLeft,
  setIsActive,
  setIsResting,
  setIsPaused,
  mode,
}) => {
  const handleWorkTime = (_event: Event, newValue: number | number[]) => {
    if (mode === 'active') {
      setTimeLeft(newValue as number);
    }
    setWorkTime(newValue as number);
    setIsActive(false);
    setIsPaused(true);
  };

  const handleRestTime = (_event: Event, newValue: number | number[]) => {
    if (mode === 'rest') {
      setTimeLeft(newValue as number);
    }
    setRestTime(newValue as number);
    setIsResting(false);
    setIsPaused(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        padding: '20px',
      }}
    >
      <Box sx={{ display: 'flex', width: '100%', gap: '30px' }}>
        <Typography variant="body1">Work</Typography>
        <Slider
          value={workTime}
          onChange={handleWorkTime}
          valueLabelDisplay="auto"
          shiftStep={15}
          step={15}
          min={15}
          max={120}
          sx={{
            '& .MuiSlider-thumb': {
              width: 24,
              height: 24,
              color: 'blue',
            },
            '& .MuiSlider-track': {
              height: 10,
            },
            marginBottom: '50px',
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', width: '100%', gap: '30px' }}>
        <Typography variant="body1">Rest</Typography>
        <Slider
          value={restTime}
          onChange={handleRestTime}
          valueLabelDisplay="auto"
          shiftStep={15}
          step={15}
          min={15}
          max={120}
          sx={{
            '& .MuiSlider-thumb': {
              width: 24,
              height: 24,
              color: 'red',
            },
            '& .MuiSlider-track': {
              height: 10,
            },
            marginBottom: '50px',
          }}
        />
      </Box>
    </Box>
  );
};

export default Settings;
