const express = require("express");
const router = express.Router();

const ArticleController = require("../../controllers/article.controller");
const CommentController = require("../../controllers/comment.controller");

router.get("/:id", ArticleController.findOneArticleById);
router.post("/", ArticleController.createArticle);
router.patch("/:id", ArticleController.updateArticle);
router.delete("/:id", [
  ArticleController.deleteArticle,
  CommentController.deleteCommentsWhenArticleDeleted,
]);

module.exports = router;
