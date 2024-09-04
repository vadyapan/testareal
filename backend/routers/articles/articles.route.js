const express = require("express");
const router = express.Router();

const ArticleController = require("../../controllers/article.controller");
router.get("/", ArticleController.getAllArticles);

module.exports = router;
