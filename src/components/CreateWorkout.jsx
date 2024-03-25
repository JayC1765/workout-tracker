import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import WorkoutCard from './WorkoutCard';
import WorkoutType from '../types/WorkoutType';

const CreateWorkout = ({ currWorkouts }) => {
  const [categories, setCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const allWorkouts = useSelector((state) => state.workouts.allWorkouts);
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    // consider memoizing this computation
    const getCategories = () => {
      const categories = [];

      allWorkouts.forEach((workout) => {
        if (!categories.includes(workout.category))
          categories.push(workout.category);
      });

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

CreateWorkout.propTypes = {
  currWorkouts: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape(WorkoutType)),
    PropTypes.array,
  ]).isRequired,
};

export default CreateWorkout;
