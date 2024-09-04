import { createRouter, createWebHistory } from "vue-router";
import CreateArticleView from "@/pages/CreateArticleView.vue";
import HomeView from "@/pages/HomeView.vue";
import ArticleView from "@/pages/ArticleView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/article/:id", name: "article", component: ArticleView },
  {
    path: "/create-article",
    name: "create-article",
    component: CreateArticleView,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
