import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const WorkoutCard = ({ workout }) => {
  const { name, category, description, difficulty, reps, sets } = workout;

  const setWorkoutsLS = (workouts) => {
    localStorage.setItem('myWorkouts', JSON.stringify(workouts));
  };

  const getWorkoutsLS = () => {
    const workouts = localStorage.getItem('myWorkouts');
    return workouts ? JSON.parse(workouts) : [];
  };

  const handleAdd = () => {
    const myWorkouts = getWorkoutsLS();
    const updatedWorkouts = [
      ...myWorkouts,
      { ...workout, status: 'incomplete' },
    ];
    setWorkoutsLS(updatedWorkouts);
    console.log('successfully added workout');
  };

  return (
    <Card>
      <CardHeader title={name} subheader={category} />
      <Box sx={{ display: 'flex' }}>
        <CardContent>
          <Typography variant="h6">Difficulty Level: {difficulty}</Typography>
          <Typography variant="h6">Description: {description}</Typography>
          <Typography variant="h6">Sets: {sets}</Typography>
          <Typography variant="h6">Reps: {reps}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleAdd}>Add Workout</Button>
        </CardActions>
      </Box>
    </Card>
  );
};

WorkoutCard.propTypes = {
  workout: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    difficulty: PropTypes.string,
    reps: PropTypes.number,
    sets: PropTypes.number,
  }).isRequired,
};

export default WorkoutCard;
