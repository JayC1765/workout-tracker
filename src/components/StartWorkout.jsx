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

  const mapWorkouts = (workout) => (
    <ActiveWorkout
      key={workout.id}
      workout={workout}
      setShowTimer={setShowTimer}
      setCurrWorkout={setCurrWorkout}
    />
  );

  return (
    <div>
      <FormControlLabel
        onChange={() => setIsIncomplete(!isIncomplete)}
        control={<Switch />}
        label="Incomplete"
      />

      {currWorkouts.length > 0 ? (
        !showTimer ? (
          isIncomplete ? (
            currWorkouts
              .filter((workout) => workout.status !== 'Completed')
              .map(mapWorkouts)
          ) : (
            currWorkouts.map(mapWorkouts)
          )
        ) : (
          <Timer
            setShowTimer={setShowTimer}
            workout={currWorkout}
            currWorkouts={currWorkouts}
          />
        )
      ) : (
        <p>Please add workout first</p>
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
