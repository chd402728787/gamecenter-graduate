<!--
 * @Date: 2023-02-02 10:05:45
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-12 18:52:51
 * @FilePath: \gD_Design\chdvue\src\components\GameDetails.vue
-->
<template>
  <div>
    <img class="game-detail-img" ref="gameDetailImg" alt=""><br /><br />
    <!--开始按钮-->
    <el-row>
      <el-col>
        <router-link ref="linkto" :to="{ path: '/game/', query: { id: gameid } }">
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
    <el-row>
      <el-col>
        <el-tabs v-model="gamedetailName" class="gamedetail-tabs" :stretch=true>
          <!--详情-->
          <el-tab-pane label="详情" name="first">
            <h2>简介</h2>
            <p class="gamedetail" ref="gamedetailtext1">2</p>
            <h2>评价</h2>
            <h2>论坛</h2>
          </el-tab-pane>

          <!--评价-->
          <el-tab-pane label="评价" name="second">
            <!--发表评价-->
            <el-row>
              <el-col>
                <el-button @click="dialogEvaluateVisible = true"><el-icon>
                    <Star />
                  </el-icon> 写评价</el-button>
              </el-col>
            </el-row>
            <!--全部评价-->
            <el-row>
              <el-col :span="8">
                <h3>全部评价</h3>
              </el-col>
            </el-row>
            <!--罗列评价-->
            <el-row>

            </el-row>
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

          <el-tab-pane label="攻略" name="third">攻略</el-tab-pane>
          <el-tab-pane label="论坛" name="fourth">论坛</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { Star } from '@element-plus/icons-vue';
export default {
  name: 'GameDetails',
  components: {
    Star,
  },
  data() {
    return {
      gamedetailName: 'first',
      gameid: '',
      gname: '',
      gamelink: '',
      gameinfo: Array(),
      dialogEvaluateVisible: false,
      evaluationInput: '',

      evaluateinfo: Array(),
      evaluation: Array(),
    };
  },
  setup() {
    const evaluationInput = ref('')
  },

  methods: {
    writeEvaluation() {//将评价写入数据库
      this.dialogEvaluateVisible = false;
      //console.log(this.evaluateinfo);
      if(this.evaluation==null) this.evaluation=[];
      this.evaluation.push(this.evaluationInput);
      this.evaluateUpdate();
    },

    evaluateUpdate() {     //评价表修改操作
      axios.get('http://127.0.0.1/evalute/update', {
        params: {
          evaluation: this.evaluation
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.status == 200) {
          console.log("修改成功");
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          });
        }
      }).catch(err => {
        console.log("操作失败" + err);
      })
    }
  },

  created() {
    this.gameid = this.$route.query.id;
    axios.get('http://127.0.0.1/game/all').then(res => {
      this.gameinfo = res.data;
      this.$refs.gameDetailImg.src = this.gameinfo[this.gameid - 1].img;//游戏详情大图
      this.$refs.gamedetailtext1.innerHTML = this.gameinfo[this.gameid - 1].introduction;//游戏介绍
      if (this.gamelink) this.$refs.gamestart.$el.addEventListener('click', () => {
        window.location.href = this.gameinfo[this.gameid - 1].gamelink;
      })//if 转移到外部网站
    }).catch(err => {
      console.log("获取数据失败" + err);
    }),

    axios.get('http://127.0.0.1/evaluate/all').then(res => {//查找evaluate表全部数据
      //console.log(res.data);
      this.evaluateinfo = res.data;
      this.evaluation = this.evaluateinfo[this.gameid - 1].evaluation;
    }).catch(err => {
      console.log("获取数据失败" + err);
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
</style>