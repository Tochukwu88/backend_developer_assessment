'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Blog}) {
      // define association here
      this.belongsTo(Blog,{
        foreignKey:'blogId',  
        onDelete:'cascade',
        hooks:true
     
    })
    }
  };
  Comment.init({
    comment: DataTypes.STRING,
    blogId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete:'cascade'
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};