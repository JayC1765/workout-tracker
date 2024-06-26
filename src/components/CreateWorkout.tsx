import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from '@mui/material';
import WorkoutCard from './WorkoutCard.tsx';
import { ActiveWorkoutType, WorkoutType } from '../types/types';
import { setCategoriesStore } from '../store/workoutSlice.ts';
import { RootState } from '../store/store.ts';
import { useSelector, useDispatch } from 'react-redux';

interface CreateWorkoutProps {
  currWorkouts: ActiveWorkoutType[];
}

const CreateWorkout: React.FC<CreateWorkoutProps> = ({ currWorkouts }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [currCategory, setCurrCategory] = useState<string>('');
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const allWorkouts: WorkoutType[] = useSelector(
    (state: RootState) => state.workouts.allWorkouts
  );
  const dispatch = useDispatch();
  const [addedWorkoutIds, setAddedWorkoutIds] = useState<number[]>([]);

  useEffect(() => {
    setAddedWorkoutIds(currWorkouts.map((workout) => workout.id));
  }, [currWorkouts]);

  useEffect(() => {
    const getCategories = () => {
      const categories: string[] = [];

      allWorkouts.forEach((workout) => {
        if (!categories.includes(workout.category))
          categories.push(workout.category);
      });

      dispatch(setCategoriesStore(categories));

      return categories;
    };

    setCategories(getCategories());
  }, [allWorkouts, dispatch]);

  const handleClick = () => {
    const workoutList = allWorkouts.filter(
      (workout) => workout.category === currCategory
    );

    setWorkouts(workoutList);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>What do you want to workout today?</p>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
          <InputLabel>Select muscle group or activity</InputLabel>
          <Select
            value={currCategory}
            onChange={(e) => {
              setCurrCategory(e.target.value);
            }}
            sx={{ textAlign: 'center' }}
          >
            {categories &&
              categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <Button variant="contained" onClick={handleClick}>
        Generate Exercises
      </Button>

      {workouts.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {workouts.map((workout, index) => (
            <WorkoutCard
              key={index}
              workout={workout}
              addedWorkoutIds={addedWorkoutIds}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default CreateWorkout;
