import React from 'react';
import { Card } from 'semantic-ui-react';

// Define a functional component to display workout sessions
// It receives 'sessions' as props from its parent component
const WorkoutSessions = ({ sessions }) => (
  // Use Semantic UI's Card.Group to display each session as a card
  <Card.Group>
    {/* Map over each session passed in through props */}
    {sessions.map((session, index) => (
      // Render a Card for each session
      <Card key={index}>
        <Card.Content>
          {/* Display the date of the session as the Card's header */}
          <Card.Header>{session.date}</Card.Header>
          {/* Display the description of the session */}
          <Card.Description>{session.description}</Card.Description>
        </Card.Content>
      </Card>
    ))}
  </Card.Group>
);

export default WorkoutSessions;
