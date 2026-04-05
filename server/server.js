const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// --- Middleware Configuration ---
// Task 3.1: Enable JSON body parsing to handle incoming PUT data
app.use(express.json());
// Optional: app.use(bodyParser.json()); - express.json() is sufficient in modern Express

// Serve static content (HTML, CSS, JS) from the 'files' directory
app.use(express.static(path.join(__dirname, 'files')));


// --- API Endpoints ---

/**
 * Task 1.2: Get all movies
 * Returns the movies from the model as an array of objects.
 */
app.get('/movies', function (req, res) {
  // Convert the movieModel object into an array of values
  const movieList = Object.values(movieModel);
  res.json(movieList);
});


/**
 * Task 2.1: Get a specific movie by its imdbID
 * Uses a path parameter ':imdbID' to identify the movie.
 */
app.get('/movies/:imdbID', function (req, res) {
  const id = req.params.imdbID;
  const movie = movieModel[id];

  if (movie) {
    // Send the movie object if found
    res.json(movie);
  } else {
    // Send a 404 Status if the ID does not exist in the model
    res.status(404).send('Movie not found');
  }
});


/**
 * Task 3.1 & 3.2: Update an existing movie or create a new one
 * Receives JSON data in the request body and updates the model.
 */
app.put('/movies/:imdbID', function (req, res) {
  const id = req.params.imdbID;
  const updatedMovie = req.body; // The JSON data sent from edit.js

  // Update the movie in our 'database' (the movieModel object)
  movieModel[id] = updatedMovie;

  // Task 3.2: Return 200 (OK) or 204 (No Content) to confirm success
  res.sendStatus(200);
});


// --- Server Start ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});