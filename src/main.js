import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import AppLogo from './components/AppLogo.vue';
import ModalPlugin from './plugins/modal';

Vue.config.productionTip = false;

Vue.component('AppLogo', AppLogo);

const app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(ModalPlugin, { appInstance: app });
