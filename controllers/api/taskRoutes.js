// controllers/api/taskRoutes.js

const router = require('express').Router();
const { Task } = require('../../models');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const task = await Task.create({
      task: req.body.task
    });

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update task status
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.update(
      {
        inProgress: req.body.inProgress,
        completed: req.body.completed
      },
      {
        where: { id: req.params.id }
      }
    );

    if (task[0] === 0) {
      res.status(404).json({ message: 'No task found with this id!' });
      return;
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.update(
      {
        task: req.body.task
      },
      {
        where: { id: req.params.id }
      }
    );

    if (task[0] === 0) {
      res.status(404).json({ message: 'No task found with this id!' });
      return;
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.destroy({
      where: { id: req.params.id }
    });

    if (!task) {
      res.status(404).json({ message: 'No task found with this id!' });
      return;
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
