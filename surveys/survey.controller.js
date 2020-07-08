/**
 * Controller to deal with Survey related operations
 */
const express = require('express');
const router = express.Router();
const surveyService = require('./survey.service');

// survey controller routes
router.post('/create', create);
router.post('/:id/take-survey', takeSurvey);
router.get('/:id/survey-result', surveyResult);
router.get('/:id/survey-answers', surveyAnswers);
router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;

/**
 * Function to deal with Survey Create Operation
 * @param {*} req Represents HTTP request
 * @param {*} res Represents HTTP Response
 * @param {*} next Represents Next call
 */
function create(req, res, next) {
    surveyService.create(req.user.sub, req.body)
        .then(survey => survey ? res.json(survey) : res.status(400).json({ message: 'Error occured, please check input' }))
        .catch(err => next(err));
}

/**
 * Function to deal with Take Survey operation
 * @param {*} req Represents HTTP request
 * @param {*} res Represents HTTP Response
 * @param {*} next Represents Next call
 */
function takeSurvey(req, res, next) {
    surveyService.takeSurvey(req.user.sub, req.params.id, req.body)
        .then(survey => survey ? res.json(survey) : res.status(400).json({ message: 'Error occured, please check input' }))
        .catch(err => next(err));
}

/**
 * Function to deal with Get All Surveys operation
 * @param {*} req Represents HTTP request
 * @param {*} res Represents HTTP Response
 * @param {*} next Represents Next call
 */
function getAll(req, res, next) {
    surveyService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

/**
 * Function to deal with Get Survey by ID operation
 * @param {*} req Represents HTTP request
 * @param {*} res Represents HTTP Response
 * @param {*} next Represents Next call
 */
function getById(req, res, next) {
    surveyService.getById(req.params.id)
        .then(survey => survey ? res.json(survey) : res.sendStatus(404))
        .catch(err => next(err));
}

/**
 * Function to deal with Get Survey Question and Answers operation
 * @param {*} req Represents HTTP request
 * @param {*} res Represents HTTP Response
 * @param {*} next Represents Next call
 */
function surveyAnswers(req, res, next) {
    surveyService.surveyAnswers(req.params.id)
        .then(survey => survey ? res.json(survey) : res.sendStatus(404))
        .catch(err => next(err));
}

/**
 * Function to deal with Get Survey Results operation
 * @param {*} req Represents HTTP request
 * @param {*} res Represents HTTP Response
 * @param {*} next Represents Next call
 */
function surveyResult(req, res, next) {
    surveyService.surveyResult(req.params.id)
        .then(survey => survey ? res.json(survey) : res.sendStatus(404))
        .catch(err => next(err));
}
