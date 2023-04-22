<template>
    <div class="search-sg">
      <el-form ref="searchform" :inline="true" class="user-search">
        <el-form-item label="搜索：">
          <el-input size="small" v-model="searchForm.username" placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="findByName"><el-icon><Search /></el-icon>搜索</el-button>
          <el-button size="small" type="primary" @click="all"><el-icon><View /></el-icon>查询全部</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="admin-user-suggestion" v-for="(item,index) in suggestinfo" :key="index">
      <el-card class="box-card">
        <p>意见编号：{{item.id}}</p>
        <p>账号：{{item.username}}</p>
        <p>昵称：{{item.nickname}}</p>
        <p>意见内容：{{item.suggestion}}</p>
      </el-card>
    </div>
</template>
<script>

import {Plus, Search, View} from "@element-plus/icons-vue";

export default {
  name:'UserSuggestion',
  components: {Plus, Search, View},
  data(){
    return{
      suggestinfo:[],
      searchForm:{
        username:''
      }
    }
  },
  created() {
    this.all();
  },
  methods:{
    all(){
      this.$http.get('/api/suggest/findAll').then(res=> {
        this.suggestinfo=res.data;
      }).catch(err=>{
        console.log(err);
      })
    },
    findByName(){
      this.$http.get('/api/suggest/findByName?username='+this.searchForm.username).then(res=> {
        this.suggestinfo=res.data;
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}

</script>
<style>
p {
  font-size: 14px;
}

.box-card {
  text-align: left;
  width: 480px;
  margin-bottom: 20px;
}
</style>
