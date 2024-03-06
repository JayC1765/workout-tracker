import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function StartWorkout({ currWorkouts }) {
  console.log(currWorkouts);

  return (
    <div>
      <p>StartWorkout</p>
      {currWorkouts &&
        currWorkouts.map((workout, index) => (
          <div key={index}>
            {workout.name}
            {workout.status}
          </div>
        ))}
    </div>
  );
}

export default StartWorkout;

StartWorkout.propTypes = {
  currWorkouts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
