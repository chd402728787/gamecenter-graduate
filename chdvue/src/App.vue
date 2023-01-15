<template>
  <div class="mainBox">
    <el-container>
      <!--左边标签栏-->
      <el-aside class="aside-Left" width="300px">
        <LeftTitle></LeftTitle>
      </el-aside>

      <el-container>
        <!--搜索框-->
        <el-header class="header-up">
          <SearchVue></SearchVue>
        </el-header>
        <!--主要内容-->
        <el-main class="main-part">
          <div class="div-card">
            <router-view />
          </div>
        </el-main>
      </el-container>

      <!--常驻列表-->
      <el-container>
        <el-aside class="aside-Right" width="300px">
          热搜
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftTitle from './components/LeftTitle.vue'
import HelloWorld from './components/HelloWorld.vue'
import GameList from './components/GameList.vue'
import SearchVue from './components/SearchVue.vue'
import testVue from './components/test.vue'

export default {
  name: 'App',
  components: {
    LeftTitle,
    HelloWorld,
    GameList,
    SearchVue,
    testVue
  },
  mounted () {
    this.axios.get('api/game').then((res) => {
      console.log(res.data[0]);
    })
    //window.addEventListener("scroll", this.showSearch);
    /*showSearch((res)=>{
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 50) {
        this.showFixedSearch = true;
      }
      else {
        this.showFixedSearch = false;
      }})*/
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
.mainBox{
  background-color: #ebebe9;
  height: 100%;
  width: 100%;
}
*{
  margin: 0;
  padding: 0;
}
.el-aside::-webkit-scrollbar {
     display: none;
}
.aside-Left{
  height: calc(100vh - 70px);
}
.main-part{
  height: calc(100vh - 70px);
}
.div-card{
  width: 800px;
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  -webkit-box-orient: vertical;
}
</style>
