// App/index.jsx
import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from '../HomePage'; // Importing the HomePage component
import WorkoutSessionsDetailsPage from '../WorkoutSessionsDetailsPage'; // Importing the WorkoutSessionsDetailsPage component
import { extendTheme, ChakraProvider } from '@chakra-ui/react'; // Importing Chakra UI components for styling

// Define a custom theme for Chakra UI
const theme = extendTheme({
  styles: {
    global: {
      // Global styles for the `body` element
      body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        overflowX: 'hidden',
      },
      // Global styles for the `#root` element
      '#root': {
        width: '100%',
      },
    },
  },
});

// The main App component
function App() {
  return (
    // Wrapping the application with ChakraProvider to apply the theme
    <ChakraProvider theme={theme}>
      <div>
        {/* Defining routes for the application */}
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<HomePage />} />
          {/* Route for viewing details of a specific workout session */}
          <Route path="/workoutSessions/:sessionId" element={<WorkoutSessionsDetailsPage />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App; 
