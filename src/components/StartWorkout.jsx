import React, { useEffect, useState } from 'react';

function StartWorkout() {
  const [activeWorkouts, setActiveWorkouts] = useState([]);

  useEffect(() => {
    const workouts = localStorage.getItem('myWorkouts');
    const parsedWorkouts = JSON.parse(workouts);
    setActiveWorkouts(parsedWorkouts);
  }, []);

  return (
    <div>
      <p>StartWorkout</p>
      {activeWorkouts.map((workout) => (
        <div key={workout.id}>
          {workout.name}
          {workout.description}
        </div>
      ))}
    </div>
  );
}

export default StartWorkout;
