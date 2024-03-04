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
    setCategories(state) {
      const categories = [];

      state.allWorkouts.forEach((workout) => {
        if (!categories.includes(workout.category))
          categories.push(workout.category);
      });
    },
  },
});

export const { setWorkouts, setCategories } = workoutSlice.actions;
export default workoutSlice.reducer;
