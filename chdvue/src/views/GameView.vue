<template>
    <div>
      <Game2048></Game2048>
    </div>
</template>
<script lang="ts">
    import Game2048 from '../components/Game2048.vue'
    export default {
      name:'GameView',
      components:{
        Game2048
      }
    }
</script>
<style lang="less" scoped>
</style>