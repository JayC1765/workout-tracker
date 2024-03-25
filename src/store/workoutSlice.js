import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allWorkouts: [],
  categories: [],
};

const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    setWorkouts(state, action) {
      state.allWorkouts = action.payload;
    },
  },
});

export const { setWorkouts } = workoutSlice.actions;
export default workoutSlice.reducer;
