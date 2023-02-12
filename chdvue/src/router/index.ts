/*
 * @Date: 2023-01-07 10:18:09
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-12 18:25:57
 * @FilePath: \gD_Design\chdvue\src\router\index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RankView from '../views/RankView.vue'
import FindView from '../views/FindView.vue'
import ForumView from '../views/ForumView.vue'
import GameView from '../views/GameView.vue'
import GameDetailsView from '../views/GameDetailsView.vue'
import testView from '../views/testView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/rank',
    name: 'rank',
    component: RankView
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
  },
  {
    path: '/gamedetails',
    name: 'gamedetails',
    component: GameDetailsView
  },
  {
    path: '/test',
    name: 'test',
    component: testView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
