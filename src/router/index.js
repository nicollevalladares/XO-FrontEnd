import Vue from 'vue'
import Router from 'vue-router'
import signUp from '@/components/signUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'signUp',
      component: signUp
    }
  ]
})
