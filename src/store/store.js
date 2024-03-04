import { configureStore } from '@reduxjs/toolkit';
import workoutSlice from './workoutSlice';

export const store = configureStore({
  reducer: {
    workouts: workoutSlice,
  },
});
