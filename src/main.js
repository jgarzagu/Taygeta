import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuetify/dist/vuetify.css"; // Ensure you are using css-loader
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  iconfont: "ma"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
