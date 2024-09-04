import { createRouter, createWebHistory } from "vue-router";
import CreateArticleView from "@/pages/CreateArticleView.vue";
import HomeView from "@/pages/HomeView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
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
