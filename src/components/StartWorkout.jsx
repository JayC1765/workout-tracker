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

  const handleSwitch = () => {
    setIsIncomplete(!isIncomplete);
  };

  return (
    <div>
      <FormControlLabel
        onChange={() => setIsIncomplete(!isIncomplete)}
        control={<Switch />}
        label="Incomplete"
      />

      {currWorkouts.length > 0 ? (
        !showTimer ? (
          currWorkouts.map((workout) => (
            <ActiveWorkout
              key={workout.id}
              workout={workout}
              setShowTimer={setShowTimer}
              setCurrWorkout={setCurrWorkout}
            />
          ))
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

export default StartWorkout;

StartWorkout.propTypes = {
  currWorkouts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
