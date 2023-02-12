<!--
 * @Date: 2023-01-07 10:18:09
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-12 20:40:56
 * @FilePath: \gD_Design\chdvue\src\views\rankView.vue
-->
<template>
  <div class="rank">
    <el-row>
      <el-col>
        <el-tabs  v-model="ranktabsvmodel" class="rank-tabs-class" :stretch=true>
          <!--详情-->
          <el-tab-pane label="热门榜" name="first">
            <el-table :data="info" stripe style="width: 100%;cellpadding:0;">
              <el-table-column prop="id" width="180" />
              <el-table-column prop="gname" width="180" />
              <el-table-column prop="img">
                <template v-slot="scope">
                  <span>
                    <img :src="scope.row.img" alt="" style="width: 150px;height: 150px">
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="新品榜" name="third">
            <el-table :data="info" stripe style="width: 100%;cellpadding:0;">
              <el-table-column prop="id" width="180" />
              <el-table-column prop="gname" width="180" />
              <el-table-column prop="img">
                <template v-slot="scope">
                  <span>
                    <img :src="scope.row.img" alt="" style="width: 150px;height: 150px">
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      id: '',
      gname: '',
      img: '',
      info: Array(),
      ranktabsvmodel:'first'
    };
  },

  created() {
    axios.get('http://127.0.0.1/game/all').then(res => {
      this.info = res.data
    }).catch(err => {
      console.log("获取数据失败" + err);
    })
  }
}

</script>
<style>
.rank-tabs-class {
  width: 600px;
}

.rank-img {
  width: 100px;
}

.el-table {}

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