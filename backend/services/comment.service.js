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

exports.findCommentsByPeriodGroupedByArticle = async (dateFrom, dateTo) => {
  const comments = await comment_model.findAll({
    where: {
      createdAt: {
        [Sequelize.Op.between]: [dateFrom, dateTo],
      },
    },
    attributes: ["id", "text", "createdAt", "updatedAt"],
    include: [
      {
        model: article_model,
        as: "article",
        attributes: ["id", "name", "text", "createdAt", "updatedAt"],
      },
    ],
  });

  const groupedData = comments.reduce((acc, comment) => {
    const articleId = comment.article.id;
    const articleName = comment.article.name;
    const articleText = comment.article.text;
    const articleCreatedAt = comment.article.createdAt;
    const articleUpdatedAt = comment.article.createdAt;

    if (!acc[articleId]) {
      acc[articleId] = {
        id: articleId,
        name: articleName,
        text: articleText,
        createdAt: articleCreatedAt,
        updatedAt: articleUpdatedAt,
        comments: [],
      };
    }

    acc[articleId].comments.push({
      id: comment.id,
      text: comment.text,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    });

    return acc;
  }, {});

  return Object.values(groupedData);
};
