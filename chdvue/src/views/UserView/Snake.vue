<!--
 * @Date: 2023-01-19 13:32:59
 * @LastEditors: aDong
 * @LastEditTime: 2023-02-18 09:07:42
 * @FilePath: \gD_Design\chdvue\src\views\UserView\Snake.vue
-->
<template>
  <div class="snake">
    <GameSnake></GameSnake>
  </div>
</template>

<script>
// @ is an alias to /src

import GameSnake from '@/components/User/GameSnake.vue'

export default {
  name: 'Snake',
  components: {

    GameSnake
}
}
</script>
