import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormLabel, Input, Box, IconButton, VStack, HStack } from '@chakra-ui/react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { CloseIcon } from '@chakra-ui/icons';

// The NewWorkoutForm component is responsible for creating and submitting new workout sessions
const NewWorkoutForm = ({ onAdd }) => {
  // State for storing the date of the workout and the list of exercises
  const [date, setDate] = useState('');
  const [exercises, setExercises] = useState([{ exerciseName: '', sets: '', reps: '', weight: '' }]);

  // Function to fetch exercise options based on user input (e.g., as they type 'biceps')
  const fetchExercises = async (inputValue) => {
    // Static API key for fetching data
    const apiKey = '1NBPGGjXqcXPkTF8fHj5JQ==jJtRWtPcJ2NCiPWu';
    
    // Attempt to fetch exercises from the API and return options for the select input
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${inputValue}`, {
        headers: { 'X-Api-Key': apiKey },
      });
      if (!response.ok) throw new Error('Failed to fetch exercises');
      const data = await response.json();
      // Map the data to a format that can be used by the AsyncCreatableSelect component
      return data.map((exercise) => ({ label: exercise.name, value: exercise.name }));
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return [];
    }
  };
  
  // This effect runs once on component mount to fetch 'biceps' exercises as an initial data set
  useEffect(() => {
    fetchExercises('biceps');
  }, []);

  // Function to handle changes to the selected exercises in the form
  const handleExerciseChange = (selectedOption, index) => {
    const updatedExercises = [...exercises];
    updatedExercises[index].exerciseName = selectedOption ? selectedOption.value : '';
    setExercises(updatedExercises);
  };

  // Function to handle the submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the exercises for submission by filtering out incomplete entries
    const formattedExercises = exercises
      .map(ex => ({
        exerciseName: ex.exerciseName.trim(), // Remove whitespace
        sets: ex.sets || undefined, // Convert empty strings to undefined
        reps: ex.reps || undefined,
        weight: ex.weight || undefined,
      }))
      .filter(ex => ex.exerciseName); // Only include exercises with a name

    // Do not proceed if there are no exercises to submit
    if (formattedExercises.length === 0) {
      console.error('Please add at least one exercise');
      return;
    }

    // Create a new workout object with the date and prepared exercises
    const newWorkout = {
      date,
      exercises: formattedExercises,
    };

    // Call the onAdd function, which should be responsible for adding the new workout to the state
    onAdd(newWorkout);

    // Reset the form state after submission
    setDate('');
    setExercises([{ exerciseName: '', sets: '', reps: '', weight: '' }]);
  };

  

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel>Date</FormLabel>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </FormControl>
      {exercises.map((exercise, index) => (
        <VStack key={index} spacing={4} mt={4}>
          <FormControl>
            <FormLabel>Exercise Name</FormLabel>
            <AsyncCreatableSelect
              isClearable
              cacheOptions
              defaultOptions
              loadOptions={fetchExercises}
              onChange={(selectedOption) => handleExerciseChange(selectedOption, index)}
              placeholder="Type or select an option..."
            />
          </FormControl>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Sets</FormLabel>
              <Input
                name="sets"
                type="number"
                value={exercise.sets}
                onChange={(e) => {
                  const newExercises = [...exercises];
                  newExercises[index].sets = e.target.value;
                  setExercises(newExercises);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Reps</FormLabel>
              <Input
                name="reps"
                type="number"
                value={exercise.reps}
                onChange={(e) => {
                  const newExercises = [...exercises];
                  newExercises[index].reps = e.target.value;
                  setExercises(newExercises);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <Input
                name="weight"
                type="number"
                value={exercise.weight}
                onChange={(e) => {
                  const newExercises = [...exercises];
                  newExercises[index].weight = e.target.value;
                  setExercises(newExercises);
                }}
              />
            </FormControl>
            <IconButton
              aria-label="Remove exercise"
              icon={<CloseIcon />}
              onClick={() => setExercises(exercises.filter((_, i) => i !== index))}
            />
          </HStack>
        </VStack>
      ))}
      <Button mt={4} onClick={() => setExercises([...exercises, { exerciseName: '', sets: '', reps: '', weight: '' }])}>Add Exercise</Button>
      <Button mt={4} colorScheme="teal" type="submit">Submit Workout</Button>
    </Box>
  );
};

export default NewWorkoutForm;
