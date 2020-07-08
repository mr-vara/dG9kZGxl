/**
 * Service to deal with Survey operations
 */
const db = require('../models');
const User = db.User;
const Survey = db.Survey;
const Question = db.Question;
const Answer = db.Answer;

module.exports = {
    create,
    getAll,
    getById,
    takeSurvey,
    surveyResult,
    surveyAnswers
};

/**
 * Function to Get all Surveys along with respective Questions
 */
async function getAll() {
    return await Survey.findAll({
        include: [{ model: Question }]
    });
}

/**
 * Function to Get Survey with Questions by given ID
 * @param {*} id represents ID of Survey
 */
async function getById(id) {
    return await Survey.findByPk(id, {
            include: [{ model: Question }]
    });
}

/**
 * Function to Get Survey Result for given ID
 * @param {*} id represents ID of Survey
 */
async function surveyResult(id) {
    let survey = await Survey.findByPk(id, {
        include: [{ 
            model: Question,
            include: [{ model: Answer }]
        }]
    });

    // Convert Survey to JSON object
    survey = survey.toJSON();

    // Generate Results from Answers
    survey.Questions.forEach(function(item, index) {
        let yes = 0;
        let no = 0;
        item.Answers.forEach(function(answer, i) {
            if (answer.answer) {
                yes++;
            } else {
                no++;
            }
        });
        // Delete Answers data and include results (Count of YES and NO)
        delete survey.Questions[index].Answers;
        survey.Questions[index]["yes"] = yes;
        survey.Questions[index]["no"] = no;
    })

    return survey;
}

/**
 * Function to get survey answers along with questions
 * @param {*} id represents survey ID
 */
async function surveyAnswers(id) {
    return await Survey.findByPk(id, {
        include: [{
            model: Question, 
            include: [{ model: Answer }]
        }]
    });
}

/**
 * Function to create a Survey
 * @param {*} userId Authenticated User's ID
 * @param {*} surveyParam Survey data
 */
async function create(userId, surveyParam) {
    const survey = Survey.create({
        UserId: userId,
        title: surveyParam.title,
        description: surveyParam.description,
        Questions: surveyParam.questions
     }, {
        include: Question
     });

     return survey;
}

/**
 * Function to take Survey
 * @param {*} userId Survey taking User's ID
 * @param {*} surveyId Survey ID
 * @param {*} answerData Survey Answers
 */
async function takeSurvey(userId, surveyId, answerData) {
    // Make sure Survey Exists
    let survey;
    survey = await Survey.findByPk(surveyId);
    if (!survey) {
        throw "No Survey with given ID";
    }

    // Add userId in each answer data
    answerData.forEach(function (item, index){
        answerData[index]['UserId'] = userId;
    });
    Answer.bulkCreate(answerData);

    return {
        "message": "Thanks for taking Survey. Your Answers are saved"
    };
}
