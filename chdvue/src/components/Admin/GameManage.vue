<!--
 * @Date: 2023-02-18 09:53:13
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-19 20:44:56
 * @FilePath: \gD_Design\chdvue\src\components\Admin\GameManage.vue
-->
<template>
  <div>
    <div class="left">
      <el-button type="primary" @click="all">获取game表的全部数据</el-button>
      <h2>-----------------------------------</h2>
      <el-input v-model="id" placeholder="请输入id" class="input"></el-input>
      <el-button type="danger" @click="del">删除</el-button>
      <el-button type="primary" @click="get">查询</el-button>
      <h2>-----------------------------------</h2>
      <el-input v-model="id" placeholder="请输入id" class="input"></el-input>
      <el-input v-model="gname" placeholder="请输入游戏名" class="input"></el-input>
      <el-input v-model="img" placeholder="请输入图片" class="input"></el-input>
      <el-upload v-model:file-list="fileList" class="img-upload"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed">
        <el-button type="primary">Click to upload</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        </template>
      </el-upload>
      <el-input v-model="gamelink" placeholder="请输入游戏链接" type="textarea" class="input"></el-input>
      <el-input v-model="introduction" placeholder="请输入游戏介绍" type="textarea" class="input"></el-input>
      <el-button type="primary" @click="add">添加</el-button>
      <el-button type="primary" @click="update">修改</el-button>
    </div>
    <div class="right">
      <el-table :data="game" class="hovertable">
        <el-table-column prop="id" label="ID" width="50px" />
        <el-table-column prop="gname" label="游戏名" width="100px" />
        <el-table-column prop="img" label="图片">
          <template v-slot="scope">
            <img :src="scope.row.img" style="width: 100px;height: 100px">
          </template>
        </el-table-column>
        <el-table-column prop="gamelink" label="游戏链接"/>
        <el-table-column prop="introduction" label="游戏介绍" />
      </el-table>
    </div>
</div>
</template>
<script lang="ts">
import axios from "axios"
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message-box.css'

export default {
  name: 'GameManager',
  data() {
    return {
      id: '',
      gname: '',
      img: '',
      fileList: [],
      gamelink: '',
      introduction: '',
      game: Array()
    };
  },
  methods: {
    all() {    //查找game表全部数据
      axios.get('http://127.0.0.1/game/all').then(res => {
        // console.log(res.data);
        this.game = res.data
      }).catch(err => {
        console.log("获取数据失败" + err);
      })
    },
    del() {    //删除操作
      axios.get('http://127.0.0.1/game/del', {
        params: {
          id: this.id
        }
      }).then(res => {
        // console.log(res.data);
        if (res.data.status == 200) {
          this.all()
        } else {
          ElMessage({
            message: '删除失败',
            type: 'error'
          });
        }
      }).catch(err => {
        console.log("操作失败" + err);
      })
    },
    get() {    //查询操作
      axios.get('http://127.0.0.1/game/get', {
        params: {
          id: this.id
        }
      }).then(res => {
        // console.log(res.data);
        this.game = res.data
      }).catch(err => {
        console.log("操作失败" + err);
      })
    },
    add() {   //添加操作
      axios.get('http://127.0.0.1/game/add', {
        params: {
          id: this.id,
          gname: this.gname,
          img: this.img,
          gamelink: this.gamelink,
          introduction: this.introduction
        }
      }).then(res => {
        // console.log(res.data);
        if (res.data.status == 200) {
          this.all()
        } else {
          ElMessage({
            message: '添加失败',
            type: 'error'
          });
        }
      }).catch(err => {
        console.log("操作失败" + err);
      })
    },
    update() {     //修改操作
      axios.get('http://127.0.0.1/game/update', {
        params: {
          id: this.id,
          gname: this.gname,
          img: this.img,
          gamelink: this.gamelink,
          introduction: this.introduction
        }
      }).then(res => {
        // console.log(res.data);
        if (res.data.status == 200) {
          this.all()
        } else {
          ElMessage({
            message: '修改失败',
            type: 'error'
          });
        }
      }).catch(err => {
        console.log("操作失败" + err);
      })
    },

    handlePreview(){

    },
    handleRemove(){

    },
    beforeRemove(){

    },
    handleExceed(){

    }
  }
}

</script>
<style scoped>
.el-table.cell {
  white-space: pre-wrap;
}
</style>