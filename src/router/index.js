import Vue from 'vue'
import Router from 'vue-router'
import signUp from '@/components/signUp'
import game from '@/components/game'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/signup/:id',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/game/:id',
      name: 'game',
      component: game
    }
  ]
})
