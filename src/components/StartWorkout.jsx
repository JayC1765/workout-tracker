import { useState } from 'react';
import PropTypes from 'prop-types';
import ActiveWorkout from './ActiveWorkout';
import Timer from './Timer';

function StartWorkout({ currWorkouts }) {
  const [showTimer, setShowTimer] = useState(false);
  const [workout, setWorkout] = useState({
    id: 11,
    name: 'Dumbbell Flyes',
    description:
      'Dumbbell flyes are an isolation exercise that targets the chest muscles.',
    difficulty: 'Intermediate',
    equipment: 'Dumbbells',
    duration_minutes: 20,
    category: 'Chest',
    sets: 2,
    reps: 12,
    status: 'Not Started',
  });

  return (
    <div>
      {showTimer ? (
        currWorkouts &&
        currWorkouts.map((workout, index) => (
          <ActiveWorkout
            key={index}
            workout={workout}
            setShowTimer={setShowTimer}
          />
        ))
      ) : (
        <Timer setShowTimer={setShowTimer} workout={workout} />
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
