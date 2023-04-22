<template>
  <el-card class="person-card">
    <template #header>
      <div class="card-header">
        <span>用户意见</span>
      </div>
    </template>
    <div >
      <el-form
        label-position='left'
        label-width="100px"
        :model="suggestForm"
        style="max-width: 460px;margin-bottom: 20px"
      >
        <el-form-item label="用户名:">
          <el-input v-model="suggestForm.username"/>
        </el-form-item>
        <el-form-item label="昵称:">
          <el-input v-model="suggestForm.nickname"/>
        </el-form-item>
        <el-form-item label="意见:">
          <el-input v-model="suggestForm.suggestion" type="textarea" :rows="8" placeholder="请提供您对本平台的意见，有助于我们进行改善和提高用户体验，谢谢！"/>
        </el-form-item>
        <el-button class="clear-form" @click="clear">清空</el-button>
        <el-button class="submit-form" @click="submitS">提交</el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "UserSuggest",
  data(){
    return{
      id:'',
      username:'',
      suggestForm:{
        username:this.$store.state.loginedName,
        nickname:this.$store.state.loginedNickName,
        suggestion:'',
      }
    }
  },
  created() {
    this.suggestForm.username = this.$store.state.loginedName;
    this.suggestForm.nickname = this.$store.state.loginedNickName;
  },
  mounted() {
  },
  methods: {
    clear(){
      this.suggestForm.suggestion='';
    },
    submitS(){
      console.log(this.suggestForm)
      this.$http.put('/api/suggest/add',this.suggestForm).then(res=>{
        ElMessage({
          message:'提交成功！',
          type:'success'
        })
        this.clear();
      }).catch(err=>{
        ElMessage({
          message:'提交失败！',
          type:'error'
        })
        console.log('提交失败'+err);
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
.person-card {
  text-align: left;
  width: 480px;
  height: 480px;
}
</style>

