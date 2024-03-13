import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

const Settings = ({
  workTime,
  setWorkTime,
  restTime,
  setRestTime,
  setShowSettings,
  setTimeLeft,
}) => {
  const handleBack = () => {
    setShowSettings(false);
  };

  const handleWorkTime = (event, newValue) => {
    setWorkTime(newValue);
    setTimeLeft(newValue);
  };

  return (
    // <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
    <Box>
      <Button onClick={handleBack}>Back to Timer</Button>
      <Box sx={{ width: 300, marginTop: '40px' }}>
        <Slider
          value={workTime}
          // onChange={(event, newValue) => setWorkTime(newValue)}
          onChange={handleWorkTime}
          valueLabelDisplay="on"
          shiftStep={15}
          step={15}
          // marks
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
          }}
        />
        <Slider
          value={restTime}
          onChange={(event, newValue) => setRestTime(newValue)}
          valueLabelDisplay="auto"
          shiftStep={15}
          step={15}
          // marks
          min={15}
          max={120}
        />
      </Box>
    </Box>
  );
};

export default Settings;
