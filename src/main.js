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
      }),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwtTokenTad") == null) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
