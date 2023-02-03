<template>
  <div class="gameView">
    <Game2048 v-if="g2048"></Game2048>
    <GameSnake v-if="snake"></GameSnake>

  </div>
</template>

<script>
import Game2048 from '../components/Game2048.vue'
import GameSnake from '../components/GameSnake.vue'
export default {
  data() {
    return {
      gameid: '',
      g2048: false,
      snake: false,
      rock: false
    }
  },
  name: 'GameView',
  created() {
    //console.log(this.$route.query.id);
    this.gameid = this.$route.query.id
    switch (this.gameid) {
      case '1':
        this.g2048 = true;
        break;
      case '2':
        this.snake = true;
        break;
      case '3':
        this.rock = true;
        break;
      default:
        break;
    }
  },
  components: {
    Game2048,
    GameSnake
  }
}
</script>
<style lang="less" scoped>

</style>