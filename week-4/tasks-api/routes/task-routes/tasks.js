const express = require("express");
const router = express.Router();
const Task = require("../../models/Task.js");

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

router.get("/all-tasks", (req, res, next) => {
    Task.find()
        .then((allTasks) => {
            res.status(200).json(allTasks);
        })
        .catch((err) =>
            res.status(500).json({ message: "Error finding all tasks" })
        );
});

router.put("/update", (req, res, next) => {
    Task.findByIdAndUpdate(req.body.taskId, req.body, { new: true })
        .then((updatedTask) => {
            res.status(200).json(updatedTask);
        })
        .catch((err) =>
            res.status(400).json({ message: "Error while updating task" })
        );
});

router.delete("/delete", (req, res, next) => {
    Task.findByIdAndDelete(req.body.taskId)
        .then(() => {
            res.status(200).json({ message: "Deleted task successfully" });
        })
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Error while trying to delete task" })
        );
});

module.exports = router;
