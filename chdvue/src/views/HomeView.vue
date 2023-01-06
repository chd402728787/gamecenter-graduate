<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <LeftTitle msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import LeftTitle from '@/components/LeftTitle.vue';
@Options({
  components: {
    LeftTitle
  }
})
export default class HomeView extends Vue {}
</script>
