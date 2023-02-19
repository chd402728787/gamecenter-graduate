/*
 * @Date: 2023-01-07 10:18:09
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-12 19:20:32
 * @FilePath: \gD_Design\chdvue\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/src/message.scss'

const app = createApp(App)
app.use(store).use(router).use(ElementPlus).mount('#app')
