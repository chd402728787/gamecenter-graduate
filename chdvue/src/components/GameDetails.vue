<template>
    <div>
      <img class="game-detail-img" ref="gameDetailImg" alt=""><br/><br/>
      <p>
        <router-link :to="{path:'/game/',query:{id:gameid}}">
          <el-button class="gamestart" ref="gamestart" type="primary">开始游戏</el-button>
        </router-link>
      </p>
    </div>
</template>
<script>
  import axios from 'axios';

  export default {
    data () {
      return {
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
          this.$refs.gameDetailImg.src = this.info[this.gameid-1].img;
          if(this.gameid==3) this.$refs.gamestart.$el.addEventListener('click',()=> {
            window.location.href = this.info[this.gameid-1].gamelink
          })
      }).catch(err => {
          console.log("获取数据失败" + err);
    })
  },
  mounted(){

  },
  methods:{

  }
}
</script>
<style scoped>
.game-detail-img{
  width: 400px;
}
</style>