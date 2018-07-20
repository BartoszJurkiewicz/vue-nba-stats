import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/team/:id',
      name: 'team',
      component: () => import('@/views/Team/'),
      props: route => ({teamID: route.params.id})
    },
    {
      path: '/player/:id',
      name: 'player',
      component: () => import('@/views/Player/'),
      props: route => ({playerID: route.params.id})
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
