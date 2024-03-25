import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { addLSWorkouts } from '../util/workoutsLS';

const WorkoutCard = ({ workout, setWorkouts }) => {
  const { id, name, category, description, difficulty, reps, sets } = workout;

  const handleAdd = (id) => {
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

WorkoutCard.propTypes = {
  workout: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    difficulty: PropTypes.string,
    reps: PropTypes.number,
    sets: PropTypes.number,
    currentSets: PropTypes.number,
  }).isRequired,
  setWorkouts: PropTypes.func.isRequired,
};

export default WorkoutCard;
