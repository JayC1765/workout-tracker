const getLSWorkouts = (key) => {
  const workouts = localStorage.getItem(key);
  return workouts ? JSON.parse(workouts) : [];
};

const addLSWorkouts = (key, workout) => {
  const workouts = getLSWorkouts(key);
  const updatedWorkouts = [...workouts, { ...workout, status: 'Not Started' }];
  localStorage.setItem(key, JSON.stringify(updatedWorkouts));
};

export { getLSWorkouts, addLSWorkouts };
