<template>
    <div>
      <!-- 搜索筛选 -->
      <el-form ref="searchform" :inline="true" class="user-search">
        <el-form-item label="搜索：">
          <el-input size="small" v-model="searchForm.username" placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="findByName"><el-icon><Search /></el-icon>搜索</el-button>
          <el-button size="small" type="primary" @click="all"><el-icon><View /></el-icon>查询全部</el-button>
          <el-button size="small" type="primary" @click="openAMD"><el-icon><Plus /></el-icon>添加</el-button>
        </el-form-item>
      </el-form>
      <!--列表-->
      <el-table :data="userinfo" size="small" highlight-current-row border element-loading-text="拼命加载中" style="">
        <el-table-column align="center" type="selection" width="60">
        </el-table-column>
        <el-table-column sortable prop="id" label="序号" width="100">
        </el-table-column>
        <el-table-column sortable prop="username" label="用户名" width="100">
        </el-table-column>
        <el-table-column sortable prop="password" label="密码" width="100">
        </el-table-column>
        <el-table-column sortable prop="nickname" label="nickname" width="100">
        </el-table-column>
        <el-table-column sortable prop="sex" label="sex" width="100">
        </el-table-column>
        <el-table-column sortable prop="introduction" label="introduction" width="300">
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="200">
          <template v-slot="scope">
            <el-button size="small" @click="editOpen(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑界面 -->
      <el-dialog v-model="addMD" width="30%" >
        <el-form label-width="120px" ref="editForm" label-position="right">
          <el-form-item label="用户名:" prop="username">
            <el-input size="small" v-model="editForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input size="small" type="password" v-model="editForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="昵称:">
            <el-input size="small" v-model="editForm.nickname" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-select v-model="editForm.sex" placeholder="请选择性别" size="small" >
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="简介:">
            <el-input v-model="editForm.introduction" type="textarea" placeholder="个人介绍"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="cancelAMD">取消</el-button>
          <el-button size="small" type="primary" class="title" @click="add">保存</el-button>
        </div>
      </el-dialog>
      <!-- 编辑界面 -->
      <el-dialog v-model="updateMD" width="30%" >
        <el-form label-width="120px" ref="updateForm" label-position="right">
          <el-form-item label="用户名:" prop="username">
            <el-input size="small" v-model="updateForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input size="small" type="password" v-model="updateForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="昵称:">
            <el-input v-model="updateForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-select v-model="updateForm.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="简介:">
            <el-input v-model="updateForm.introduction" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="cancelUMD">取消</el-button>
          <el-button size="small" type="primary" class="title" @click="update()">保存</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script setup>
import {
  Search,
  Plus,
  View
} from '@element-plus/icons-vue'
</script>
<script>
export default {
  name: 'UserManager',
  data() {
    return {
      addMD:false,
      updateMD:false,
      id: '',
      username: '',
      password: '',
      userinfo: [],
      searchForm: {
        id:'',
        username: ''
      },
      editForm: {
        username: '',
        password: '',
        nickname:'',
        sex:'',
        introduction:''
      },
      updateForm: {
        id:'',
        username: '',
        password: '',
        nickname:'',
        sex:'',
        introduction:''
      }
    };
  },
  created(){
    this.all();
  },
  methods: {
    openAMD(){
      this.addMD = true;
    },
    cancelAMD(){
      this.addMD = false;
    },
    cancelUMD(){
      this.updateMD = false;
    },
    all() {
      let that = this;
      this.$http.get("/api/gameuser/findAll").then((res) => {
        //console.log(res)
        that.userinfo = res.data;
      })
        .catch((err) => {
          console.log('获取数据失败' + err);
        });
    },
    del(row) {
      // 删除操作
      console.log(row.id)
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$http.delete('/api/gameuser/delGuserByID?id=' + row.id)
          .then((res) => {
            // console.log(res.data);
            this.all();
          })
          .catch((err) => {
            console.log('操作失败' + err);
          });
      })
    },
    findByName() {
      // 查询操作
      let that = this;
      this.$http.get("/api/gameuser/findByName?username="+this.searchForm.username)
        .then((res) => {
          that.userinfo = res.data;
        }).catch((err) => {
        console.log('操作失败' + err);
      });
    },
    add() {
      // 添加操作
      this.cancelAMD()
      let that = this
      this.$http.put('/api/gameuser/add', this.editForm)
        .then((res) => {
          //console.log(res.data.status);
          that.all();
          that.userinfo = res.data;
        })
        .catch((err) => {
          console.log('操作失败' + err);
        });
    },
    editOpen(row){
      this.updateForm.id = row.id;
      this.updateMD = true;
    },
    update() {
      // 修改操作
      let that = this

      this.$http.put('/api/gameuser/update', this.updateForm)
        .then((res) => {
          //console.log(res.data.status);
          this.userinfo = res.data;
          that.all();
          this.updateMD = false;
        })
        .catch((err) => {
          console.log('操作失败' + err);
        });
    }
  }
}
</script>
<style scoped>

</style>
