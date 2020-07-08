/**
 * Module to deal with All routes in the App
 * @param {*} app 
 */
module.exports = function(app){
  app.use('/users', require('../users/user.controller'));
  app.use('/surveys', require('../surveys/survey.controller'));
  app.use('/images', require('../images/image.controller'));
}
