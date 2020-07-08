'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.myAssociation = this.belongsTo(models.User);
      this.myAssociation = this.belongsTo(models.Question);
    }
  };
  Answer.init({
    UserId: DataTypes.NUMBER,
    QuestionId: DataTypes.NUMBER,
    answer: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Answer',
  });

  return Answer;
};