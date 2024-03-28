import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutType } from '../types/types';

interface WorkoutState {
  allWorkouts: WorkoutType[];
  categories: string[];
}

const initialState: WorkoutState = {
  allWorkouts: [],
  categories: [],
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setWorkoutsStore(state, action: PayloadAction<WorkoutType[]>) {
      state.allWorkouts = action.payload;
    },
    setCategoriesStore(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
  },
});

export const { setWorkoutsStore, setCategoriesStore } = workoutSlice.actions;
export default workoutSlice.reducer;
