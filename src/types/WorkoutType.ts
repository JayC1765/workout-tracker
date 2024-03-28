import PropTypes from 'prop-types';

const WorkoutType = {
  category: PropTypes.string.isRequired,
  currentSets: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  duration_minutes: PropTypes.number.isRequired,
  equipment: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  reps: PropTypes.number.isRequired,
  sets: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default WorkoutType;
