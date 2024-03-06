# Gainz Log
Welcome to Gainz Log! All your workouts are in one place.

Choose from different workouts to do along with saving all your exercises per day.

# Wireframe

![IMG_4169](https://github.com/elberrafart/fitness-tracker/assets/80179931/e8402462-31c4-4eca-9332-4a0a3a7d9289)

# Screenshot

![Screenshot 2024-03-05 at 10 13 12 AM](https://github.com/elberrafart/fitness-tracker/assets/80179931/14d423ce-d4eb-4547-a04c-45b75bb17880)

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

# Technologies Used
- JavaScript
- HTML
- CSS
- Chakra UI
- Chakra Icons
- MongoDB
- Express
- Mongoose
- React
- ReactRouter
- CORS
- React Select
- DotEnv

# Installation Instructions
To get the project set up you must first install all of the dependencies on the root folder:

Run:
- npm install express mongoose body-parser
- npm install nodemon
- npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
- npm create vite@latest
- npm i react-router-dom
- npm i cors
- npm i dotenv

# User Stories

As a fitness enthusiast user, I want to be able to view my exercises based on the date submitted. I want to add new exercises to my fitness tracker and see all the workouts I did in that training session. I also want to be able to make edits and delete exercises if needed.

As an instructor, I want to be able to see the student demonstrate full CRUD functionality of their website along with backend to frontend connections.


# Major Hurdles

The site was having issues connecting the front end to the backend after deployment. That is now fixed
Wasn't able to use api key from .env file so key is public (temporarily)

# Next Steps

Getting user authentication going so each workout session data is unique to each user and they can use this to track their workout habits.
Make this site into a mobile app for people to use on their phones.

# Link to hosted project
https://gainz-log-fc12918d363b.herokuapp.com/
