import { ActiveWorkoutType, WorkoutType, WorkoutStatus } from '../types/types';

const getLSWorkouts = (key: string): ActiveWorkoutType[] => {
  const workouts = localStorage.getItem(key);
  return workouts ? JSON.parse(workouts) : [];
};

const addLSWorkouts = (key: string, workout: WorkoutType) => {
  const workouts = getLSWorkouts(key);
  const updatedWorkouts = [
    ...workouts,
    { ...workout, status: WorkoutStatus.NotStarted, currentSets: workout.sets },
  ];
  localStorage.setItem(key, JSON.stringify(updatedWorkouts));
};

const updateLSWorkout = (key: string, workouts: ActiveWorkoutType[]) => {
  localStorage.setItem(key, JSON.stringify(workouts));
};

export { getLSWorkouts, addLSWorkouts, updateLSWorkout };
