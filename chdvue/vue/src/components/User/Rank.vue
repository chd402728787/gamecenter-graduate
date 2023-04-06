<template>
  <div>
    <div class="rank">
      <el-row>
        <el-col>
          <el-tabs v-model="ranktabsvmodel" class="rank-tabs-class" :stretch=true>
            <!--详情-->
            <el-tab-pane label="热门榜" name="first">
              <el-table :data="hotinfo" stripe style="width: 100%;cellpadding:0;">
                <el-table-column prop="img">
                  <template v-slot="scope">
                    <span>
                      <router-link @click="updateHot(scope.row.id)" :to="{ path: '/user/gamedetails/', query: { id: scope.row.id } }">
                        <img :src="scope.row.img" alt="" style="width: 150px;height: 150px">
                      </router-link>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="gname" width="180" />
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="新品榜" name="third">
              <el-table :data="newinfo" stripe style="width: 100%;cellpadding:0;">
                <el-table-column prop="img">
                  <template v-slot="scope">
                    <span>
                      <router-link @click="updateHot(scope.row.id)" :to="{ path: '/user/gamedetails/', query: { id: scope.row.id } }">
                        <img :src="scope.row.img" alt="" style="width: 150px;height: 150px">
                      </router-link>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="gname" width="180" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
</div>
</template>
<script>

import axios from 'axios';
import {ElMessage} from "element-plus";
export default {
  name: 'Rank',
  data() {
    return {
      id: '',
      gname: '',
      img: '',
      hotinfo: [], // 热门榜
      newinfo: [], // 新品榜
      ranktabsvmodel: 'first',
      info:[]
    };
  },
  methods: {
    allnew() {
      this.$http.get('api/game/findAll').then(res => {
        this.newinfo = res.data.sort(function (a,b){
          const x = a.date.replace(/-/g, '').replace(/:/g, '').replace('.', '').replace('T', '').replace('Z', '');
          const y = b.date.replace(/-/g, '').replace(/:/g, '').replace('.', '').replace('T', '').replace('Z', '');
          return x - y;
        });
      }).catch(err => {
        console.log('获取数据失败' + err);
      })
      },
    allhot(){
      this.$http.get('api/game/findAll').then(res => {
        this.hotinfo = res.data.sort(function (a,b){
          return b.hotvalue-a.hotvalue;
        });
      }).catch(err => {
        console.log('获取数据失败' + err);
      })
    },
    updateHot(id){
      if(this.$store.state.logined==false){
        this.$router.push({
          path:'/userlogin'
        });
        ElMessage({
          message:'请先登录！',
          type:'warning',
          showClose:true
        });
      }else{
        this.$http.get('api/game/findAll').then(res => {
          this.info = res.data;
          //console.log(this.info[id-1]);
          let paramshot = {
            id:id,
            hotvalue:parseInt(this.info[id-1].hotvalue)+1
          }
          this.$http.put('/api/game/updatehot',paramshot)
            .then((res)=>{
              console.log('热度+1');
            }).catch((err)=>{
            console.log('更新热度失败'+err);
          });
        }).catch(err => {
          console.log('获取数据失败' + err);
        })
      }
      }
  },

  created() {
    this.allnew();
    this.allhot();
  }
}
</script>
<style>
.rank-tabs-class {
  width: 600px;
}

.rank-img {
  width: 150px;
}

.customer-table th,
.customer-table td,
.customer-table th.is-leaf,
.el-table--border,
.el-table--group {
  border: none;
}

.customer-table thead tr th.is-leaf {
  border: 1px solid #ebeef5;
  border-right: none;
}

.customer-table thead tr th:nth-last-of-type(2) {
  border-right: 1px solid #ebeef5;
}

.el-table--border::after,
.el-table--group::after,
.customer-table::before,
.customer-table .el-table__fixed-right::before,
.el-table__fixed::before {
  width: 0;
}

.el-table--border th.gutter:last-of-type {
  border: 1px solid #ebeef5;
  border-left: none;
}

.router-link-active,
a {
  text-decoration: none;
}
</style>
