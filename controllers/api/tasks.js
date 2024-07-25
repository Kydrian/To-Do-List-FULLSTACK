const router = require('express').Router();



router.get('/', async (req, res) => {
  try{
    const Tasks = await Tasks.findAll({ // find all tasks
    });
    res.status(200).json(tagData); // returns status 200 and tasks data
  } catch (err) {
    res.status(500).json(err); // returns status 500 and error if any
  }
});

router.get('/:id',async (req, res) => {
  try{
    const tasksData = await Tasks.findByPk(req.params.id, { // find a single task by its `id` by using findByPk method
    });
    res.status(200).json(tasksData); // returns status 200 and tasks data
  } catch (err) {
    res.status(500).json(err); // returns status 500 and error if any.
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tasksData = await Tasks.create(req.body); // creates a new task using create method
    res.status(200).json(tasksData); // returns status 200 and tag data
  } catch (err) {
    res.status(500).json(err); // returns status 500 and error if any.
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
try{
  const tasksData = await Tasks.update(req.body, { // updates a tasks name using update method
    where: {
      id: req.params.id, // where specifies the id of the task
    },
  });
  res.status(200).json(tasksData); // returns status 200 and tasks data
} catch (err) {
  res.status(500).json(err); // returns status 500 and error if any.
}
});

router.delete('/:id', async (req, res) => { // delete on task by its `id` value
  try{
    const tasksData = await Tasks.destroy({ // deletes a task using destroy method
      where: {
        id: req.params.id // where specifies the id of the task
      }
    });
    res.status(200).json(tasksData);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on task by its `id` value
});

module.exports = router;
