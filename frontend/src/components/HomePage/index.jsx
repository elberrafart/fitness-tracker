import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Center, Flex, Heading, Text, SimpleGrid, Box, Image } from '@chakra-ui/react';
import NewWorkoutForm from '../NewWorkoutForm';
import WorkoutSessions from '../WorkoutSessions';

// Define the HomePage functional component
const HomePage = () => {
  // State to hold the list of workout sessions
  const [sessions, setSessions] = useState([]);
  // Hook to navigate programmatically between routes
  const navigate = useNavigate();

  // Effect hook to fetch workout sessions from the server when the component mounts
  useEffect(() => {
    fetchWorkoutSessions();
  }, []);

  // Function to fetch workout sessions from the backend
  const fetchWorkoutSessions = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/workoutSessions');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Function to handle adding a new workout session
  const handleAddWorkout = async (workoutSession) => {
    try {
      const response = await fetch('http://localhost:3000/api/workoutSessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutSession),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSessions([...sessions, data]);
    } catch (error) {
      console.error("Error adding workout session:", error);
    }
  };

  // Function to handle deleting a workout session
  const handleDelete = async (sessionId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/workoutSessions/${sessionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setSessions(sessions.filter(session => session._id !== sessionId));
    } catch (error) {
      console.error("Error deleting workout session:", error);
    }
  };

  // Function to format a date string
  const formatDate = (dateString) => {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render the homepage UI
  return (
    <Center w="100%">
      <Container maxW="100%" centerContent py={12}>
        <Flex justify="space-between" align="center" mb={10}>
          <Image src="https://i.imgur.com/EXUAS95.png" boxSize="50px" mr={2} />
          <Heading as="h1" size="2xl">Gainz Log</Heading>
        </Flex>
        <WorkoutSessions sessions={sessions} onDelete={handleDelete} formatDate={formatDate} />
        <Box mt={8}>
          <NewWorkoutForm onAdd={handleAddWorkout} />
        </Box>
        <Box textAlign="center" mt={16}>
          <Text fontSize="lg">©2024 Created by Raz</Text>
        </Box>
      </Container>
    </Center>
  );
};

// Export the HomePage component for use in other parts of the app
export default HomePage;
