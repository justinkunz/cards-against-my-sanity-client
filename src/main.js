import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SweetModal from "sweet-modal-vue/src/plugin.js";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import { firestorePlugin } from "vuefire";
import VueClipboard from 'vue-clipboard2'
 
VueClipboard.config.autoSetContainer = true; 
Vue.config.productionTip = false;

Vue.use(VueClipboard)
Vue.use(SweetModal);
Vue.use(VueMaterial);
Vue.use(firestorePlugin);

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
