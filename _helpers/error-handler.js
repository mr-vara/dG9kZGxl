/**
 * Module to handles errors in runtime
 */
module.exports = errorHandler;

/**
 * Function to handle various errors and respond with proper error message
 * @param {*} err Represents Occured Error
 * @param {*} req Represents HTTP Request
 * @param {*} res Represents HTTP Response
 * @param {*} next Represents next Request
 */
function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // Any Custom error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // Validation error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // Unauthorized error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}
