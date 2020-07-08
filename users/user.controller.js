/**
 * Controller to deal with Authentication related operations
 */
const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);

module.exports = router;

/**
 * Function to deal with Authentication operation
 * @param {*} req Represents HTTP Request object
 * @param {*} res Represents HTTP Response object
 * @param {*} next Represents next call
 */
function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Error Occured' }))
        .catch(err => next(err));
}
