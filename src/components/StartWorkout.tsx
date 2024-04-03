import React, { useState } from 'react';
import ActiveWorkout from './ActiveWorkout';
import Timer from './Timer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ActiveWorkoutType, WorkoutStatus } from '../types/types';
import { Box } from '@mui/material';

interface StartWorkoutProps {
  currWorkouts: ActiveWorkoutType[];
}

const StartWorkout: React.FC<StartWorkoutProps> = ({ currWorkouts }) => {
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [currWorkout, setCurrWorkout] = useState<ActiveWorkoutType | null>(
    null
  );
  const [isIncomplete, setIsIncomplete] = useState(false);

  const renderActiveWorkouts = (
    workout: ActiveWorkoutType
  ): JSX.Element | null => {
    if (isIncomplete) {
      if (workout.status !== WorkoutStatus.Completed) {
        return (
          <ActiveWorkout
            key={workout.id}
            workout={workout}
            currWorkout={currWorkout}
            showTimer={showTimer}
            setShowTimer={setShowTimer}
            setCurrWorkout={setCurrWorkout}
          />
        );
      }
    } else {
      return (
        <ActiveWorkout
          key={workout.id}
          workout={workout}
          currWorkout={currWorkout}
          showTimer={showTimer}
          setShowTimer={setShowTimer}
          setCurrWorkout={setCurrWorkout}
        />
      );
    }
    return null;
  };

  return (
    <Box>
      {currWorkouts.length > 0 ? (
        <>
          {!showTimer && (
            <FormControlLabel
              onChange={() => setIsIncomplete(!isIncomplete)}
              control={<Switch />}
              label="Incomplete"
            />
          )}
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: showTimer ? '50%' : '100%' }}>
              {currWorkouts.map(renderActiveWorkouts)}
            </Box>
            {showTimer && (
              <Timer
                setShowTimer={setShowTimer}
                workout={currWorkout}
                currWorkouts={currWorkouts}
                setCurrWorkout={setCurrWorkout}
              />
            )}
          </Box>
        </>
      ) : (
        <p>Please add an exercise first</p>
      )}
    </Box>
  );
};

export default StartWorkout;
