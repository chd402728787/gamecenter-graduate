<template>
  <div id="box">
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
      <el-button type="primary" @click="add">添加</el-button>
      <el-button type="primary" @click="update">修改</el-button>
    </div>
    <div class="right">
      <table class="hovertable">
        <tr>
          <th>ID</th><th>游戏名</th><th>图片</th>
        </tr>
        <tr v-for="(item, index) in info"  v-bind:key="index">
          <td>{{item.id}}</td>
          <td>{{item.gname}}</td>
          <td><img :src="item.img" fit="fit" /></td>
        </tr>
      </table>
      <el-table :data="info" >
      <el-table-column prop="id" width="180" />
      <el-table-column prop="gname" width="180" />
      <el-table-column  prop="img" width="180" >
        <template v-slot="scope">
          <span class="title-img">
            <img :src="scope.row.img" alt="" class="table-img">
          </span>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      id: '',
      gname: '',
      img: '',
      info: []
    };
  },
  methods: {
    all () { //查找game表全部数据
      axios.get('http://127.0.0.1/game/all').then(res => {
          console.log(res.data);
          this.info = res.data
      }).catch(err => {
          console.log("获取数据失败" + err);
      })
    },
    del () { //删除操作
      axios.get('http://127.0.0.1/game/del',{
        params: {
          id: this.id
        }
      }).then(res => {
          console.log(res.data);
          if(res.data.status == 200) {
          	this.all()
          }else{
          	this.$message({
	          message: '删除失败',
	          type: 'error'
	        });
          }
      }).catch(err => {
          console.log("操作失败" + err);
      })
    },
    get () { //查询操作
      axios.get('http://127.0.0.1/game/get',{
        params: {
          id: this.id
        }
      }).then(res => {
          console.log(res.data);
          this.info = res.data
      }).catch(err => {
          console.log("操作失败" + err);
      })
    },
    add() { //添加操作
      axios.get('http://127.0.0.1/game/add',{
        params: {
          id: this.id,
          name: this.gname,
          img: this.img,
        }
      }).then(res => {
          //console.log(res.data);
          if(res.data.status == 200) {
          	this.all()
          }else{
          	this.$message({
	          message: '添加失败',
	          type: 'error'
	        });
          }
      }).catch(err => {
          console.log("操作失败" + err);
      })
    },
    update() { //修改操作
      axios.get('http://127.0.0.1/game/update',{
        params: {
          id: this.id,
          gname: this.gname,
          img: this.img,
        }
      }).then(res => {
          //console.log(res.data);
          if(res.data.status == 200) {
          	this.all()
          }else{
          	this.$message({
	          message: '修改失败',
	          type: 'error'
	        });
          }
      }).catch(err => {
          console.log("操作失败" + err);
      })
    }
  }
}
</script>

