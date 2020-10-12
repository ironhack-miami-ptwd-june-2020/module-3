const express = require("express");
const router = express.Router();
const Task = "../../models/Task";

router.get("/all-tasks", (req, res, next) => {
    Task.find()
        .then((allTasks) => {
            res.status(200).json(allTasks);
        })
        .catch((err) =>
            res.status(500).json({ message: "Error finding all tasks" })
        );
});

module.exports = router;
