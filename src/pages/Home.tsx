import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CreateWorkout from '../components/CreateWorkout.tsx';
import StartWorkout from '../components/StartWorkout.tsx';
import { getLSWorkouts } from '../util/workoutsLS.ts';
import { ActiveWorkoutType } from '../types/types';

const Home: React.FC = () => {
  const [tab, setTab] = useState<string>('create-workout');
  const [currWorkouts, setCurrWorkouts] = useState<ActiveWorkoutType[]>([]);

  useEffect(() => {
    // Retrieve user workouts from localStorage
    const updateWorkouts = () => {
      const workouts: ActiveWorkoutType[] = getLSWorkouts('myWorkouts');
      setCurrWorkouts(workouts);
    };

    updateWorkouts();

    window.addEventListener('workoutsLocalStorage', updateWorkouts);

    return () => {
      window.removeEventListener('workoutsLocalStorage', updateWorkouts);
    };
  }, []);

  const handleTab = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTab}>
            <Tab label="Create Workout" value="create-workout" />
            <Tab label="Start Workout" value="start-workout" />
          </TabList>
        </Box>
        <TabPanel value="create-workout">
          <CreateWorkout currWorkouts={currWorkouts} />
        </TabPanel>
        <TabPanel value="start-workout">
          <StartWorkout currWorkouts={currWorkouts} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Home;
