const router = require('express').Router();
const { User } = require('../../models');


router.get('/user', async (req, res) => { // gets user from database
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/user', async (req, res) => { // creates new user
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/user/:id', async (req, res) => { // deletes user
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        }); 
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/user/:id', async (req, res) => { // updates user
    try {
        const userData = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router