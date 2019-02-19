import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    //execute getCurrentUser query
    this.$store.dispatch('authentication/getCurrentUser');
  }
}).$mount('#app')
