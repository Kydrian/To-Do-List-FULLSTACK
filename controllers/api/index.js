const router = require('express').Router();
const tasksRoutes = require('./api/tasks');
router.use('/tasks', tasksRoutes);