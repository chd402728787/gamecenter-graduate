<template>
  <el-row v-for="(item,index) in info" :key="index">
    <router-link :to="{path:'/user/gamedetails/',query:{id:item.id}}" @click="updateHot(item.id)">
      <el-card class="gamelist-card">
        <img class="card-img" :src="item.img" />
        <p><span>{{item.gname}}</span></p>
      </el-card>
    </router-link>
  </el-row>
</template>
<script>
import axios from 'axios';
import {ElMessage} from "element-plus";

export default {
  data () {
    return {
      id: '',
      gname: '',
      img: '',
      info: []
    };
  },
  methods:{
    all(){
      this.$http.get('api/game/findAll').then(res => {
        this.info = res.data
      }).catch(err => {
        console.log('获取数据失败' + err);
      })
    },
    updateHot(id){
      if(this.$store.state.logined==false){
        this.$router.push({
          path:'/userlogin'
        });
        ElMessage({
          message:'请先登录！',
          type:'warning',
          showClose:true
        });
      }
      else{
        this.$http.get('api/game/findAll').then(res => {
          this.info = res.data;
          //console.log(this.info[id-1]);
          let paramshot = {
            id:id,
            hotvalue:parseInt(this.info[id-1].hotvalue)+1
          }
          this.$http.put('/api/game/updatehot',paramshot)
            .then((res)=>{
              console.log('热度+1');
            }).catch((err)=>{
            console.log('更新热度失败'+err);
          });
        }).catch(err => {
          console.log('获取数据失败' + err);
        })
        }
      }
  },
  mounted () {
    this.all();
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
  width: 400px;
}
a,.router-link-active {
   text-decoration: none;
}

.el-card, .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
  background-color: #f5f7f8;
  box-shadow: none;
}

</style>
