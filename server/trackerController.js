const express = require('express');
const workouts = require('./trackerObject');
const router = express.Router();
const path = require('path');

router
    .get("/workouts", (req, res) => res.send(workouts.workouts))
    .get("/completed", (req, res) => res.send(workouts.completedWorkouts))

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '../html/', 'tracking.html'));
})

module.exports.router = router;