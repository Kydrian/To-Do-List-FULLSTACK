const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const taskRoutes = require('./api/taskRoutes');

router.use('/api/users', userRoutes);
router.use('/api/tasks', taskRoutes);

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/api/tasks');
    return;
  }
  res.redirect('/login');
});

module.exports = router;