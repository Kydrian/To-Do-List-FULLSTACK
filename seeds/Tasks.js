
const { Tasks } = require('../models/tasks');

const tasksData = [
  {
    tasks_name: 'Count Money',
  },
  {
    tasks_name: 'Go Over files',
  },
  {
    tasks_name: 'Check emails',
  },
  {
    tasks_name: 'Read Blog Posts',
  },
  {
    tasks_name: 'Check Cameras',
  },
  {
    tasks_name: 'travel',
  },
  {
    tasks_name: 'gold',
  },
  {
    tasks_name: 'pop culture',
  },
];

const seedTags = () => Tasks.bulkCreate(tasksData);

module.exports = seedTags;