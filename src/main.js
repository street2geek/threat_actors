import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import "./registerServiceWorker";
import "milligram";
import { createProvider } from "./vue-apollo";
import marked from "marked";


import App from "./App.vue";
import Dashboard from "./components/dashboard.vue";
import Login from "./components/login.vue";

Vue.prototype.$marked = marked;
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueRouter);
/*
Router configuration
 */
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Dashboard,
      props: route => ({
        to: route.query.actor
      })
    },
    {
      path: "/login",
      component: Login
    }
  ]
});

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
