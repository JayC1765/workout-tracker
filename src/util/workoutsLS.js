const getLSworkouts = (key) => {
  const workouts = localStorage.getItem(key);
  return workouts ? JSON.parse(workouts) : [];
};

const addLSworkouts = (key, workout) => {
  const workouts = getLSworkouts(key);
  console.log('inside addLSworkouts:', workouts);
  const updatedWorkouts = [...workouts, { ...workout, status: 'incomplete' }];
  localStorage.setItem(key, JSON.stringify(updatedWorkouts));
};

export { getLSworkouts, addLSworkouts };
