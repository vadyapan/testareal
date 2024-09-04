const db = require("../models");
const article_model = db.Articles;

exports.getAllArticles = async () => {
  return await article_model.findAll();
};

exports.findOneArticleById = async (id) => {
  return await article_model.findOne({
    where: { id },
  });
};

exports.createArticle = async (articleObj) => {
  return await article_model.create(articleObj);
};

exports.updateArticle = async (articleObj, id) => {
  await article_model
    .update(articleObj, {
      where: { id },
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

exports.deleteArticle = async (id, next) => {
  try {
    await article_model.destroy({
      where: { id },
    });

    next();
  } catch (err) {
    return {
      message: "error",
      statusCode: 500,
      data: null,
      txt: err.message,
    };
  }
};
