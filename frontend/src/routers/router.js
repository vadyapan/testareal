import { createRouter, createWebHistory } from "vue-router";
import CreateArticleView from "@/pages/CreateArticleView.vue";
import HomeView from "@/pages/HomeView.vue";
import ArticleView from "@/pages/ArticleView.vue";
import CommentsView from "@/pages/CommentsView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/article/:id", name: "article", component: ArticleView },
  {
    path: "/create-article",
    name: "create-article",
    component: CreateArticleView,
  },
  { path: "/comments", name: "comments", component: CommentsView },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
