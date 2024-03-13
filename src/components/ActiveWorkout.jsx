import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { IoIosCheckmarkCircle } from 'react-icons/io';

const ActiveWorkout = ({ workout, setShowTimer, setCurrWorkout }) => {
  const [currStatus, setCurrentStatus] = useState(workout.status);

  const handleStart = () => {
    setShowTimer(true);
    setCurrWorkout(workout);
  };

  const renderButton = () => {
    return (
      currStatus !== 'Completed' && (
        <Button
          variant="contained"
          color={currStatus === 'Not Started' ? 'primary' : 'secondary'}
          onClick={handleStart}
        >
          {currStatus === 'Not Started' ? 'Start Workout' : 'Continue'}
        </Button>
      )
    );
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {workout.name}
        </Typography>
        <Typography variant="body1">
          <strong>Reps:</strong> {workout.reps}
        </Typography>
        <Typography variant="body1">
          <strong>Sets:</strong> {workout.sets}
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> {workout.description}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong>{' '}
          {workout.status === 'Completed' ? (
            <IoIosCheckmarkCircle
              style={{ fontSize: '20px', color: 'green' }}
            />
          ) : (
            workout.status
          )}
        </Typography>
        {renderButton()}
      </CardContent>
    </Card>
  );
};

export default ActiveWorkout;
