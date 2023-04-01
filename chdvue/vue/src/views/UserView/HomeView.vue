<template>
  <div class="home">
    <GameList></GameList>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import GameList from '@/components/User/GameList.vue';
@Options({
  components: {
    GameList
  }
})
export default class HomeView extends Vue {}
</script>
