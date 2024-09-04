const express = require("express");
const router = express.Router();
const articlesRoute = require("./articles/articles.route");
const articleRoute = require("./articles/article.route");
const analyticRoute = require("./analytic/analytic.route");

const RouterList = [
  {
    path: "/articles",
    route: articlesRoute,
  },
  {
    path: "/article",
    route: articleRoute,
  },
  {
    path: "/analytic",
    route: analyticRoute,
  },
];

RouterList.forEach((item) => {
  router.use(item.path, item.route);
});

module.exports = router;
