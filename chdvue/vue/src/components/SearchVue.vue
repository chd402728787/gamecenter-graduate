<template>
  <el-input v-model="input" placeholder="Please input" >
    <el-icon><Search /></el-icon>
  </el-input>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { ref, getCurrentInstance } from 'vue'
const input = ref('')
</script>

<script lang="ts">
  export default {
    name: 'SearchVue',
    data() {
    return {
      mainPage: true
    }
   }
  }
</script>
