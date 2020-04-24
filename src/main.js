// import './firebase';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import VModal from 'vue-js-modal';
import SweetModal from 'sweet-modal-vue/src/plugin.js';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css' 
import { firestorePlugin } from 'vuefire'

Vue.use(SweetModal);
Vue.use(VueMaterial);
Vue.use(firestorePlugin)
// Vue.use(VModal,  { dialog: true });
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router, 
}).$mount('#app')
