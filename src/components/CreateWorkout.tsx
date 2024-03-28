import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from '@mui/material';
import WorkoutCard from './WorkoutCard.tsx';
import { ActiveWorkoutType, WorkoutType } from '../types/types';
import { setCategoriesStore } from '../store/workoutSlice.ts';
import { RootState } from '../store/store.ts';

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
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // consider memoizing this computation
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
  }, [allWorkouts]);

  const handleClick = () => {
    const currWorkoutsID = currWorkouts.map((workout) => workout.id);

    const workoutList = allWorkouts.filter(
      (workout) =>
        workout.category === currCategory &&
        !currWorkoutsID.includes(workout.id)
    );

    if (workoutList.length === 0) setIsDuplicate(true);
    setWorkouts(workoutList);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>What do you want to workout today?</p>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
          <InputLabel>Select a Muscle</InputLabel>
          <Select
            value={currCategory}
            onChange={(e) => {
              setCurrCategory(e.target.value);
              setIsDuplicate(false);
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
        Generate Workout
      </Button>

      {workouts.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {workouts.map((workout, index) => (
            <WorkoutCard
              key={index}
              workout={workout}
              setWorkouts={setWorkouts}
            />
          ))}
        </Box>
      ) : (
        isDuplicate && (
          <Typography>
            All workouts in this muscle group has already been added.
          </Typography>
        )
      )}
    </div>
  );
};

export default CreateWorkout;
