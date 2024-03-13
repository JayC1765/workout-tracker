import { useState } from 'react';
import PropTypes from 'prop-types';
import ActiveWorkout from './ActiveWorkout';
import Timer from './Timer';

function StartWorkout({ currWorkouts }) {
  const [showTimer, setShowTimer] = useState(false);
  const [currWorkout, setCurrWorkout] = useState(null);

  return (
    <div>
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
