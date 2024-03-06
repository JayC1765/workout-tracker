import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from '@mui/material';
import WorkoutCard from './WorkoutCard';

const CreateWorkout = () => {
  const [categories, setCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const allWorkouts = useSelector((state) => state.workouts.allWorkouts);

  useEffect(() => {
    const categories = [];

    allWorkouts.forEach((workout) => {
      if (!categories.includes(workout.category))
        categories.push(workout.category);
    });

    setCategories(categories);
  }, [allWorkouts]);

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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
          <InputLabel>Select a Muscle</InputLabel>
          <Select
            value={currCategory}
            onChange={(e) => setCurrCategory(e.target.value)}
            sx={{ textAlign: 'center' }}
          >
            {categories.map((category) => (
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

      {workouts.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {workouts.map((workout, index) => (
            <WorkoutCard key={index} workout={workout} />
          ))}
        </Box>
      )}
    </div>
  );
};

export default CreateWorkout;
