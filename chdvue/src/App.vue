<template>
  <div class="mainBox">
    <el-container>
      <!--左边标签栏-->
      <el-aside class="aside-Left" width="300px">
        <LeftTitle></LeftTitle>
      </el-aside>

      <el-container>
        <!--主要内容-->
        <el-main class="main-part">
          <el-row>
            <el-col :span="2">
              <el-button @click="returnPage" size="small" round>
                <el-icon>
                  <Back />
                </el-icon>
              </el-button>
            </el-col>
          </el-row>
          <div class="div-card">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftTitle from './components/LeftTitle.vue'
import GameList from './components/GameList.vue'
import SearchVue from './components/SearchVue.vue'
import RightAside from './components/RightAside.vue'
import { Back } from '@element-plus/icons-vue'
export default {
  name: 'App',
  components: {
    LeftTitle,
    GameList,
    SearchVue,
    RightAside,
    Back
  },
  methods: {
    returnPage() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
  },

  mounted() {
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

.mainBox {
  background-color: #f5f7f8;
  height: 100%;
  width: 100%;
}

* {
  margin: 0;
  padding: 0;
}

.el-aside::-webkit-scrollbar {
  display: none;
}

.aside-Left {
  height: calc(120vh - 70px);
}

.aside-Right {
  height: calc(120vh - 70px);
}

.main-part {
  background-color: white;
  height: calc(120vh - 70px);
}

.div-card {
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  -webkit-box-orient: vertical;
}
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>
