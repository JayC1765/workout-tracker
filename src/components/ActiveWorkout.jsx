import { Card, CardContent, Typography, Button } from '@mui/material';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import PropTypes from 'prop-types';
import WorkoutType from '../types/WorkoutType';

const ActiveWorkout = ({ workout, setShowTimer, setCurrWorkout }) => {
  const { name, reps, sets, description, status } = workout;

  const handleStart = () => {
    setShowTimer(true);
    setCurrWorkout(workout);
  };

  const renderButton = () => {
    return (
      status !== 'Completed' && (
        <Button
          variant="contained"
          color={status === 'Not Started' ? 'primary' : 'secondary'}
          onClick={handleStart}
        >
          {status === 'Not Started' ? 'Start Workout' : 'Continue'}
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
          {status === 'Completed' ? (
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

ActiveWorkout.propTypes = {
  workout: PropTypes.shape(WorkoutType).isRequired,
  setShowTimer: PropTypes.func.isRequired,
  setCurrWorkout: PropTypes.func.isRequired,
};

export default ActiveWorkout;
