import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/student",
    name: "student",
    component: () => import("../views/students/index.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(), // history模式路由
  routes: routes,
});

export default router;
