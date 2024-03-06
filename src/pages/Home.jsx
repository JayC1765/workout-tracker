import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CreateWorkout from '../components/CreateWorkout';
import StartWorkout from '../components/StartWorkout';
import { getLSworkouts } from '../util/workoutsLS';

const Home = () => {
  const [tab, setTab] = useState('create-workout');
  const [currWorkouts, setCurrWorkouts] = useState([]);

  useEffect(() => {
    const updateWorkouts = () => {
      const workouts = getLSworkouts('myWorkouts');
      console.log('did this fire?');
      console.log(workouts);
      setCurrWorkouts(workouts);
    };

    updateWorkouts();

    window.addEventListener('workoutsLocalStorage', updateWorkouts);

    return () => {
      window.removeEventListener('workoutsLocalStorage', updateWorkouts);
    };
  }, []);

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTab} aria-label="lab API tabs example">
            <Tab label="Create Workout" value="create-workout" />
            <Tab label="Start Workout" value="start-workout" />
          </TabList>
        </Box>
        <TabPanel value="create-workout">
          <CreateWorkout />
        </TabPanel>
        <TabPanel value="start-workout">
          <StartWorkout currWorkouts={currWorkouts} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Home;