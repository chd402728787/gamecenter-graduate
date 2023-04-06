<template>
  <el-card class="person-card">
    <template #header>
      <div class="card-header">
        <span>个人中心</span>
      </div>
    </template>
    <div v-for="(item,index) in userinfo" :key="index" class="text item">
      <p>账户：{{item.username}}</p>
      <p>昵称：{{item.nickname}}</p>
      <p>性别:{{item.sex}}</p>
      <p>简介:{{item.introduction}}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "PersonNality",
  data(){
    return{
      id:'',
      username:this.$store.state.loginedName,
      password:'',
      nickname:'',
      sex:'',
      introduction:'',
      userinfo: {}
    }
  },
  mounted() {
    this.all();
  },
  methods:{
    all(){
      //console.log(this.username);
      this.$http.get('/api/gameuser/findByName',{
        params:{
          username:this.username
        }
      }).then((res)=>{
        this.userinfo = res.data;
        //console.log(res.data);
      })
    }
  }
}
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

p,.item {
  margin-bottom: 20px;
}

.person-card {
  text-align: left;
  width: 480px;
  height: 480px;
}
</style>
