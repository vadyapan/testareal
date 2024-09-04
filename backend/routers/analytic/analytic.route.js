const express = require("express");
const router = express.Router();

const CommentController = require("../../controllers/comment.controller");

router.get("/comments", (req, res) => {
  CommentController.findCommentsByPeriodGroupedByArticle(req, res);
});

module.exports = router;
