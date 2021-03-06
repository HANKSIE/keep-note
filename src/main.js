import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueCordova from "vue-cordova";

import router from "./router";
import hdb from "./plugins/hdb";
import store from "./store/index";

Vue.use(VueCordova);
Vue.use(hdb);

Vue.config.productionTip = false;
Vue.cordova.on("deviceready", () => {
  new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
