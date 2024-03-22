import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ActiveWorkout from './ActiveWorkout';
import Timer from './Timer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function StartWorkout({ currWorkouts, setCurrWorkouts }) {
  const [showTimer, setShowTimer] = useState(false);
  const [currWorkout, setCurrWorkout] = useState(null);
  const [isIncomplete, setIsIncomplete] = useState(false);

  const renderActiveWorkouts = (workout) => {
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
          <FormControlLabel
            onChange={() => setIsIncomplete(!isIncomplete)}
            control={<Switch />}
            label="Incomplete"
          />
          {currWorkouts.length > 0 ? (
            currWorkouts.map(renderActiveWorkouts)
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
}

StartWorkout.propTypes = {
  currWorkouts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StartWorkout;
