import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { ActiveWorkoutType, WorkoutStatus } from '../types/types';

interface ActiveWorkoutProps {
  workout: ActiveWorkoutType;
  setShowTimer: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrWorkout: React.Dispatch<
    React.SetStateAction<ActiveWorkoutType | null>
  >;
}

const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({
  workout,
  setShowTimer,
  setCurrWorkout,
}) => {
  const { name, reps, sets, description, status } = workout;

  const handleStart = () => {
    setShowTimer(true);
    setCurrWorkout(workout);
  };

  const renderButton = () => {
    return (
      status !== WorkoutStatus.Completed && (
        <Button
          variant="contained"
          color={status === WorkoutStatus.NotStarted ? 'primary' : 'secondary'}
          onClick={handleStart}
        >
          {status === WorkoutStatus.NotStarted ? 'Start exercise' : 'Continue'}
        </Button>
      )
    );
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body1">
          <strong>Reps:</strong> {reps}
        </Typography>
        <Typography variant="body1">
          <strong>Sets:</strong> {sets}
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> {description}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong>{' '}
          {status === WorkoutStatus.Completed ? (
            <IoIosCheckmarkCircle
              style={{ fontSize: '20px', color: 'green' }}
            />
          ) : (
            status
          )}
        </Typography>
        {renderButton()}
      </CardContent>
    </Card>
  );
};

export default ActiveWorkout;
