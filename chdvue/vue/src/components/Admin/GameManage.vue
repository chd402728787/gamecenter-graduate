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
      <el-input
        v-model="gname"
        placeholder="请输入游戏名"
        class="input"
      ></el-input>
      <el-input v-model="img" placeholder="请输入图片" class="input"></el-input>
      <el-upload
        v-model:file-list="fileList"
        class="img-upload"
        action="http://localhost:3000"
        :http-request="uploadHttpRequest"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :before-upload="beforeUpload"
        :limit="1"
        :on-exceed="handleExceed"
        :on-error="handlerror"
      >
        <el-button type="primary">Click to upload</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        </template>
      </el-upload>
      <el-input
        v-model="gamelink"
        placeholder="请输入游戏链接"
        type="textarea"
        class="input"
      ></el-input>
      <el-input
        v-model="introduction"
        placeholder="请输入游戏介绍"
        type="textarea"
        class="input"
      ></el-input>
      <el-button type="primary" @click="add">添加</el-button>
      <el-button type="primary" @click="update">修改</el-button>
    </div>
    <div class="right">
      <el-table :data="game" class="hovertable">
        <el-table-column prop="id" label="ID" width="50px" />
        <el-table-column prop="gname" label="游戏名" width="100px" />
        <el-table-column prop="img" label="图片">
          <template v-slot="scope">
            <img :src="scope.row.img" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="gamelink" label="游戏链接" />
        <el-table-column prop="introduction" label="游戏介绍" />
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message-box.css';

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
      game: []
    };
  },
  methods: {
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
    del() {
      // 删除操作
      let that = this
      this.$http.delete('/api/game/delGameByID?id='+that.id)
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
      this.$http.put('/api/game/add', {
          params: {
            gname: that.gname,
            img: that.img,
            gamelink: that.gamelink,
            introduction: that.introduction
          }
        })
        .then((res) => {
           //console.log(res.data.status);
          that.all();
        })
        .catch((err) => {
          console.log('操作失败' + err);
        });
    },
    update() {
      // 修改操作
      let that = this
      let udparams = {
        id:that.id,
        gname: that.gname,
        img: that.img,
        gamelink: that.gamelink,
        introduction: that.introduction
      }
      this.$http.put('/api/game/update', udparams)
        .then((res) => {
          //console.log(res.data.status);
          that.all();
        })
        .catch((err) => {
          console.log('操作失败' + err);
        });
    },

    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) ElMessage.error('上传图片只能是jpg/png格式！');
      if (!isLt2M) ElMessage.error('上传图片大小不能超过 2MB!');
      return isJPG && isLt2M;
    },
    handleExceed(files, fileList) {
      ElMessage({
        message: '只可添加一张图片',
        type: warning
      });
    },
    handlerror(err, file, fileList) {
      console.log('err', err);
    }
  },
  setup() {}
};
</script>
<style scoped>
.el-table.cell {
  white-space: pre-wrap;
}
</style>
