<!--
 * @Date: 2023-01-07 10:22:46
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-19 20:46:57
 * @FilePath: \gD_Design\chdvue\src\components\Admin\LeftTitle.vue
-->
<template>
  <el-row>
    <el-col>
      <el-menu
        background-color="#f5f7f8"
        active-text-color="#ffd04b"
        text-color="#2C3E50"
        class="leftMenu"
        :router="true">
        <router-link to="/">
          <el-image :src="require('@/assets/images/logo.png')" style="height: 200px;" />
        </router-link>

        <el-menu-item index="/admin/usermanage">
          <el-icon>
            <House />
          </el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/gamemanage">
          <el-icon>
            <Trophy />
          </el-icon>
          <span>游戏管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/suggest">
          <el-icon>
            <Paperclip />
          </el-icon>
          <span>用户意见</span>
        </el-menu-item>
        <el-menu-item index="/admin/about">
          <el-icon>
            <ChatLineRound />
          </el-icon>
          <span>关于平台</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>

</template>

<script>
import {
  House,
  Trophy,
  Paperclip,
  ChatLineRound, View, Search, Plus
} from '@element-plus/icons-vue'
export default {
  name: 'LeftTitle',
  components: {
    House,
    Trophy,
    Paperclip,
    ChatLineRound, View, Search, Plus},
  methods:{
    islogin(){
      if(this.$store.state.logined==false)
        this.$router.push('/userlogin');
    }
  }
}
</script>

<style>
.el-menu-item{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
