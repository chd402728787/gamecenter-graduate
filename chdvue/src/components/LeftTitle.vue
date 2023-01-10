<template>
    <el-row>
      <el-col>
        <el-menu
          background-color="#ebebe9"
          active-text-color="#ffd04b"
          text-color="#2C3E50"
          class="leftMenu"
        >
          <img src="../assets/logo.png" alt="" style="height: 200px;"/>
          <el-menu-item index="1">
            <el-icon><House /></el-icon>
            <span>主页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><Trophy /></el-icon>
            <span>排行榜</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Paperclip /></el-icon>
            <span>发现</span>
          </el-menu-item>
          <el-menu-item index="4">
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
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>

<script lang="ts">
export default {
  name: 'LeftTitle'
}
</script>

<style scoped>
.leftMenu{

}
</style>
