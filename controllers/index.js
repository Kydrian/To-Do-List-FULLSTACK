const router = require('express').Router();

const apiRoutes = require('./api');
const login = require('./loginRoutes');

router.use('/', login);
router.use('/api', apiRoutes);

module.exports = router;



