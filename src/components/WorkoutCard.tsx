import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import { addLSWorkouts, removeLSWorkouts } from '../util/workoutsLS.ts';
import { WorkoutType } from '../types/types.ts';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface WorkoutCardProps {
  workout: WorkoutType;
  addedWorkoutIds: number[];
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  addedWorkoutIds,
}) => {
  const { id, name, category, description, difficulty, reps, sets } = workout;

  const handleAdd = () => {
    addLSWorkouts('myWorkouts', workout);
    console.log('Exercise added to LS');
    window.dispatchEvent(new Event('workoutsLocalStorage'));
  };

  const handleDelete = (id: number) => {
    removeLSWorkouts('myWorkouts', id);
    console.log('Exercise removed from LS');
    window.dispatchEvent(new Event('workoutsLocalStorage'));
  };

  return (
    <Card
      sx={{
        backgroundColor: addedWorkoutIds.includes(id)
          ? '#C8C8C8'
          : 'transparent',
      }}
    >
      <CardHeader title={name} subheader={category} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <CardContent sx={{ flex: '1 1 auto' }}>
          <Typography variant="h6">Difficulty Level: {difficulty}</Typography>
          <Typography variant="body1">Description: {description}</Typography>
          <Typography variant="h6">Sets: {sets}</Typography>
          <Typography variant="h6">Reps: {reps}</Typography>
        </CardContent>
        <CardActions>
          {addedWorkoutIds.includes(id) ? (
            <Button
              onClick={() => handleDelete(id)}
              sx={{ fontSize: '1.5rem' }}
            >
              <FaMinus color="red" />
            </Button>
          ) : (
            <Button onClick={() => handleAdd()} sx={{ fontSize: '1.5rem' }}>
              <FaPlus color="green" />
            </Button>
          )}
        </CardActions>
      </Box>
    </Card>
  );
};

export default WorkoutCard;
