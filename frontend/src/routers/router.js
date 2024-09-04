import { createRouter, createWebHistory } from "vue-router";
import CreateArticleView from "@/pages/CreateArticleView.vue";

const routes = [
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
