import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CreateWorkout from '../components/CreateWorkout';
import StartWorkout from '../components/StartWorkout';

const Home = () => {
  const [value, setValue] = useState('create-workout');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Create Workout" value="create-workout" />
            <Tab label="Start Workout" value="start-workout" />
          </TabList>
        </Box>
        <TabPanel value="create-workout">
          <CreateWorkout />
        </TabPanel>
        <TabPanel value="start-workout">
          <StartWorkout />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Home;
