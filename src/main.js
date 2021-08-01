import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import store from "./store/index";
import axios from "axios";
import { setup as setupInterceptorsApiPokemon } from "./services/Interceptors/httpsInterceptorsApiPokemon";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  created() {
    setupInterceptorsApiPokemon(store);
  },
  render: (h) => h(App),
}).$mount("#app");
