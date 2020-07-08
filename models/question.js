'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.myAssociation = this.belongsTo(models.Survey);
      this.myAssociation = this.hasMany(models.Answer);
    }
  };
  Question.init({
    SurveyId: DataTypes.NUMBER,
    question: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
  });

  return Question;
};