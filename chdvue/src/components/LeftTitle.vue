<template>
    <el-row>
      <el-col>
        <el-menu
          background-color="#f5f7f8"
          active-text-color="#ffd04b"
          text-color="#2C3E50"
          class="leftMenu"
          :router="true"
        >
          <el-image :src="require('../assets/images/logo.png')" style="height: 200px;"/>
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>主页</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon><Trophy /></el-icon>
            <span>排行榜</span>
          </el-menu-item>
          <el-menu-item index="/find">
            <el-icon><Paperclip /></el-icon>
            <span>发现</span>
          </el-menu-item>
          <el-menu-item index="/forum">
            <el-icon><ChatLineRound /></el-icon>
            <span>论坛</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

</template>

<script lang="ts" setup>
  import {
    House,
    Trophy,
    Paperclip,
    ChatLineRound
  } from '@element-plus/icons-vue'
</script>

<script lang="ts">
export default {
  name: 'LeftTitle'
}
</script>

<style scoped>

</style>
