import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { PropTypes } from 'prop-types';

const Settings = ({
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
  const handleWorkTime = (event, newValue) => {
    if (mode === 'active') {
      setTimeLeft(newValue);
    }
    setWorkTime(newValue);
    setIsActive(false);
    setIsPaused(true);
  };

  const handleRestTime = (event, newValue) => {
    if (mode === 'rest') {
      setTimeLeft(newValue);
    }
    setRestTime(newValue);
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

Settings.propTypes = {
  workTime: PropTypes.number,
  setWorkTime: PropTypes.func,
  restTime: PropTypes.number,
  setRestTime: PropTypes.func,
  setTimeLeft: PropTypes.func,
  setIsActive: PropTypes.func,
  setIsResting: PropTypes.func,
  setIsPaused: PropTypes.func,
  mode: PropTypes.string,
};

export default Settings;
