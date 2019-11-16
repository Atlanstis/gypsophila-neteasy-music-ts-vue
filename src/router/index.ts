import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const menuRoutes = [
  {
    path: "/",
    redirect: "/discovery"
  },
  {
    path: "/discovery",
    name: "discovery",
    component: () =>
      import(/* webpackChunkName: "discovery" */ "@/views/discovery/index.vue")
  },
  {
    path: "/playlists",
    name: "playlists",
    component: () =>
      import(/* webpackChunkName: "discovery" */ "@/views/playlists/index.vue")
  },
  {
    path: "/songs",
    name: "songs",
    component: () =>
      import(/* webpackChunkName: "discovery" */ "@/views/playlists/index.vue")
  },
  {
    path: "/mvs",
    name: "mvs",
    component: () =>
      import(/* webpackChunkName: "discovery" */ "@/views/mvs/index.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...menuRoutes]
});

export default router;
