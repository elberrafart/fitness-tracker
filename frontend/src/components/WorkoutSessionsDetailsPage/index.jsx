// WorkoutSessionsDetailsPage/index.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, VStack, HStack, Container, Input, Button, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

// This component shows the details of a specific workout session.
function WorkoutSessionsDetailsPage() {
  const { sessionId } = useParams(); // Extract session ID from the URL.
  const [sessionDetails, setSessionDetails] = useState(null); // Store session details.
  const [editMode, setEditMode] = useState({}); // Track edit mode state for each exercise.
  const [editedExercises, setEditedExercises] = useState([]); // Store a mutable copy of exercises for editing.
  const navigate = useNavigate()
  
  // Fetch session details when the component mounts or sessionId changes.
  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await fetch(`/api/workoutSessions/${sessionId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setSessionDetails(data); // Update state with fetched session details.
        setEditedExercises(data.exercises); // Initialize editable exercises with fetched data.
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchSessionDetails();
  }, [sessionId]);

  // Adds a new blank exercise to the editable exercises array.
  const handleAddExercise = () => {
    setEditedExercises([...editedExercises, { exerciseName: '', sets: '', reps: '', weight: '' }]);
  };

  // Updates an exercise's field value in the editable exercises array.
  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = editedExercises.map((exercise, idx) => 
      idx === index ? { ...exercise, [field]: value } : exercise
    );
    setEditedExercises(updatedExercises);
  };

  // Saves changes made to exercises, updating the session details state and backend.
  const handleSave = async (index) => {
    const updatedSession = { ...sessionDetails, exercises: editedExercises };
    try {
      // await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workoutSessions`, {
      await fetch(`/api/workoutSessions/${sessionId}`, {
        method: 'PUT', // or 'PATCH' if updating individual exercises
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSession),
      });
      setEditMode({ ...editMode, [index]: false }); // Exit edit mode for the saved exercise.
      setSessionDetails(updatedSession); // Reflect the saved changes in the session details state.
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  // Removes an exercise from the editable exercises array.
  const handleDeleteExercise = (index) => {
    const updatedExercises = editedExercises.filter((_, idx) => idx !== index);
    setEditedExercises(updatedExercises);
    // Optionally, update the backend with the new exercises array here.
  };

  // Show a loading message until session details are fetched.
  if (!sessionDetails) {
    return <Box>Loading session details...</Box>;
  }

  // Render the session details and editable exercises.
  return (
    <Container maxW="container.md" centerContent>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" mt="5">
        <Heading as="h1" size="xl" textAlign="center" mb="5">Workout Session Details</Heading>
        <Text fontSize="lg" mb="2">Date: {new Date(sessionDetails.date).toLocaleDateString()}</Text>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={handleAddExercise} mb={4}>Add Exercise</Button>
        <VStack spacing={4} align="stretch">
          {editedExercises.map((exercise, index) => (
            <Box key={index} p={4} shadow="sm" borderWidth="1px" borderRadius="lg">
              <VStack spacing={2}>
                {/* Render editable fields for each exercise attribute. */}
                <EditableField label="Name" value={exercise.exerciseName} isEditing={editMode[index]} onChange={(value) => handleExerciseChange(index, 'exerciseName', value)} />
                <EditableField label="Sets" value={exercise.sets} isEditing={editMode[index]} onChange={(value) => handleExerciseChange(index, 'sets', value)} />
                <EditableField label="Reps" value={exercise.reps} isEditing={editMode[index]} onChange={(value) => handleExerciseChange(index, 'reps', value)} />
                <EditableField label="Weight" value={exercise.weight} isEditing={editMode[index]} onChange={(value) => handleExerciseChange(index, 'weight', value)} />
              </VStack>
              {/* Render edit/save and delete buttons for each exercise. */}
              <HStack justify="space-between" mt={2}>
                {editMode[index] ? (
                  <>
                    <IconButton icon={<CheckIcon />} onClick={() => handleSave(index)} aria-label="Save" />
                    <IconButton icon={<CloseIcon />} onClick={() => setEditMode({ ...editMode, [index]: false })} aria-label="Cancel" />
                  </>
                ) : (
                  <IconButton icon={<EditIcon />} onClick={() => setEditMode({ ...editMode, [index]: true })} aria-label="Edit" />
                )}
                <IconButton icon={<DeleteIcon />} colorScheme="red" onClick={() => handleDeleteExercise(index)} aria-label="Delete" />
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
      {/* Button to go back home */}
      <Button
        mt={4}
        colorScheme="teal"
        onClick={() => navigate('/')}
      >
        Go Back Home
      </Button>
    </Container>
  );
  
}

// EditableField component allows editing of individual fields within an exercise.
function EditableField({ label, value, isEditing, onChange }) {
  return (
    <HStack width="full">
      <Text minWidth="75px" fontWeight="bold">{label}:</Text>
      {isEditing ? (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Text>{value}</Text> // Display the value as text when not editing.
      )}
    </HStack>
  );
}

export default WorkoutSessionsDetailsPage;
