import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FindView from '../views/FindView.vue'
import ForumView from '../views/ForumView.vue'
import GameView from '../views/GameView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/find',
    name: 'find',
    component: FindView
  },
  {
    path: '/forum',
    name: 'forum',
    component: ForumView
  },
  {
    path: '/game',
    name: 'game',
    component: GameView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
