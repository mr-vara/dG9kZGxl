/**
 * Module to deal with JWT relate operations
 */
const expressJwt = require('express-jwt');
const config = require('../config/app-config.json');
const userService = require('../users/user.service');

module.exports = jwt;

/**
 * Function to act as middleware and check JWT token
 */
function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/images/resize'
        ]
    });
}

/**
 * Function to validate JWT Token 
 * @param {*} req Represents HTTP Request
 * @param {*} payload Represents Payload
 * @param {*} done Represents finished callback
 */
async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
