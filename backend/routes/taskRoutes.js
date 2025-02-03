const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    const task = new Task({ ...req.body, owner: req.user.id });
    await task.save();
    res.status(201).json(task);
});

router.get('/', auth, async (req, res) => {
    const tasks = await Task.find({ owner: req.user.id });
    res.json(tasks);
});

module.exports = router;