// App/index.jsx
import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import HomePage from '../HomePage'; 
import WorkoutSessionsPage from '../WorkoutSessionsPage';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/workouts">Workout Sessions</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workouts" element={<WorkoutSessionsPage />} />
      </Routes>
    </div>
  );
}

export default App;
