const articleService = require("../services/article.service");

const getAllArticles = async (req, res) => {
  await articleService
    .getAllArticles()
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

const findOneArticleById = async (req, res) => {
  await articleService
    .findOneArticleById(req.params.id)
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

const createArticle = async (req, res) => {
  const articleObj = {
    name: req.body.name,
    text: req.body.text,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await articleService
    .createArticle(articleObj)
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

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const articleObj = {
    name: req.body.name,
    text: req.body.text,
    updatedAt: new Date().toISOString(),
  };

  await articleService
    .updateArticle(articleObj, id)
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

const deleteArticle = async (req, res, next) => {
  const { id } = req.params;

  try {
    await articleService.deleteArticle(id, next);
  } catch (err) {
    res.send({
      data: null,
      message: err.message,
      statusCode: err.status,
    });
  }
};

module.exports = {
  getAllArticles,
  findOneArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
