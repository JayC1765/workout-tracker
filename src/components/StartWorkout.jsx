import { useState } from 'react';
import PropTypes from 'prop-types';
import ActiveWorkout from './ActiveWorkout';
import Timer from './Timer';
import { IoIosSettings } from 'react-icons/io';

function StartWorkout({ currWorkouts }) {
  const [showTimer, setShowTimer] = useState(false);
  const [currWorkout, setCurrWorkout] = useState(null);
  // const [workout, setWorkout] = useState({
  //   id: 11,
  //   name: 'Dumbbell Flyes',
  //   description:
  //     'Dumbbell flyes are an isolation exercise that targets the chest muscles.',
  //   difficulty: 'Intermediate',
  //   equipment: 'Dumbbells',
  //   duration_minutes: 20,
  //   category: 'Chest',
  //   sets: 2,
  //   reps: 12,
  //   status: 'Not Started',
  //   currentSets: 2,
  // });

  return (
    <div>
      {currWorkouts.length > 0 ? (
        !showTimer ? (
          // currWorkouts &&
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
