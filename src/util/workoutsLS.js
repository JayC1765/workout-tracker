const getLSWorkouts = (key) => {
  const workouts = localStorage.getItem(key);
  return workouts ? JSON.parse(workouts) : [];
};

const addLSWorkouts = (key, workout) => {
  const workouts = getLSWorkouts(key);
  const updatedWorkouts = [
    ...workouts,
    { ...workout, status: 'Not Started', currentSets: workout.sets },
  ];
  localStorage.setItem(key, JSON.stringify(updatedWorkouts));
};

const updateLSWorkout = (key, workouts) => {
  localStorage.setItem(key, JSON.stringify(workouts));
};

export { getLSWorkouts, addLSWorkouts, updateLSWorkout };
