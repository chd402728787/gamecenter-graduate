<!--
 * @Date: 2023-01-16 12:50:53
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-16 11:47:05
 * @FilePath: \gD_Design\chdvue\src\components\RightAside.vue
-->
<template>
  <div class="block">
    <router-link to="/" @click="touserlogin">
    <el-avatar class="avatar-user" :size="50" :src="circleUrl"/>
    </router-link>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
  export default {
    name: 'RightAside',
    methods:{
      touserlogin(){
        if(this.$store.state.logined){
          console.log("已登录");
          this.$router.push('/user/person');
        }
        else
          this.$router.push('/userlogin');
      }
    },
    setup() {
      const state = reactive({
        circleUrl:
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        squareUrl:
          'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
        sizeList: ['small', '', 'large']
      })
      const { circleUrl, squareUrl, sizeList } = toRefs(state)
      return { circleUrl, squareUrl, sizeList }
    }
  }
</script>
<style scoped>
.avatar-user{
  margin: 10px;
}
</style>
