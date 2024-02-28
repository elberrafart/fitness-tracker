import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Center, Box, Button, Flex, Heading, Text, VStack, SimpleGrid } from '@chakra-ui/react';
import NewWorkoutForm from '../NewWorkoutForm'; // Import NewWorkoutForm component

const HomePage = () => {
  // State to store fetched workout sessions
  const [sessions, setSessions] = useState([]);
  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Fetch workout sessions from the backend API on component mount
  useEffect(() => {
    const fetchWorkoutSessions = async () => {
      try {
        // Attempt to fetch workout sessions from your API
        const response = await fetch('http://localhost:3000/api/workoutSessions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Update the sessions state with fetched data
        setSessions(data);
      } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error("Fetch error:", error);
      }
    };

    fetchWorkoutSessions();
  }, []);

  // Function to handle adding a new workout session
  const handleAddWorkout = async (workoutSession) => {
    try {
      // Send a POST request to add a new workout session
      const response = await fetch('http://localhost:3000/api/workoutSessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutSession),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Update the sessions state to include the newly added session
      setSessions([...sessions, data]);
    } catch (error) {
      // Log any errors that occur during the add operation
      console.error("Error adding workout session:", error);
    }
  };

  // Function to format date strings
  const formatDate = (dateString) => {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render the component
  return (
    <Center w="100%">
      <Container maxW="100%" centerContent py={12}>
        <Flex justify="space-between" align="center" mb={10}>
          <Heading as="h1" size="2xl">Fitness Tracker</Heading>
        </Flex>
        {/* Display each workout session as a card */}
        <SimpleGrid columns={[1, null, 2, 3]} spacing={10} mb={8}>
          {sessions.map((session) => (
            <Box key={session._id} p={8} shadow="xl" borderWidth="1px" borderRadius="lg">
              <Heading fontSize="xl" mb={5}>Workout Session Date: {formatDate(session.date)}</Heading>
              {/* Button to view full workout details */}
              <Button colorScheme="teal" onClick={() => navigate(`/workoutSessions/${session._id}`)}>View Full Workout Here</Button>
            </Box>
          ))}
        </SimpleGrid>
        {/* Include the form for adding new workout sessions */}
        <Box mt={8}>
          <NewWorkoutForm onAdd={handleAddWorkout} />
        </Box>
        {/* Footer */}
        <Box textAlign="center" mt={16}>
          <Text fontSize="lg">©2024 Created by Raz</Text>
        </Box>
      </Container>
    </Center>
  );
};

export default HomePage;
