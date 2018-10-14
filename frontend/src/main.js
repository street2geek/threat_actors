import Vue from "vue";
import VueResource from 'vue-resource'
import App from "./App.vue";
import "./registerServiceWorker";
import "../node_modules/chota/dist/chota.css";
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false;
Vue.use(VueResource);

new Vue({
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
