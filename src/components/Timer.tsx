import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Button } from '@mui/material';
import { updateLSWorkout } from '../util/workoutsLS';
import { IoIosSettings } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import Settings from './Settings';
import Box from '@mui/material/Box';
import { ActiveWorkoutType, WorkoutStatus } from '../types/types';

enum TimerMode {
  ACTIVE = 'active',
  REST = 'rest',
}

interface TimerProps {
  workout: ActiveWorkoutType | null;
  setShowTimer: React.Dispatch<React.SetStateAction<boolean>>;
  currWorkouts: ActiveWorkoutType[];
}

const Timer: React.FC<TimerProps> = ({
  workout,
  setShowTimer,
  currWorkouts,
}) => {
  const [workTime, setWorkTime] = useState<number>(10);
  const [restTime, setRestTime] = useState<number>(5);
  const [timeLeft, setTimeLeft] = useState<number>(workTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean | null>(null);
  const [sets, setSets] = useState<number>(workout?.currentSets || 0);
  const [mode, setMode] = useState<TimerMode>(TimerMode.ACTIVE);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (timeLeft === 1) {
            clearInterval(interval);
            setIsActive(false);
            setMode(TimerMode.REST);
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
            setMode(TimerMode.ACTIVE);
            setTimeLeft(workTime);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isResting, timeLeft, sets]);

  useEffect(() => {
    if (workout) {
      const updatedWorkouts = currWorkouts.map((w) =>
        w.id === workout.id
          ? {
              ...workout,
              currentSets: sets,
              status:
                sets === 0 ? WorkoutStatus.Completed : WorkoutStatus.InProgress,
            }
          : w
      );

      updateLSWorkout('myWorkouts', updatedWorkouts);
      window.dispatchEvent(new Event('workoutsLocalStorage'));
    }
  }, [sets]);

  const handleStart = () => {
    setIsActive(true);
    setMode(TimerMode.ACTIVE);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (mode === TimerMode.ACTIVE) {
      setIsActive(!isActive);

      if (isPaused === null) {
        setIsPaused(true);
      } else {
        setIsPaused(!isPaused);
      }
    }

    if (mode === TimerMode.REST) {
      setIsResting(!isResting);
      setIsPaused(!isPaused);
    }

    setShowSettings(false);
  };

  const handleReset = () => {
    if (mode === TimerMode.ACTIVE) {
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
        {workout && (
          <>
            <Typography variant="h5">{workout.name}</Typography>
            <Typography variant="h5">Total Sets: {workout.sets}</Typography>
            <Typography>
              {sets > 0
                ? mode === TimerMode.ACTIVE
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
                      !isResting && mode === TimerMode.ACTIVE
                        ? (timeLeft / workTime) * 100
                        : (timeLeft / restTime) * 100
                    }
                    color={
                      !isResting && mode === TimerMode.ACTIVE
                        ? 'primary'
                        : 'secondary'
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
          </>
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
