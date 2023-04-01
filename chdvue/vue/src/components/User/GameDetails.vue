<!--
 * @Date: 2023-02-02 10:05:45
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-17 20:36:46
 * @FilePath: \gD_Design\chdvue\src\components\GameDetails.vue
-->
<template>
  <div>
    <img class="game-detail-img" ref="gameDetailImg" alt=""><br /><br />
    <!--开始按钮-->
    <el-row>
      <el-col>
        <router-link ref="linkto" :to="{ path: '/user/game/', query: { id: gameid } }">
          <el-button class="gamestart-button" ref="gamestart">开始游戏</el-button>
        </router-link>
      </el-col>
    </el-row>
    <!--描述按钮功能-->
    <el-row>
      <el-col>
        <label class="gamestart-label">点击开始游戏</label>
      </el-col>
    </el-row>
    <!--tabs标签-->
    <el-tabs v-model="gamedetailName" class="gamedetail-tabs" :stretch=true>
      <!--详情-->
      <el-tab-pane label="详情" name="first">
        <h2>简介</h2>
        <p class="gamedetail" ref="gamedetailtext1">2</p>
        <h2>评价</h2>
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in evaluationArray" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <h2>论坛</h2>
      </el-tab-pane>

      <!--评价-->
      <el-tab-pane label="评价" name="second">
        <!--发表评价-->
        <el-button @click="dialogEvaluateVisible = true">
          <el-icon>
            <Star />
          </el-icon> 写评价
        </el-button>
        <p style="color: white;">你会安利其他人玩这款游戏吗？从你的游戏体验中，有什么可以给大家参考?
          这是一条占位文字！这是一条占位文字！这是一条占位文字！这是一条占位文字！这是一条占位文字！这是一条占位文字！</p>
        <!--全部评价-->
        <h3>全部评价</h3>
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in evaluationArray" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <!--罗列评价-->
        <el-dialog v-model="dialogEvaluateVisible" title="发表评价">
          <el-form>
            <el-input v-model="evaluationInput" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 5 }"
              placeholder="你会安利其他人玩这款游戏吗？从你的游戏体验中，有什么可以给大家参考？" />
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogEvaluateVisible = false">Cancel</el-button>
              <el-button @click="writeEvaluation">Confirm</el-button>
            </span>
          </template>
        </el-dialog>
      </el-tab-pane>

      <el-tab-pane label="攻略" name="third">攻略
        <p style="color: white;">你会安利其他人玩这款游戏吗？从你的游戏体验中，有什么可以给大家参考?
          这是一条占位文字！这是一条占位文字！这是一条占位文字！这是一条占位文字！这是一条占位文字！这是一条占位文字！</p>
      </el-tab-pane>
      <el-tab-pane label="论坛" name="fourth">论坛
        <p style="color: white;">你会安利其他人玩这款游戏吗？从你的游戏体验中，有什么可以给大家参考?
          这是一条占位文字！这是一条占位文字！这是一条占位文字！这是一条占位文字！这是一条占位文字！这是一条占位文字！</p>
      </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>


import axios from 'axios';
import { ref } from 'vue';
import { Star } from '@element-plus/icons-vue';
export default {
  inject: ['reload'],
  name: 'GameDetails',
  components: {
    Star
  },
  data() {
    return {
      gamedetailName: 'first',
      gameid: '',
      gname: '',
      gamelink: '',
      gameinfo: [],
      dialogEvaluateVisible: false,
      evaluationInput: '',

      evaluateinfo: [],
      evaluation: '',
      evaluationArray: [],
      // 占位
      spaceposition: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    };
  },
  setup() {
    const evaluationInput = ref('')
  },

  methods: {
    writeEvaluation() { // 将评价写入数据库
      // console.log(this.evaluation)
      this.evaluation += this.evaluationInput + 'chd'
      this.evaluateUpdate()
      this.dialogEvaluateVisible = false
      this.gamedetailName = 'second'
      this.reload()
    },

    evaluateUpdate() { // 评价表修改操作
      this.$http.get('api/evaluate/update', {
        params: {
          id: this.gameid,
          gname: this.gameinfo[this.gameid - 1].gname,
          evaluation: this.evaluation
        }
      }).then(res => {
        // console.log(res.data)
        if (res.data.status == 200) {
          console.log('评价成功')
        } else {
          this.$message({
            message: '评价失败',
            type: 'error'
          });
        }
      }).catch(err => {
        console.log('操作失败' + err)
      })
    }
  },

  created() {
    this.gameid = this.$route.query.id;
    this.$http.get('api/game/findAll').then(res => { // 查找game表全部数据
      this.gameinfo = res.data
      this.$refs.gameDetailImg.src = this.gameinfo[this.gameid - 1].img// 游戏详情大图
      this.$refs.gamedetailtext1.innerHTML = this.gameinfo[this.gameid - 1].introduction// 游戏介绍

      if (this.gamelink) {
 this.$refs.gamestart.$el.addEventListener('click', () => {
        window.location.href = this.gameinfo[this.gameid - 1].gamelink
      })
}// if 转移到外部网站
    }).catch(err => {
      console.log('获取数据失败' + err)
    }),
      this.$http.get('api/game/findAll').then(res => { // 查找evaluate表全部数据
        this.evaluateinfo = res.data;
        this.evaluation = this.evaluateinfo[this.gameid - 1].evaluation;
        this.evaluationArray = this.evaluation.split('chd');
        // console.log(this.evaluationArray)
      }).catch(err => {
        console.log('获取数据失败' + err);
      })
  }
}
</script>
<style scoped>
.game-detail-img {
  width: 400px;
}

.gamestart-button {
  background-color: #2C3E50;
  color: #f5f7f8;
}

.gamestart-button:hover {
  background-color: #ffd04b;
  color: #f5f7f8;
}

.gamestart-label {
  font-size: x-small;
  opacity: 70%;
}

.el-tabs__item {
  width: 100px;
}

.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #778899;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #708090;
}

p {
  word-break: break-all;
  word-wrap: break-word;
}
</style>
