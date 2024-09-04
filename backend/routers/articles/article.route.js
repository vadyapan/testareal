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

router.get("/:articleId/comments", CommentController.findCommentsByArticleId);
router.get(
  "/:articleId/comment/:commentId",
  CommentController.findCommentsByArticleIdAndCommentId,
);
router.post("/:articleId/comment", CommentController.createComment);
router.patch("/:articleId/comment/:commentId", CommentController.updateComment);
router.delete(
  "/:articleId/comment/:commentId",
  CommentController.deleteComment,
);

module.exports = router;
