<template>
    <div>
      <img class="game-detail-img" ref="gameDetailImg" alt=""><br/><br/>
      <!--开始按钮-->
      <el-row>
        <el-col>
          <router-link ref="linkto" :to="{path:'/game/',query:{id:gameid}}">
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
          <el-tabs v-model="gamedetailName" class="gamedetail-tabs" @tab-click="handleClick" stretch=true>
            <el-tab-pane label="详情" name="first">
              <h2>简介</h2>
              <p class="gamedetail" ref="gamedetailtext1">2</p>
              <h2>评价</h2>
              <h2>论坛</h2>
            </el-tab-pane>
            <el-tab-pane label="评价" name="second">评价</el-tab-pane>
            <el-tab-pane label="攻略" name="third">攻略</el-tab-pane>
            <el-tab-pane label="论坛" name="fourth">论坛</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  import axios from 'axios';
  import {ref} from 'vue';
  export default {
    data () {
      return {
        gamedetailName:'first',

        gameid:'',
        rocostart:0,
        gamelink: '',
        info: Array(),
      };
    },

  created() {
    this.gameid = this.$route.query.id;
    axios.get('http://127.0.0.1/game/all').then(res => {
          this.info = res.data
          //console.log(this.info)
          console.log(this.$refs.gamedetaillabel)
          this.$refs.gameDetailImg.src = this.info[this.gameid-1].img;
          this.$refs.gamedetailtext1.innerHTML = this.info[this.gameid-1].introduction;
          if(this.gameid==3) this.$refs.gamestart.$el.addEventListener('click',()=> {
            window.location.href = this.info[this.gameid-1].gamelink;
          })
      }).catch(err => {
          console.log("获取数据失败" + err);
    })
  },
  mounted(){

  },
}
</script>
<style scoped>
.game-detail-img{
  width: 400px;
}
.gamestart-button{
  background-color: #2C3E50;
  color: #f5f7f8;
}
.gamestart-button:hover{
  background-color: #ffd04b;
  color: #f5f7f8;
}
.gamestart-label{
  font-size: x-small;
  opacity: 70%;
}
</style>