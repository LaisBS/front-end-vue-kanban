import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueKanban from "vue-kanban";
import router from "@/router";
Vue.use(VueKanban);
import "vue-kanban/src/assets/kanban.css";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
