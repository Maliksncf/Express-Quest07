require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const {
  getUserById, 
  updateUser, 
  deleteUser, 
  getUsers, 
  postUser,
  getUserByEmailWithPasswordAndPassToNext 
} = require("./userHandlers");

const {
  getMovieById,
  getMovies,
  updateMovie,
  deleteMovie,
  postMovie
} = require("./movieHandlers");

const { validateUser } = require("./validators.js");
const { validateMovie } = require("./validators.js");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");



app.get("/", welcome);

// the public routes

app.post(
  "/api/login",
  getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
); // /!\ login should be a public route

// then the routes to protect





// Public ROUTES

app.get("/api/movies", getMovies);
app.get("/api/movies/:id", getMovieById);
app.post("/api/movies", validateMovie, postMovie);
app.put("/api/movies/:id", updateMovie);
app.delete("/api/movies/:id", deleteMovie);

// Protected ROUTES

app.post("/api/movies", verifyToken, postMovie);
app.put("/api/movies/:id", verifyToken, updateMovie);
app.delete("/api/movies/:id", verifyToken, deleteMovie);

// Public ROUTES

app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);
app.post("/api/users", hashPassword, postUser);
app.put("/api/users/:id", validateUser, updateUser);
app.delete("/api/users/:id", deleteUser);

// Protected ROUTES

app.post("/api/users", verifyToken, postUser);
app.put("/api/users/:id", verifyToken, updateUser);
app.delete("/api/users/:id", verifyToken, deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
