import Vue from "vue";
import VueRouter from "vue-router";

import List from "@/pages/List";
import View from "@/pages/View";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", component: List, meta: { keep: true } },
    { path: "/note", component: View },
    { path: "/note/:id", component: View, props: true },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      Vue.nextTick(() => {
        window.scrollTo(0, savedPosition.y);
      });
    }
  },
});

export default router;
