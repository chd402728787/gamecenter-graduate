<template>
  <div class="game2048">
    <Game2048></Game2048>
  </div>
</template>

<script>
// @ is an alias to /src
import Game2048 from '@/components/Game2048.vue'

export default {
  name: 'Game2048View',
  components: {
    Game2048,
  }
}
</script>
