import { useState, useEffect } from 'react';
import { CircularProgress, Typography, Button } from '@mui/material';

const Timer = ({ workout }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(null);
  const [sets, setSets] = useState(workout.sets);
  const [mode, setMode] = useState('active');

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (timeLeft === 1) {
            clearInterval(interval);
            setIsActive(false);
            setMode('rest');
            setSets((prevSet) => prevSet - 1);
            if (sets >= 2) {
              setTimeLeft(5);
              setIsResting(true);
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    if (isResting) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (timeLeft === 1) {
            setIsResting(false);
            setIsActive(true);
            setMode('active');
            setTimeLeft(10);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isResting, timeLeft, sets]);

  const handleStart = () => {
    setIsActive(true);
    setMode('active');
    setIsPaused(false);
  };

  const handlePause = () => {
    if (mode === 'active') {
      setIsActive(!isActive);

      if (isPaused === null) {
        setIsPaused(true);
      } else {
        setIsPaused(!isPaused);
      }
    }

    if (mode === 'rest') {
      setIsResting(!isResting);
      setIsPaused(!isPaused);
    }
  };

  const handleReset = () => {
    if (mode === 'active') {
      setTimeLeft(10);
      setIsActive(false);
    } else {
      setTimeLeft(5);
      setIsResting(false);
    }

    setIsPaused(true);
  };

  return (
    <div>
      <Typography>Go back</Typography>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Typography variant="h5">{workout.name}</Typography>
        <Typography variant="h5">Total Sets: {workout.sets}</Typography>
        <Typography>
          {sets > 0
            ? mode === 'active'
              ? `Sets Remaining: ${sets}`
              : 'REST PERIOD'
            : 'GREAT JOB! Workout Completed'}
        </Typography>
        {sets > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                marginTop: '20px',
              }}
            >
              <CircularProgress
                variant="determinate"
                value={
                  !isResting && mode === 'active'
                    ? (timeLeft / 10) * 100
                    : (timeLeft / 5) * 100
                }
                color={
                  !isResting && mode === 'active' ? 'primary' : 'secondary'
                }
                size={200}
                thickness={2}
                style={{ marginBottom: '20px' }}
              />
              <Typography
                variant="h4"
                style={{
                  position: 'absolute',
                  top: '45%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {timeLeft}
              </Typography>
            </div>
            {!isActive && !isResting && isPaused === null ? (
              <Button onClick={handleStart}>Start</Button>
            ) : (
              <div>
                <Button onClick={handlePause}>
                  {isPaused ? 'Continue' : 'Pause'}
                </Button>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
