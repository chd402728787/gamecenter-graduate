<!--
 * @Date: 2023-01-07 10:18:08
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-18 09:52:02
 * @FilePath: \gD_Design\chdvue\src\App.vue
-->
<template>
  <div class="UsermainBox">
    <AdminWindow v-show="display2"></AdminWindow>
    <UserWindow v-show="display1"></UserWindow>
  </div>
</template>

<script>
import UserWindow from '@/views/UserWindow.vue'
import AdminWindow from '@/views/AdminWindow.vue'
import {ElMessage} from "element-plus";
export default {
  name: 'App',
  data() {
    return {
      display1:this.$store.state.displayUser,
      display2:this.$store.state.displayAdmin,
      isRouterAlive: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  components: {
    AdminWindow,
    UserWindow
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    returnPage() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' });
        return false;
      } else {
        this.$router.go(-1);
      }
    }
  },
  created() {
    if(this.$store.state.logined==false){
      ElMessage({
        message:("请先登录！"),
        showClose:true,
        type:"warning"
      });
      this.$router.push('/userlogin');
    }
  },
  watch: {
    $route(to, from) {
      this.display1=this.$store.state.displayUser;
      this.display2=this.$store.state.displayAdmin;
    }
  },
  mounted() {
    // window.addEventListener("scroll", this.showSearch);
    /* showSearch((res)=>{
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 50) {
        this.showFixedSearch = true;
      }
      else {
        this.showFixedSearch = false;
      }}) */
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

* {
  margin: 0;
  padding: 0;
}

.el-aside::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar{
  width: 0 !important;
}
</style>
