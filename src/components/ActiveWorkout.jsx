import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ActiveWorkout = ({ workout, setShowTimer }) => {
  const [currStatus, setCurrentStatus] = useState(workout.status);

  const changeStatus = () => {
    setCurrentStatus('In Progress');
  };

  const renderButton = () => {
    return currStatus === 'Completed' ? (
      <p>Completed</p>
    ) : currStatus === 'Not Started' ? (
      <Button variant="contained" color="primary" onClick={changeStatus}>
        Start Workout
      </Button>
    ) : (
      <Button variant="contained" color="secondary" onClick={changeStatus}>
        Continue
      </Button>
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
          <strong>Status:</strong> {workout.status}
        </Typography>
        {renderButton()}
      </CardContent>
    </Card>
  );
};

export default ActiveWorkout;