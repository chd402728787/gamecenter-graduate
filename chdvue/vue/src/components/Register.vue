<template>
  <div class="register-wrap">
        <el-form ref="form" :model="form" class="register-container">
        <h1 class="register-title">注册页面</h1>
        <el-form-item label="用户名:">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密&nbsp&nbsp&nbsp&nbsp码:">
            <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
          <el-form-item label="昵&nbsp&nbsp&nbsp&nbsp称:">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="性&nbsp&nbsp&nbsp&nbsp别:">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="简&nbsp&nbsp&nbsp&nbsp介:">
            <el-input v-model="form.introduction" type="textarea"></el-input>
          </el-form-item>
        <el-form-item>
          <el-button @click="register" class="btn-register">注册</el-button>
        </el-form-item>
        <router-link to="/userlogin" class="routerlink-to-login">返回登录</router-link>
        </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        nickname:'',
        sex:'',
        introduction:''
      },
      isnull: false
    };
  },

  methods: {
    register() {
      if (this.form.username === '') {
        this.$message.error('用户名不能为空');
      } else if (this.form.password === '') {
        this.$message.error('密码不能为空');
      } else {
        this.$http.get('api/gameuser/findByName', {
          params:{
            username:this.form.username
          }
        })
        .then((res) => {
          // console.log(res.data.message);
          if (res.data.length==0) {
            this.$http.put('api/gameuser/add', this.form)
              .then((res)=>{
              this.$alert('是否返回登录页面', '注册成功', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/login')
                }
              })
            }).catch(err => {
              console.log('注册失败' + err);
            })
          } else if(res.data.length!=0){
            this.$alert('用户名已存在', '注册失败', {
              confirmButtonText: '确定',
              callback: action => {
                this.form.username = '',
                this.form.password = ''
              }
            })
          } else {
            console.log(res.message);
          }
        }).catch(err => {
          console.log('操作失败' + err);
        })
      }
    }
  }
}
</script>
<style scoped>
.register-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}

.register-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.register-title {
  margin: 0px auto 10px auto;
  text-align: center;
  color: #2C3E50;
}

.btn-register {
  width: 100%;
  background-color: #2C3E50;
  color: #f5f7f8;
}

.routerlink-to-login {
  font-size: x-small;
  color: #2C3E50;
  opacity: 0.6;
}
</style>

