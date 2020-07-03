import Vue from "vue";
import Router from "vue-router";
import Main from "../pages/Main";

Vue.use(Router);

export const defaultRoute = [
  {
    path: "/login",
    component: () => import("../pages/Login"),
  },
  {
    path: "/",
    redirect: "/home",
    component: Main,
    children: [
      {
        path: "home",
        component: () => import("../pages/Home"),
        meta: { title: "Home" },
      },
    ],
  },
];

export const asyncRoute = [
  {
    path: "/admin",
    redirect: '/admin/a',
    component: Main,
    meta: { title: "Admin", roles: ["admin"] },
    children: [
      {
        path: "a",
        component: () => import("../pages/Admin"),
        meta: { title: "a", roles: ["admin"] },
      },
    ],
  },
  {
    path: "/normal",
    redirect: '/normal/n',
    component: Main,
    meta: { title: "Normal", roles: ["admin", "normal", "editor"] },
    children: [
      {
        path: "n",
        component: () => import("../pages/Normal"),
        meta: { title: "n", roles: ["admin"] },
      },
    ],
  },
  {
    path: "/editor",
    redirect: '/editor/e',
    component: Main,
    meta: { title: "Editor", roles: ["admin", "editor"] },
    children: [
      {
        path: "e",
        component: () => import("../pages/Editor"),
        meta: { title: "e", roles: ["admin", "editor"] },
      },
      {
        path: "e1",
        component: () => import("../pages/Editor"),
        meta: { title: "e1", roles: ["admin", "editor"] },
      },
    ],
  },
  
];

const router = new Router({
  mode: "history",
  routes: defaultRoute,
});

export default router;
