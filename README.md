# fitness-tracker
Welcome to Fitness Tracker! All your workouts in one place.

Choose from different workouts to do along with saving all your exercises per day.

# Wireframe

![IMG_4169](https://github.com/elberrafart/fitness-tracker/assets/80179931/e8402462-31c4-4eca-9332-4a0a3a7d9289)


# Route Table
### API Routes Table

| HTTP Method | Route                                              | Description                                                      | Requires Body | Model            |
|-------------|----------------------------------------------------|------------------------------------------------------------------|---------------|------------------|
| POST        | `/api/workoutSessions`                             | Create a new workout session with one or more exercises.        | Yes           | WorkoutSession   |
| GET         | `/api/workoutSessions`                             | Retrieve all workout sessions.                                   | No            | WorkoutSession   |
| GET         | `/api/workoutSessions/:id`                         | Retrieve a single workout session by its ID.                    | No            | WorkoutSession   |
| PUT         | `/api/workoutSessions/:id`                         | Update an existing workout session by its ID.                   | Yes           | WorkoutSession   |
| DELETE      | `/api/workoutSessions/:id`                         | Delete an existing workout session by its ID.                   | No            | WorkoutSession   |
| POST        | `/api/workoutSessions/:sessionId/exercises`        | Add a new exercise log entry to an existing workout session.    | Yes           | ExerciseLog      |
| PUT         | `/api/workoutSessions/:sessionId/exercises/:exerciseId` | Update an existing exercise log entry within a workout session. | Yes           | ExerciseLog      |
| DELETE      | `/api/workoutSessions/:sessionId/exercises/:exerciseId` | Delete an existing exercise log entry from a workout session.   | No            | ExerciseLog      |

