// This component allows users to add new workout sessions with one or more exercises.
import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Box, IconButton, VStack, HStack } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons'; // Importing the CloseIcon for the remove button

const NewWorkoutForm = ({ onAdd }) => {
  // State for the date of the workout session
  const [date, setDate] = useState('');
  // State for the list of exercises. Initializes with one empty exercise.
  const [exercises, setExercises] = useState([
    { exerciseName: '', sets: '', reps: '', weight: '' },
  ]);

  // Handles changes to any of the exercise fields (name, sets, reps, weight)
  const handleExerciseChange = (index, event) => {
    const newExercises = [...exercises];
    newExercises[index][event.target.name] = event.target.value; // Update the specific exercise's field based on input name
    setExercises(newExercises);
  };

  // Adds a new empty exercise to the list of exercises
  const addExercise = () => {
    setExercises([...exercises, { exerciseName: '', sets: '', reps: '', weight: '' }]);
  };

  // Removes an exercise from the list based on its index
  const removeExercise = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1); // Remove the exercise at the given index
    setExercises(newExercises);
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedExercises = exercises.map(exercise => ({
      ...exercise,
      sets: Number(exercise.sets),
      reps: Number(exercise.reps),
      weight: Number(exercise.weight),
    }));
  
  
    const workoutSession = {
      date, // Ensure date is in ISO format or compatible with Date type in Mongoose
      exercises: formattedExercises,
    };
  
    try {
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
      console.log(data); // For debugging
      onAdd(data); // Update the state or UI accordingly
  
      // Reset form state
      setDate('');
      setExercises([{ exerciseName: '', sets: '', reps: '', weight: '' }]);
    } catch (error) {
      console.error("Error adding workout session:", error);
    }
  };
  

  return (
    <Box as="form" onSubmit={handleSubmit}>
      {/* Date input for the workout session */}
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </FormControl>
      {/* Map through each exercise in the state to create input fields for each one */}
      {exercises.map((exercise, index) => (
        <VStack key={index} spacing={4} align="stretch" mt={4}>
          {/* Exercise name input */}
          <FormControl>
            <FormLabel>Exercise Name</FormLabel>
            <Input name="exerciseName" value={exercise.exerciseName} onChange={(e) => handleExerciseChange(index, e)} />
          </FormControl>
          {/* Inputs for sets, reps, and weight with a remove button for each exercise */}
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Sets</FormLabel>
              <Input name="sets" type="number" value={exercise.sets} onChange={(e) => handleExerciseChange(index, e)} />
            </FormControl>
            <FormControl>
              <FormLabel>Reps</FormLabel>
              <Input name="reps" type="number" value={exercise.reps} onChange={(e) => handleExerciseChange(index, e)} />
            </FormControl>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <Input name="weight" type="number" value={exercise.weight} onChange={(e) => handleExerciseChange(index, e)} />
            </FormControl>
            {/* Remove button for the exercise */}
            <IconButton aria-label="Remove exercise" icon={<CloseIcon />} onClick={() => removeExercise(index)} />
          </HStack>
        </VStack>
      ))}
      {/* Button to add more exercises */}
      <Button mt={4} onClick={addExercise}>Add Exercise</Button>
      {/* Submit button for the form */}
      <Button mt={4} colorScheme="teal" type="submit">Submit Workout</Button>
    </Box>
  );
};

export default NewWorkoutForm;
