import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import { addLSWorkouts } from '../util/workoutsLS.ts';
import { WorkoutType } from '../types/types.ts';

interface WorkoutCardProps {
  workout: WorkoutType;
  setWorkouts: React.Dispatch<React.SetStateAction<WorkoutType[]>>;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, setWorkouts }) => {
  const { id, name, category, description, difficulty, reps, sets } = workout;

  const handleAdd = (id: number) => {
    addLSWorkouts('myWorkouts', workout);
    console.log('added to LS');
    window.dispatchEvent(new Event('workoutsLocalStorage'));

    setWorkouts((workouts) => workouts.filter((workout) => workout.id !== id));
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
          <Button onClick={() => handleAdd(id)}>Add Workout</Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default WorkoutCard;
