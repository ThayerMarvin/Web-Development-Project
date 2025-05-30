Exercise Tracker Web App
A full stack web application for tracking exercises, allowing users to create, edit, and delete exercise entries.
Built with React on the frontend, Node.js and Express on the backend, and MongoDB for data persistence.

Table of Contents
Features

Tech Stack

Setup and Installation

Usage

API Endpoints

Folder Structure

Notes

Features
Create Exercises: Add new exercise entries with name, reps, weight, unit, and date.

Edit Exercises: Update existing exercise details.

Delete Exercises: Remove unwanted exercise entries.

View Exercises: List all recorded exercises (assuming a HomePage implementation for viewing).

Form Validation: Basic input validation on the backend.

User-friendly navigation: Easy navigation with React Router and icons.

Tech Stack
Frontend: React, React Router, React Icons

Backend: Node.js, Express.js

Database: MongoDB with Mongoose ODM

Other: dotenv for environment variables, express-async-handler for async error handling

Setup and Installation
Prerequisites
Node.js and npm installed

MongoDB instance (local or cloud, e.g. MongoDB Atlas)

Backend Setup
Clone the repository

Create a .env file in the root folder with the following:

ini
Copy
PORT=5000
MONGODB_CONNECT_STRING=<your_mongodb_connection_string>
Install dependencies:

bash
Copy
npm install
Start the server:

bash
Copy
node server.js
(or nodemon server.js if you have nodemon installed)

Frontend Setup
Navigate to the frontend directory (if separate) or root if unified

Install dependencies:

bash
Copy
npm install
Start the React development server:

bash
Copy
npm start
Usage
Open your browser at http://localhost:3000 (React default port)

Use the navigation header to browse pages

Create new exercises via the "Create Exercise" page

Edit existing exercises from the list (implementation of HomePage assumed to allow this)

Delete exercises (assuming the HomePage has a delete feature)

Data is persisted in MongoDB

API Endpoints
Method	Endpoint	Description	Request Body	Response
GET	/exercises	Retrieve all exercises	None	Array of exercises
POST	/exercises	Create a new exercise	{name, reps, weight, unit, date}	Created exercise object
GET	/exercises/:_id	Retrieve one exercise by ID	None	Exercise object or 404 error
PUT	/exercises/:_id	Update an exercise by ID	{name, reps, weight, unit, date}	Updated exercise or 404 error
DELETE	/exercises/:_id	Delete an exercise by ID	None	204 No Content or 404 error

Folder Structure
pgsql
Copy
/backend
  ├─ exercise_model.mjs   # Mongoose schema and database functions
  ├─ server.js            # Express server and API routes
/frontend
  ├─ src
      ├─ components
          ├─ Header.js
          ├─ Footer.js
      ├─ pages
          ├─ HomePage.js
          ├─ CreateExercisePage.js
          ├─ EditExercisePage.js
      ├─ App.js
      ├─ index.js
Notes
The date input expects the format dd-mm-yy (e.g. 29-05-25). Ensure valid date strings are sent.

Units for weight must be either "kgs" or "lbs" — ensure consistency on frontend and backend.

The backend validates all input and returns 400 status with error messages on invalid data.

Adjust MongoDB connection string in .env for your environment.

You can extend the HomePage to list exercises and allow navigation to edit or delete.
