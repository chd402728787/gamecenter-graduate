<template>
  <div class="mainBox">
    <el-aside>
      <LeftTitle></LeftTitle>
    </el-aside>
      <testVue></testVue>
  </div>
</template>

<script>
import LeftTitle from './components/LeftTitle.vue'
import HelloWorld from './components/HelloWorld.vue'
import testVue from './components/test.vue'
export default {
  name: 'App',
  components: {
    LeftTitle,
    HelloWorld,
    testVue
  },
  mounted () {
  this.axios.get('api/list').then((res) => {
    console.log(res.data[0]);
    })
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
  position: absolute;
}
*{
  margin: 0;
  padding: 0;
}
.el-aside::-webkit-scrollbar {
     display: none;
}
</style>
