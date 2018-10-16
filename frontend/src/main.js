import Vue from "vue";
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import "./registerServiceWorker";
import "../node_modules/chota/dist/chota.css";
import { createProvider } from './vue-apollo'

import App from "./App.vue";
import Dashboard from "./components/dashboard.vue";

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueRouter);
/*
Router configuration
 */
const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '*',
      component: Dashboard,
      props: (route) => ({
          to: route.query.actor,
      })
  }]
});


new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
