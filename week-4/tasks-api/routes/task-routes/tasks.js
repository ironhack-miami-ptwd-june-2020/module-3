const express = require("express");
const router = express.Router();
const Task = require("../../models/Task.js");

router.get("/all-tasks", (req, res, next) => {
    Task.find()
        .then((allTasks) => {
            res.status(200).json(allTasks);
        })
        .catch((err) =>
            res.status(500).json({ message: "Error finding all tasks" })
        );
});

router.post("/create", (req, res, next) => {
    console.log({ body: req.body });
    Task.create(req.body)
        .then((createdTask) => {
            res.status(200).json(createdTask);
        })
        .catch((err) =>
            res.status(400).json({ message: "Error while creating task" })
        );
});

router.put("/update", (req, res, next) => {
    Task.findByIdAndUpdate(req.body.taskId, req.body, { new: true })
        .then((updatedTask) => {
            res.status(200).json(updatedTask);
        })
        .catch((err) =>
            res.status(400).json({ messagae: "Error while updating task" })
        );
});

module.exports = router;
