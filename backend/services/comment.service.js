const { Sequelize } = require("sequelize");
const db = require("../models");
const comment_model = db.Comments;
const article_model = db.Articles;

exports.createComment = async (commentObj) => {
  return await comment_model
    .create(commentObj)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        message: "error",
        statusCode: 500,
        data: null,
        txt: err.message,
      };
    });
};

exports.findCommentsByArticleId = async (articleId) => {
  return await comment_model.findAll({ where: { articleId } });
};

exports.findCommentByArticleIdAndCommentId = async (articleId, commentId) => {
  return await comment_model.findAll({ where: { articleId, id: commentId } });
};

exports.updateComment = async (commentObj, articleId, commentId) => {
  await comment_model
    .update(commentObj, {
      where: { articleId, id: commentId },
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        message: "error",
        statusCode: 500,
        data: null,
        txt: err.message,
      };
    });
};

exports.deleteComment = async (articleId, commentId) => {
  await comment_model
    .destroy({
      where: { articleId, id: commentId },
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        message: "error",
        statusCode: 500,
        data: null,
        txt: err.message,
      };
    });
};

exports.deleteCommentsWhenArticleDeleted = async (id) => {
  await comment_model
    .destroy({
      where: { articleId: id },
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        message: "error",
        statusCode: 500,
        data: null,
        txt: err.message,
      };
    });
};
