import Vue from "vue";
import Router from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView";

Vue.use(Router);

const routes = [
  {
    name: "home",
    path: "",
    component: HomeView,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: DashboardView,
  },
];

const router = new Router({ routes });

export default router;
