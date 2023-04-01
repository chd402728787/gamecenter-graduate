<template>
  <div class="game">
    <div class="playground">
      <!--给每个行每个块分别取一个名儿-->
      <div v-for="(row, ri) in cardList" :key="`card-row-${ri}`" class="card-row">
        <div v-for="(card, i) in row" :key="`card-${i}`" class="card">
          <div :class="['card-grid', { bounce: card.value > 0 }]" :key="`card-grid-${i}-${card.value}`"
               :data-value="card.value">
            {{ card.value > 0 ? card.value : '' }}
          </div>
        </div>
      </div>
    </div>
    <!--分数和重新开始界面-->
    <div class="gameFunc">
      <br />
      <h1>score:{{ store.state.score2048 }}</h1>
      <el-button type="primary" @click="onResetGame">重新开始</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
// -- Emits
// 父组件传来的方法
const emit = defineEmits([
  'no-change',
  'point',
]);
const store = useStore();
// 主要工具
const cardChanged = ref(false);
const [direction] = useTouchSlide('.playground');//触摸移动
//通过移动方向判断下一个位置
const getNextMap = {
  1: (r, c) => () => r > 0 && cardList.value[--r][c],
  2: (r, c) => () => cardList.value[r][++c],
  3: (r, c) => () => r < 3 && cardList.value[++r][c],
  4: (r, c) => () => cardList.value[r][--c],
};
//1：上 2：右 3：下 4：左
const getLoopMap = {
  1: onSlideTop,
  2: onSlideRight,
  3: onSlideDown,
  4: onSlideLeft,
};
// 方块数组
// [[], [], [], []]
const cardList = ref([]);
// 添加数值方块
function onAddCard(cardNumber, list) {
  if (cardNumber <= 0) return;
  const indexList = list || cardList.value
    .reduce(
      (list, row, i) => list.concat(row.map((card, j) => ({
        i,
        j,
        ...card
      }))),
      [],
    )
    .filter((card) => card.value == 0);
  if (cardNumber > indexList.length) return;
  const index = Math.floor(Math.random() * indexList.length);
  const target = cardList.value[indexList[index].i][indexList[index].j];
  target.value = 2;
  indexList.splice(index, 1);
  //console.log(cardList);//查看方块数组
  return onAddCard(--cardNumber, indexList);
}
//方块移动
function onMove(direction, r, c) {
  let next;
  let card = cardList.value[r][c];
  // 如果方块存在
  if (card.value > 0) {
    const getNext = getNextMap[direction](r, c);
    next = getNext();
    // 移动
    while (next && next.value == 0) {
      next.value = card.value;
      card.value = 0;
      card = next;
      next = getNext();
      cardChanged.value = true;
    }
    // 合并
    if (next && next.value === card.value) {
      next.value *= 2;
      card.value = 0;
      cardChanged.value = true;
      store.state.score2048 += next.value;
      // 将新数值添加到方块上
      emit('point', next.value);
    }
  }
}
function onSlideRight(direction) {
  for (let r = 0; r < 4; r++) {
    for (let c = 3; c >= 0; c--) {
      onMove(direction, r, c);
    }
  }
}
function onSlideLeft(direction) {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      onMove(direction, r, c);
    }
  }
}
function onSlideTop(direction) {
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      onMove(direction, r, c);
    }
  }
}
function onSlideDown(direction) {
  for (let c = 0; c < 4; c++) {
    for (let r = 3; r >= 0; r--) {
      onMove(direction, r, c);
    }
  }
}
//重新开始游戏
function onResetGame() {
  cardList.value = Array(4).fill('').map(
    () => Array(4).fill('').map(() => ({
      value: 0
    }))
  );
  onAddCard(2);
  //console.log(store);
  let score = store.state.score2048;
  store.state.count2048++;  //记录游戏次数
  store.state.scoreAll2048 += score;//记录总分
  if (score > store.state.scoreMax2048)//记录最高分
    store.state.scoreMax2048 = score;
  store.state.score2048 = 0;    //当前分数清零
}
//方块数值变化则添加新方块，否则不变
watch(direction, (newVal) => {
  const loopFn = getLoopMap[newVal];
  if (loopFn) {
    loopFn(newVal);
    if (cardChanged.value) {
      onAddCard(1);
      cardChanged.value = false;
    } else {
      emit('no-change');
    }
  }
})
// -- 游戏初始化
onResetGame();
//移动端触摸
function useTouchSlide(selector, safeOffset = 20) {
  // 1: 上, 2: 右, 3: 下, 4: 左
  const direction = ref(0);
  let xDown = null;
  let yDown = null;
  //触摸开始
  function handleTouchStart(evt) {
    const firstTouch = (evt.touches && evt.touches[0]) || evt;
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }
  //触摸停止
  function handleTouchStop() {
    xDown = yDown = null;
    direction.value = 0;
  }
  //触摸移动
  function handleTouchMove(evt) {
    if (!xDown || !yDown) return;
    const currentTouch = (evt.touches && evt.touches[0]) || evt;
    const xUp = currentTouch.clientX;
    const yUp = currentTouch.clientY;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
    //限定触摸方向数值
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (Math.abs(xDiff) < safeOffset) return;
      direction.value = xDiff > 0 ? 4 : 2;
    } else {
      if (Math.abs(yDiff) < safeOffset) return;
      direction.value = yDiff > 0 ? 1 : 3;
    }
  }
  //初始化 添加触摸监听事件
  function init() {
    const target = document.querySelector(selector);
    target.addEventListener('touchstart', handleTouchStart, false);
    target.addEventListener('touchmove', handleTouchMove, false);
    target.addEventListener('touchend', handleTouchStop, false);
    target.addEventListener('mousedown', handleTouchStart, false);
    target.addEventListener('mousemove', handleTouchMove, false);
    target.addEventListener('mouseup', handleTouchStop, false);
    target.addEventListener('mouseleave', handleTouchStop, false);
  }
  //移除监听事件
  function destroy() {
    const target = document.querySelector(selector);
    target.removeEventListener('touchstart', handleTouchStart);
    target.removeEventListener('touchmove', handleTouchMove);
    target.removeEventListener('touchend', handleTouchStop);
    target.removeEventListener('mousedown', handleTouchStart);
    target.removeEventListener('mousemove', handleTouchMove);
    target.removeEventListener('mouseup', handleTouchStop);
  }
  onMounted(() => {
    //初始化
    init();
  })
  return [direction, destroy];
}
</script>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  name: 'game2048',
  mounted() {
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/game2048.scss';
</style>
