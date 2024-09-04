const commentService = require("../services/comment.service");

const createComment = async (req, res) => {
  const { articleId } = req.params;
  const commentObj = {
    text: req.body.text,
    articleId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await commentService
    .createComment(commentObj)
    .then((data) => {
      res.send({
        data,
        message: "success",
        statusCode: 201,
      });
    })
    .catch((err) => {
      res.send({
        data: null,
        message: err.message,
        statusCode: err.status,
      });
    });
};

const findCommentsByArticleId = async (req, res) => {
  const { articleId } = req.params;

  await commentService
    .findCommentsByArticleId(articleId)
    .then((data) => {
      res.send({
        data,
        message: "success",
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.send({
        data: null,
        message: err.message,
        statusCode: err.status,
      });
    });
};

const findCommentsByArticleIdAndCommentId = async (req, res) => {
  const { articleId, commentId } = req.params;

  await commentService
    .findCommentByArticleIdAndCommentId(articleId, commentId)
    .then((data) => {
      res.send({
        data,
        message: "success",
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.send({
        data: null,
        message: err.message,
        statusCode: err.status,
      });
    });
};

const updateComment = async (req, res) => {
  const { articleId, commentId } = req.params;
  const commentObj = {
    id: commentId,
    text: req.body.text,
    updatedAt: new Date().toISOString(),
  };

  await commentService
    .updateComment(commentObj, articleId, commentId)
    .then((data) => {
      res.send({
        data,
        message: "success",
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.send({
        data: null,
        message: err.message,
        statusCode: err.status,
      });
    });
};

const deleteComment = async (req, res) => {
  const { articleId, commentId } = req.params;

  await commentService
    .deleteComment(articleId, commentId)
    .then(() => {
      res.send({
        message: "success",
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.send({
        data: null,
        message: err.message,
        statusCode: err.status,
      });
    });
};

const deleteCommentsWhenArticleDeleted = async (req, res) => {
  const { id } = req.params;
  await commentService
    .deleteCommentsWhenArticleDeleted(id)
    .then(() => {
      res.send({
        message: "success",
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.send({
        data: null,
        message: err.message,
        statusCode: err.status,
      });
    });
};

const findCommentsByPeriodGroupedByArticle = async (req, res) => {
  const { dateFrom, dateTo } = req.query;

  await commentService
    .findCommentsByPeriodGroupedByArticle(dateFrom, dateTo)
    .then((data) => {
      res.send({
        data,
        message: "success",
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.send({
        data: null,
        message: err.message,
        statusCode: err.status,
      });
    });
};

module.exports = {
  createComment,
  findCommentsByArticleId,
  findCommentsByArticleIdAndCommentId,
  updateComment,
  deleteComment,
  deleteCommentsWhenArticleDeleted,
  findCommentsByPeriodGroupedByArticle,
};
