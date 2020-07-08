/**
 * Service to deal with Authentication
 */
const config = require('../config/app-config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;
const Survey = db.Survey;

module.exports = {
    authenticate,
    getById
};

/**
 * Function to Authenticate user
 * @param {*} param0 Object with holds username and password
 */
async function authenticate({ username }) {
    let user;
    user = await User.findOne({ where: { username: username } });
    if (!user) {
        user = await User.create({
            "username": username
        });
    }
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return {
        token
    };
}

/**
 * Function to get user by ID
 * @param {*} id Represents User ID
 */
async function getById(id) {
    return await User.findByPk(id);
}
