<!--
 * @Date: 2023-01-16 12:50:53
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-16 11:47:05
 * @FilePath: \gD_Design\chdvue\src\components\RightAside.vue
-->
<template>
  <div class="block">
    <router-link to="/login">
    <el-avatar class="avatar-user" :size="50" :src="circleUrl"/>
    </router-link>
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRefs } from 'vue'
  const state = reactive({
    circleUrl:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    squareUrl:
      'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    sizeList: ['small', '', 'large'] as const
})
  const { circleUrl, squareUrl, sizeList } = toRefs(state)
</script>

<script lang="ts">
  export default{
    name: 'RightAside'
  }
</script>
<style scoped>
.avatar-user{
  margin: 10px;
}
</style>