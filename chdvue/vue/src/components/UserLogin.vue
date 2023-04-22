<template>
  <div class="login-wrap">
    <el-form ref="form" :model="form" class="login-container">
      <h1 class="login-title">用户登录页面</h1>
      <el-form-item label="用户名:">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密&nbsp&nbsp&nbsp&nbsp码:">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login" class="btn-login">登录</el-button>
      </el-form-item>
      <router-link to="/register" class="routerlink-to-register">点此注册</router-link>
      <router-link to="/adminlogin" class="change-name">管理员登录</router-link>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      changeValue:0,
      changeName:"管理员登录",
      form: {
        username: '',
        password: ''
      }
    };
  },

  methods: {
    login() {
      if (this.form.username == '') {
        this.$message.error('用户名不能为空');
      } else if (this.form.password == '') {
        this.$message.error('密码不能为空');
      } else {
        this.$http.get('api/gameuser/find', {
          params: {
            username: this.form.username,
            password: this.form.password
          }
        }).then(res => {
          //console.log(res.data);
          this.$store.state.displayAdmin=0;
          this.$store.state.displayUser=1;
          this.$store.state.logined=true;
          this.$store.state.loginedName = this.form.username;
          this.$store.state.loginedNickName = res.data[0].nickname;
          if (res.data.length!==0) {
            this.$router.push({
              path: '/',
              query: {
                id:0
              }
            })
          } else {
            this.$alert('用户名或密码错误', '登录失败', {
              confirmButtonText: '确定',
              callback: action => {
                this.form.username = '',
                  this.form.password = ''
              }
            });
          }
        }).catch(err => {
          console.log('登录失败' + err);
        })
      }
    }
  }
}
</script>
<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  /* background-color: #112346; */
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}

.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.login-title {
  margin: 0px auto 10px auto;
  text-align: center;
  color: #2C3E50;
}

.btn-login {
  width: 100%;
  background-color: #2C3E50;
  color: #f5f7f8;
}

.routerlink-to-register,.change-name {
  font-size: x-small;
  color: #2C3E50;
  opacity: 0.6;
  margin-right: 10px;
}
</style>
