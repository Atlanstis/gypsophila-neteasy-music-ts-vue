import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

enum LayoutCenterNameEnum {
  discovery = "discovery",
  playlists = "playlists",
  songs = "songs",
  mvs = "mvs"
}

// 内容需要居中的页面
export const layoutCenterNames = [
  LayoutCenterNameEnum.discovery,
  LayoutCenterNameEnum.playlists,
  LayoutCenterNameEnum.songs,
  LayoutCenterNameEnum.mvs
];

export const menuRoutes = [
  {
    path: "/discovery",
    name: LayoutCenterNameEnum.discovery,
    component: () =>
      import(/* webpackChunkName: "discovery" */ "@/views/discovery/index.vue"),
    meta: {
      title: "发现音乐",
      icon: "discover"
    }
  },
  {
    path: "/playlists",
    name: LayoutCenterNameEnum.playlists,
    component: () =>
      import(/* webpackChunkName: "playlists" */ "@/views/playlists/index.vue"),
    meta: {
      title: "推荐歌单",
      icon: "playlist"
    }
  },
  {
    path: "/songs",
    name: LayoutCenterNameEnum.songs,
    component: () =>
      import(/* webpackChunkName: "songs" */ "@/views/playlists/index.vue"),
    meta: {
      title: "最新音乐",
      icon: "music"
    }
  },
  {
    path: "/mvs",
    name: LayoutCenterNameEnum.mvs,
    component: () =>
      import(/* webpackChunkName: "mvs" */ "@/views/mvs/index.vue"),
    meta: {
      title: "最新MV",
      icon: "mv"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/discovery"
    },
    ...menuRoutes
  ]
});

export default router;
