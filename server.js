const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");

const app = express();

const PORT = process.env.PORT || 3000;

const workouts = require("./models/workouts.js");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect to mongoose 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true })

// API Route to add an exercise
app.put("/api/workouts/:id", (req, res) => {
    workouts.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
        .then(workouts => res.json(workouts))
        .catch(err => res.json(err))
});

// API Route to get the last workout
app.get("/api/workouts", (req, res) => {
    workouts.find()
        .then(workouts => res.json(workouts))
        .catch(err => res.json(err))
});

// API Route that creates a workout
app.post("/api/workouts", ({ body }, res) => {
    
    workouts.create(body)
        .then(workouts => res.json(workouts))
});

// API Route to find a workout in range
app.get("/api/workouts/range", (req, res) => {
    workouts.find()
        .then(workouts => res.json(workouts))
        .catch(err => res.json(err))
});


// HTML ROUTES

// exercise.html
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

// index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

// stats.html
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}!`);
});