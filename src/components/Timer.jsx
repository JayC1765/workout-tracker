import { useState, useEffect } from 'react';
import { CircularProgress, Typography, Button } from '@mui/material';
import { updateLSWorkout } from '../util/workoutsLS';
import PropTypes from 'prop-types';
import { IoIosSettings } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import Settings from './Settings';
import Box from '@mui/material/Box';
import WorkoutType from '../types/WorkoutType';

const Timer = ({ workout, setShowTimer, currWorkouts }) => {
  const [workTime, setWorkTime] = useState(10);
  const [restTime, setRestTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(null);
  const [sets, setSets] = useState(workout.currentSets);
  const [mode, setMode] = useState('active');
  const [showSettings, setShowSettings] = useState(false);

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
              setTimeLeft(restTime);
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
            setTimeLeft(workTime);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isResting, timeLeft, sets]);

  useEffect(() => {
    const updatedWorkouts = currWorkouts.map((w) => {
      if (w.id === workout.id) {
        return sets === 0
          ? { ...workout, currentSets: sets, status: 'Completed' }
          : { ...workout, currentSets: sets, status: 'In Progress' };
      } else {
        return w;
      }
    });

    updateLSWorkout('myWorkouts', updatedWorkouts);
    window.dispatchEvent(new Event('workoutsLocalStorage'));
  }, [sets]);

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

    setShowSettings(false);
  };

  const handleReset = () => {
    if (mode === 'active') {
      setTimeLeft(workTime);
      setIsActive(false);
    } else {
      setTimeLeft(restTime);
      setIsResting(false);
    }

    setIsPaused(true);
    setShowSettings(false);
  };

  const handleBack = () => {
    setShowTimer(false);
    setIsActive(false);
    setIsResting(false);
    setShowSettings(false);
  };

  const handleSettings = () => {
    setShowSettings(!showSettings);
    setIsActive(false);
    setIsResting(false);
    setIsPaused(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: '10px 20px',
      }}
    >
      <Button onClick={handleBack}>Go back</Button>
      <Box
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
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Box
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
                    ? (timeLeft / workTime) * 100
                    : (timeLeft / restTime) * 100
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
            </Box>
            {!isActive && !isResting && isPaused === null ? (
              <Button onClick={handleStart}>Start</Button>
            ) : (
              <Box>
                <Button onClick={handlePause}>
                  {isPaused ? 'Continue' : 'Pause'}
                </Button>
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          ...(showSettings
            ? {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '400px',
              }
            : {}),
        }}
      >
        {!showSettings ? (
          <Button onClick={handleSettings}>
            <IoIosSettings style={{ fontSize: '24px' }} /> settings
          </Button>
        ) : (
          <Button onClick={() => setShowSettings(false)}>
            <IoMdClose style={{ fontSize: '24px' }} />
          </Button>
        )}
        {showSettings && (
          <Settings
            workTime={workTime}
            setWorkTime={setWorkTime}
            restTime={restTime}
            setRestTime={setRestTime}
            setTimeLeft={setTimeLeft}
            mode={mode}
            setIsActive={setIsActive}
            setIsResting={setIsResting}
            setIsPaused={setIsPaused}
          />
        )}
      </Box>
    </Box>
  );
};

export default Timer;

Timer.propTypes = {
  workout: PropTypes.shape(WorkoutType).isRequired,
  setShowTimer: PropTypes.func.isRequired,
  currWorkouts: PropTypes.arrayOf(PropTypes.shape(WorkoutType)).isRequired,
};
