<template>
  <el-row v-for="(item,index) in info" :key="index">
    <router-link :to="{path:'/gamedetails/',query:{id:item.id}}">
      <el-card class="gamelist-card">
        <img class="card-img" :src="item.img" />
        <p><span>{{item.gname}}</span></p>
      </el-card>
    </router-link>
  </el-row>
</template>
<script>
import axios from 'axios';

export default {
  data () {
    return {
      id: '',
      gname: '',
      img: '',
      info: Array(),
    };
  },

  created () {
    axios.get('http://127.0.0.1/game/all').then(res => {
          this.info = res.data
      }).catch(err => {
          console.log("获取数据失败" + err);
      })
  }
}
</script>
<style scoped>
.el-card{
  width: 600px;
}
.el-row{
  padding-bottom: 20px;
}
.card-img{
  width: 500px;
}
.router-link-active {
   text-decoration: none;
}

a {
  text-decoration: none;
}
.el-card, .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
  background-color: #f5f7f8;
  box-shadow: none;
}

</style>
