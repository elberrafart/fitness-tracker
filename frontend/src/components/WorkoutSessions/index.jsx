// WorkoutSessions/index.jsx
import React from 'react';
import { Box, Button, Flex, Heading, IconButton, SimpleGrid } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

// This component displays each workout session in a grid layout.
// It receives the list of sessions, a delete function, and a date formatting function as props.
const WorkoutSessions = ({ sessions, onDelete, formatDate }) => {
  const navigate = useNavigate(); // This hook is used for navigation between routes.

  // Returns a grid layout of workout sessions. For each session, it shows the date and provides options to view or delete.
  return (
    <SimpleGrid columns={[1, null, 2, 3]} spacing={10} mb={8}> {/* Adjusts the grid based on screen size */}
      {sessions.map((session) => ( // Maps over each session to create a card-like box for it.
        <Box key={session._id} p={8} shadow="xl" borderWidth="1px" borderRadius="lg"> {/* Styling for each session box */}
          <Heading fontSize="xl" mb={5}>Workout Session Date: {formatDate(session.date)}</Heading> {/* Shows the session date, formatted */}
          <Flex justifyContent="flex-end" alignItems="center"> {/* Aligns the buttons to the right */}
            <Button colorScheme="teal" mr={2} onClick={() => navigate(`/workoutSessions/${session._id}`)}>
              View Full Workout Here {/* Button to navigate to the detailed view of the session */}
            </Button>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              aria-label="Delete workout session"
              onClick={() => onDelete(session._id)} // Calls the passed-in delete function when clicked
            />
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default WorkoutSessions;
