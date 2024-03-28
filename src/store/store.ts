import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from './workoutSlice';

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Export the store with RootState
export const store = configureStore({
  reducer: {
    workouts: workoutReducer,
  },
});
