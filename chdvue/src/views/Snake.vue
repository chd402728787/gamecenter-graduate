<template>
  <div class="snake">
    <GameSnake></GameSnake>
  </div>
</template>

<script>
// @ is an alias to /src

import GameSnake from '@/components/GameSnake.vue'

export default {
  name: 'Snake',
  components: {

    GameSnake
}
}
</script>
