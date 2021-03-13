import Vue from 'vue'
import App from './App.vue'
import Do from './Do.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
}).$mount('#app')

new Vue({
  render: h => h(Do)
}).$mount('#do')