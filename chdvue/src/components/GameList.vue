<template>
  <el-row v-for="(item,index) in info" :key="index">
    <router-link to="/game">
      <el-card >
        <img class="card-img" :src="item.img" />
        <p><span>{{item.gname}}</span></p>
      </el-card>
    </router-link>
  </el-row>
</template>
<script setup lang="ts">

</script>
<script>
import axios from 'axios';
export default {
  data () {
    return {
      id: '',
      gname: '',
      img: '',
      info: Array()
    };
  },
  created () {
    axios.get('http://127.0.0.1/game/all').then(res => {
          //console.log(res.data);
          this.info = res.data
          console.log(this.info);
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
  padding: 5px;
}
.card-img{
  width: 550px;
}
</style>
