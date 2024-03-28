import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setWorkoutsStore } from './store/workoutSlice.ts';
import Navbar from './components/Navbar';
import Home from './pages/Home.tsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('workouts.json');
        if (!response.ok) {
          throw new Error('Error occurred while fetching workouts');
        }

        const { workouts } = await response.json();
        dispatch(setWorkoutsStore(workouts));
      } catch (err) {
        console.log('Error while fetching workouts:', err);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
