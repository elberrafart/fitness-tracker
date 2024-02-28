// HomePage/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Center, Flex, Heading, Text, SimpleGrid, Box } from '@chakra-ui/react';
import NewWorkoutForm from '../NewWorkoutForm';
import WorkoutSessions from '../WorkoutSessions';

const HomePage = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkoutSessions();
  }, []);

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

  const formatDate = (dateString) => {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Center w="100%">
      <Container maxW="100%" centerContent py={12}>
        <Flex justify="space-between" align="center" mb={10}>
          <Heading as="h1" size="2xl">Fitness Tracker</Heading>
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

export default HomePage;
