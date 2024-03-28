import React, { useState } from 'react';
import ActiveWorkout from './ActiveWorkout';
import Timer from './Timer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ActiveWorkoutType } from '../types/types';

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
      if (workout.status !== 'Completed') {
        return (
          <ActiveWorkout
            key={workout.id}
            workout={workout}
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
          setShowTimer={setShowTimer}
          setCurrWorkout={setCurrWorkout}
        />
      );
    }
    return null;
  };

  return (
    <div>
      {!showTimer ? (
        <>
          {currWorkouts.length > 0 ? (
            <>
              <FormControlLabel
                onChange={() => setIsIncomplete(!isIncomplete)}
                control={<Switch />}
                label="Incomplete"
              />
              {currWorkouts.map(renderActiveWorkouts)}
            </>
          ) : (
            <p>Please add workout first</p>
          )}
        </>
      ) : (
        <Timer
          setShowTimer={setShowTimer}
          workout={currWorkout}
          currWorkouts={currWorkouts}
        />
      )}
    </div>
  );
};

export default StartWorkout;
