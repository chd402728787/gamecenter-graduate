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
                      <router-link :to="{ path: '/user/gamedetails/', query: { id: scope.row.id } }">
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
                      <router-link :to="{ path: '/user/gamedetails/', query: { id: scope.row.id } }">
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
export default {
  name: 'Rank',
  data() {
    return {
      id: '',
      gname: '',
      img: '',
      hotinfo: Array(),//热门榜
      newinfo:Array(),//新品榜
      ranktabsvmodel: 'first'
    };
  },
  methods:{
    sortDate(a,b){//对新品榜按时间排序
        var x = a.date.replace(/-/g,"").replace(/:/g,"").replace(".","").replace("T","").replace("Z","");
        var y = b.date.replace(/-/g,"").replace(/:/g,"").replace(".","").replace("T","").replace("Z","");
        return y-x;
    },
    all(info){
      axios.get('http://127.0.0.1/game/all').then(res => {
      if(info==this.hotinfo)
        this.hotinfo = res.data;
      else{
        this.newinfo = res.data.sort(this.sortDate);
      }
    }).catch(err => {
      console.log("获取数据失败" + err);
    })
    }
  },
  created() {
    this.all(this.hotinfo);
    this.all(this.newinfo);
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