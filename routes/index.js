var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verify-token');

const {
    getAllUsersController,
    addNewUserController,
    updateUserController,
    deleteUserController,
} = require('../controllers/admin');

const {
    loginController,
    resetPasswordController,
    refreshTokenController,
} = require('../controllers/auth');

/* POST login a new user */
router.post('/login', async function (req, res, next) {
    let data = req.body;
    try {
        let user = await loginController(data);
        if (user)
            res.status(200).json(user);
        else
            res.status(200).json("unauthorized");
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

/* POST reset password */
router.post('/reset-auth', async function (req, res, next) {
    let data = req.body;
    try {
        let msg = await resetPasswordController(data);
        if (msg === 'updated')
            res.status(200).json(msg);
        else
            res.status(200).json("no-account");
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

/* GET reset password */
router.get('/refresh-token', verifyToken, async function (req, res, next) {
    let data = req.user;
    try {
        let user = await refreshTokenController(data);
        if (user)
            res.status(200).json(user);
        else
            res.status(200).send("unauthorized");
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

/* GET for admin get all users */
router.get('/user', verifyToken, async function (req, res, next) {
    try {
        let users = await getAllUsersController();
        res.status(200).json(users);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

/* POST for admin add a new user */
router.post('/user', verifyToken, async function (req, res, next) {
    let data = req.body;
    try {
        let msg = await addNewUserController(data);
        console.log(msg);
        res.status(200).json(msg);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

/* PUT for admin edit a user */
router.put('/user', verifyToken, async function (req, res, next) {
    let data = req.body;
    try {
        let msg = await updateUserController(data);
        res.status(200).json(msg);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

/* DELETE for admin a user */
router.delete('/user/:id', verifyToken, async function (req, res, next) {
    let data = req.params.id;
    try {
        let msg = await deleteUserController(data);
        res.status(200).json(msg);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;
