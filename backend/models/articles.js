"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Articles.hasMany(models.Comments, {
        foreignKey: "articleId",
        as: "comments",
      });
    }
  }
  Articles.init(
    {
      name: DataTypes.STRING,
      text: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Articles",
    },
  );
  return Articles;
};
