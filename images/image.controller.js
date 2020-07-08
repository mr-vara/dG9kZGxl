/**
 * Controller to deal with Image operations
 */
const express = require('express');
const router = express.Router();
const imageService = require('./image.service');

// image controller routes
router.post('/resize', resize);

module.exports = router;

/**
 * function to deal with resize operation
 * @param {*} req represents HTTP Request
 * @param {*} res represents HTTP Response
 * @param {*} next represents next call
 */
function resize(req, res, next) {
    imageService.resize(req.body.url)
        .then(image => res.send(image))
        .catch(err => next(err));
}
