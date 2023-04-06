<!--
 * @Date: 2023-02-18 09:53:13
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-19 20:44:56
 * @FilePath: \gD_Design\chdvue\src\components\Admin\GameManage.vue
-->
<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form ref="searchform" :inline="true" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="searchForm.id" placeholder="输入id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="get"><el-icon><Search /></el-icon>搜索</el-button>
        <el-button size="small" type="primary" @click="all"><el-icon><View /></el-icon>查询全部</el-button>
        <el-button size="small" type="primary" @click="openAMD"><el-icon><Plus /></el-icon>添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table :data="game" size="small" highlight-current-row border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="id" label="序号" width="100">
      </el-table-column>
      <el-table-column sortable prop="gname" label="游戏名" width="200">
      </el-table-column>
      <el-table-column sortable prop="img" label="图片" width="200">
        <template v-slot = "scope">
          <img :src="scope.row.img" width="100"/>
        </template>
      </el-table-column>
      <el-table-column sortable prop="introduction" label="简介" width="300">
      </el-table-column>
      <el-table-column sortable prop="gamelink" label="游戏链接" width="150">
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
      <el-form label-width="120px" ref="editForm">
        <el-form-item label="游戏名" prop="gname">
          <el-input size="small" v-model="editForm.gname" placeholder="请输入游戏名"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input size="small" v-model="editForm.introduction" placeholder="请输入游戏介绍"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-input size="small" v-model="editForm.img" placeholder="请输入图片URL"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="gamelink">
          <el-input size="small" v-model="editForm.gamelink" placeholder="请输入游戏链接"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelAMD">取消</el-button>
        <el-button size="small" type="primary" class="title" @click="add">保存</el-button>
      </div>
    </el-dialog>
    <!-- 编辑界面 -->
    <el-dialog v-model="updateMD" width="30%" >
      <el-form label-width="120px" ref="updateForm">
        <el-form-item label="游戏名" prop="gname">
          <el-input size="small" v-model="updateForm.gname" placeholder="请输入游戏名"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input size="small" v-model="updateForm.introduction" placeholder="请输入游戏介绍"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-input size="small" v-model="updateForm.img" placeholder="请输入图片"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="gamelink">
          <el-input size="small" v-model="updateForm.gamelink" placeholder="请输入游戏链接"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelUMD">取消</el-button>
        <el-button size="small" type="primary" class="title" @click="update()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import 'element-plus/theme-chalk/el-message-box.css';
import {Plus, Search, View} from "@element-plus/icons-vue";
import {genFileId} from "element-plus";
import {ref} from "vue";

export default {
  name: 'GameManager',
  components: {View, Search, Plus},
  data() {
    return {
      addMD:false,
      updateMD:false,
      game: [],
      fileList: [],
      searchForm: {
        id:'',
        gname: '',
        img: '',
        gamelink: '',
        introduction: '',
      },
      editForm: {
        id:'',
        gname: '',
        img: '',
        gamelink: '',
        introduction: '',
      },
      updateForm: {
        id:'',
        gname: '',
        img: '',
        gamelink: '',
        introduction: '',
      }
    };
  },
  created() {
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
    all(){
      let that = this;
      this.$http.get("/api/game/findAll").then((res)=>{
        //console.log(res)
        that.game = res.data;
      })
        .catch((err) => {
          console.log('获取数据失败' + err);
        });
    },
    del(row) {
      // 删除操作
      let that = this
      this.$http.delete('/api/game/delGameByID?id='+row.id)
        .then((res) => {
          // console.log(res.data);
          this.all();
        })
        .catch((err) => {
          console.log('操作失败' + err);
        });
    },
    get() {
      // 查询操作
      let that = this;
      this.$http.get("/api/game/findByID?id="+that.id)
        .then((res)=>{
        that.game = res.data;
      }).catch((err) => {
        console.log('操作失败' + err);
      });
    },
    add() {
      // 添加操作
      let that = this
      this.$http.put('/api/game/add',this.editForm)
        .then((res) => {
           //console.log(res.data.status);
          this.game = res.data;
          that.all();
          this.addMD = false;
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
      this.$http.put('/api/game/update', this.updateForm)
        .then((res) => {
          //console.log(res.data.status);
          this.game = res.data;
          that.all();
          this.updateMD = false;
        })
        .catch((err) => {
          console.log('操作失败' + err);
        });
    },
  }
};
</script>

<style scoped>
.el-table.cell {
  white-space: pre-wrap;
}
</style>
