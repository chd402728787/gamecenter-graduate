/*
 * @Date: 2023-01-07 10:18:09
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-19 20:46:22
 * @FilePath: \gD_Design\chdvue\src\router\index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/UserView/HomeView.vue'
import RankView from '@/views/UserView/RankView.vue'
import UserSuggestView from '@/views/UserView/UserSuggestView.vue'
import PersonNalityView from '@/views/UserView/PersonNalityView.vue'
import GameView from '@/views/UserView/GameView.vue'
import GameDetailsView from '@/views/UserView/GameDetailsView.vue'

import UserManageView from '@/views/AdminView/UserManageView.vue'
import GameManageView from '@/views/AdminView/GameManageView.vue'
import UserSuggestionView from "@/views/AdminView/UserSuggestionView.vue";
import AboutView from "@/views/AdminView/AboutView.vue";

import UserLoginView from '@/views/UserLoginView.vue'
import AdminLoginView from '@/views/AdminLoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import testView from '@/views/UserView/testView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/user/home'
  },
  {
    path: '/user/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user/rank',
    name: 'rank',
    component: RankView
  },
  {
    path: '/user/suggest',
    name: 'usersuggest',
    component: UserSuggestView
  },
  {
    path: '/user/person',
    name: 'person',
    component: PersonNalityView
  },
  {
    path: '/user/game',
    name: 'game',
    component: GameView
  },
  {
    path: '/user/gamedetails',
    name: 'gamedetails',
    component: GameDetailsView
  },
  {
    path: '/admin/usermanage',
    name: 'usermanage',
    component: UserManageView
  },
  {
    path: '/admin/gamemanage',
    name: 'gamemanage',
    component: GameManageView
  },
  {
    path: '/admin/suggest',
    name: 'usersuggestion',
    component: UserSuggestionView
  },
  {
    path: '/admin/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/userlogin',
    name: 'Userlogin',
    component: UserLoginView
  },
  {
    path: '/adminlogin',
    name: 'Adminlogin',
    component: AdminLoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/test',
    name: 'test',
    component: testView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
