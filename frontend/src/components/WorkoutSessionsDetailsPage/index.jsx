import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, VStack, HStack, Container } from '@chakra-ui/react';

// This component shows the details of a specific workout session
function WorkoutSessionsDetailsPage() {
  // Extract the sessionId from the URL using the useParams hook
  const { sessionId } = useParams();
  // Initialize state to store the details of the session
  const [sessionDetails, setSessionDetails] = useState(null);

  // Use useEffect to fetch the session details when the component mounts or the sessionId changes
  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        // Fetch the session details from the API
        const response = await fetch(`http://localhost:3000/api/workoutSessions/${sessionId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        // Update the state with the fetched session details
        setSessionDetails(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchSessionDetails();
  }, [sessionId]); // Re-run the effect if sessionId changes

  // Display a loading message if the session details haven't been fetched yet
  if (!sessionDetails) {
    return <Box>Loading session details...</Box>;
  }

  // Render the details of the workout session
  return (
    <Container maxW="container.md" centerContent>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" mt="5">
        <Heading as="h1" size="xl" textAlign="center" mb="5">Workout Session Details</Heading>
        {/* Display the date of the session */}
        <Text fontSize="lg" mb="2">Date: {new Date(sessionDetails.date).toLocaleDateString()}</Text>
        <Heading as="h3" size="md" mb="2">Exercises:</Heading>
        {/* List all the exercises included in the session */}
        <VStack spacing={4} align="stretch">
          {sessionDetails.exercises.map((exercise, index) => (
            <Box key={index} p={4} shadow="sm" borderWidth="1px" borderRadius="lg">
              <HStack justify="space-between">
                <Text fontWeight="bold">Name:</Text>
                <Text>{exercise.exerciseName}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Sets:</Text>
                <Text>{exercise.sets}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Reps:</Text>
                <Text>{exercise.reps}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Weight:</Text>
                <Text>{exercise.weight} lbs</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Container>
  );
}

export default WorkoutSessionsDetailsPage;
