<template>
  <div class="gameView">
    <Game2048 v-if="g2048"></Game2048>
    <GameSnake v-if="snake"></GameSnake>
    <GoBang v-if="gobang"></GoBang>
  </div>
</template>

<script>
import Game2048 from '../components/Game2048.vue'
import GameSnake from '../components/GameSnake.vue'
import GoBang from '../components/GoBang.vue'
export default {
  data() {
    return {
      gameid: '',
      g2048: false,
      snake: false,
      gobang: false,
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
      case '4':
        this.gobang = true;
      default:
        break;
    }
  },
  components: {
    Game2048,
    GameSnake,
    GoBang
  }
}
</script>
<style lang="less" scoped>

</style>