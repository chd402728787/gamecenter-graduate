<!--
 * @Date: 2023-01-07 10:22:46
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-18 09:38:51
 * @FilePath: \gD_Design\chdvue\src\components\User\LeftTitle.vue
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
        <el-menu-item index="/user/home">
          <el-icon>
            <House />
          </el-icon>
          <span>主页</span>
        </el-menu-item>
        <el-menu-item index="/user/rank" @click="islogin">
          <el-icon>
            <Trophy />
          </el-icon>
          <span>排行榜</span>
        </el-menu-item>
        <el-menu-item index="/user/suggest" @click="islogin">
          <el-icon>
            <Paperclip />
          </el-icon>
          <span>用户意见</span>
        </el-menu-item>
        <el-menu-item index="/user/person" @click="islogin">
          <el-icon>
            <ChatLineRound />
          </el-icon>
          <span>个人中心</span>
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
import {ElMessage} from "element-plus";
export default {
  name: 'LeftTitle',
  components: {
    House,
    Trophy,
    Paperclip,
    ChatLineRound, View, Search, Plus
  },
  methods: {
    islogin() {
      if (this.$store.state.logined == false){
        this.$router.push('/userlogin');
        ElMessage({
          message:("请先登录！"),
          showClose:true,
          type:"warning"
        });
      }

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
