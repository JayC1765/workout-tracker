import { useState, useEffect } from 'react';
import { CircularProgress, Typography, Button } from '@mui/material';
import { updateLSWorkout } from '../util/workoutsLS';
import PropTypes from 'prop-types';
// import { IoIosSettings } from 'react-icons/io';

const Timer = ({ workout, setShowTimer, currWorkouts }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(null);
  const [sets, setSets] = useState(workout.currentSets);
  const [mode, setMode] = useState('active');

  console.log('current inside timer', workout);

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

  const handleBack = () => {
    setShowTimer(false);
  };

  return (
    <div>
      <Button onClick={handleBack}>Go back</Button>
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

// Timer.propTypes = {
//   workout: PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     category: PropTypes.string,
//     description: PropTypes.string,
//     difficulty: PropTypes.string,
//     reps: PropTypes.number,
//     sets: PropTypes.number,
//     currentSets: PropTypes.number,
//   }).isRequired,
//   setShowTimer: PropTypes.func.isRequired,
//   currWorkouts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       category: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       difficulty: PropTypes.string.isRequired,
//       reps: PropTypes.number.isRequired,
//       sets: PropTypes.number.isRequired,
//       currentSets: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };
