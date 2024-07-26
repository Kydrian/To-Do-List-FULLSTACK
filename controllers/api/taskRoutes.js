const router = require('express').Router();
const { Task } = require('../../models');

// Get all tasks for logged in user
router.get('/', async (req, res) => {
  try {
    const taskData = await Task.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const tasks = taskData.map((task) => task.get({ plain: true }));

    res.render('tasks', { tasks, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new task
router.post('/', async (req, res) => {
  try {
    const newTask = await Task.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update task completion status
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.update(
      { completed: req.body.completed },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  console.log('trying to delete task', req.params.id);
  try {
    const deletedTask = await Task.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedTask) {
      res.status(404).json({ message: 'No task found with this id!' });
      return;
    }

    res.status(200).json(deletedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;