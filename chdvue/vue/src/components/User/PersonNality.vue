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
      <el-button class="btn-change-pw" @click="changePW">修改密码</el-button>
      <el-popconfirm title="确认要注销吗？" @confirm="delogin">
        <template #reference>
          <el-button class="btn-delogin">注销</el-button>
        </template>
      </el-popconfirm>
    </div>
    <el-dialog v-model="changediapw" width="30%" >
      <el-form label-width="120px" ref="editForm" label-position="right">
        <el-form-item label="原密码:" prop="password">
          <el-input size="small" v-model="editForm.password" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newpassword1">
          <el-input size="small" type="password" v-model="editForm.newpassword1" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码:" prop="newpassword2">
          <el-input size="small" v-model="editForm.newpassword2" type="password" placeholder="再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="canceldia">取消</el-button>
        <el-button size="small" type="primary" class="title" @click="submitchange">保存</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import {ElMessage} from "element-plus";

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
      userinfo: {},
      changediapw:false,
      editForm:{
        password:'',
        newpassword1:'',
        newpassword2:''
      }
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
    },
    delogin(){
      this.$store.state.logined=false;
      this.$router.push({
        path:'/userlogin'
      })
    },
    changePW(){
      this.changediapw = true;
    },
    canceldia(){
      this.changediapw = false;
    },
    submitchange(){
      this.$http.get('api/gameuser/findByName?username='+this.$store.state.loginedName).then(res=>{
        this.userinfo = res.data;
        if(this.userinfo[0].password==this.editForm.password){
          if(this.editForm.newpassword1==this.editForm.newpassword2){
            let paramspw = {
              id:this.userinfo[0].id,
              username:this.$store.state.loginedName,
              password:this.editForm.newpassword1,
              nickname:this.userinfo[0].nickname,
              sex:this.userinfo[0].sex,
              introduction:this.userinfo[0].introduction
            }
            this.$http.put('api/gameuser/update',paramspw).then(res=>{
              ElMessage({
                message:'修改成功！',
                type:'success'
              });
              this.changediapw = false;
            })
          }
          else{
            ElMessage({
              message:'两次密码输入不一致',
              type:'error'
            })
          }
        }else{
          ElMessage({
            message:'原密码输入错误',
            type:'error'
          })
        }
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
  margin-bottom: 30px;
}

.person-card {
  text-align: left;
  width: 480px;
  height: 480px;
}
</style>
