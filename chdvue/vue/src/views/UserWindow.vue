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
            <router-view v-if="isRouterAlive" />
          </div>
        </el-main>
      </el-container>

      <!--常驻列表-->
      <el-container>
        <el-aside class="aside-Right">
          <RightAside></RightAside>
          <el-backtop :right="100" :bottom="100" />
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftTitle from '@/components/User/LeftTitle.vue'
import GameList from '@/components/User/GameList.vue'
import SearchVue from '@/components/SearchVue.vue'
import RightAside from '@/components/User/RightAside.vue'
import { Back } from '@element-plus/icons-vue'
export default {
  name: 'UserWindow',
  data() {
    return {
      isRouterAlive: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  components: {
    LeftTitle,
    GameList,
    SearchVue,
    RightAside,
    Back
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
  }
}
</script>

<style>
.mainBox {
  background-color: #f5f7f8;
  height: 100%;
  width: 100%;
}

.main-part {
  width: 1300px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.div-card {
  width: 50%;
  margin: 0 auto;
}
</style>
