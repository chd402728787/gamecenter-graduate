<template>
  <div class="wrapper">
    <div class="header">
      <h1 class="title">2048</h1>
      <div class="score">
        <div>
          <span>SCORE</span>
          <span class="num">{{score}}</span>
        </div>
      </div>
    </div>
    <el-button class="btn btn-mg" @click="newGame">新游戏</el-button>
    <div>
      <div class="over" v-if="over">
        <p>Game over!</p>
        <div class="btn" @click="newGame">Try again</div>
      </div>
      <div class="box">
        <div class="row" v-for="row in list">
          <div class="col" :class="'n-'+col" v-for="col in row">{{col}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 4,
      score: 0,
      list: [],
      intiNum: [2, 4],
      pr: 0.9,
      over: false,
      direction: [{
        x: 0,
        y: -1
      }, {
        x: 0,
        y: 1
      }, {
        x: -1,
        y: 0
      }, {
        x: 1,
        y: 0
      }]
    }
  },
  mounted() {
    //初始化数组
    this.init()
  },
  methods: {
    init() {
      this.newGame()
      document.addEventListener('keyup', this.keyDown)
    },
    newGame() {
      this.score = 0
      this.over = false
      this.list = Array.from(Array(this.size)).map(() => Array(this.size).fill(undefined))
      this.setRandom()
    },
    //插入新格子
    setRandom() {
      if (this.hasAvailableCells()) {
        let [x, y] = this.randomAvailableCells()
        this.list[x][y] = this.randomValue()
      }
    },
    //获取数值
    randomValue() {
      return Math.random() < this.pr ? this.intiNum[0] : this.intiNum[1]
    },
    //获取随机一个空格子坐标
    randomAvailableCells() {
      let cells = this.availableCells()
      if (cells.length) {
        return cells[Math.floor(Math.random() * cells.length)]
      }
    },
    //所有空格子的坐标
    availableCells() {
      let cells = []
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (!this.list[i][j]) {
            cells.push([i, j])
          }
        }
      }
      return cells
    },
    //是否存在空格子
    hasAvailableCells() {
      return !!this.availableCells().length
    },
    hasMergedCells() {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          let cell = this.list[i][j]
          if (cell) {
            for (let dir = 0; dir < 4; dir++) {
              let vector = this.direction[dir]
              if (this.withinBounds(i + vector.x, j + vector.y)) {
                let other = this.list[i + vector.x][j + vector.y]
                if (other && other === cell) {
                  return true
                }
              }
            }
          }
        }
      }
      return false
    },
    withinBounds(x, y) {
      return x > 0 && y > 0 && x < this.size && y < this.size
    },
    isAvailable() {
      return this.hasAvailableCells() || this.hasMergedCells()
    },
    //获取0-n的随机数
    randomNum(index) {
      return Math.floor(Math.random() * index)
    },
    //键盘监听事件
    keyDown(e) {
      let arr = null
      switch (e.keyCode) {
        case 38: //上
          this.move(1)
          break
        case 40: //下
          this.move(3)
          break
        case 37: //左
          this.move(0)
          break
        case 39: //右
          this.move(2)
          break
      }
      this.setRandom()
    },
    //移动算法，i表示旋转次数
    move(i) {
      let arr = this.rotate(Array.from(this.list), i).map((item, index) => {
        return this.moveLeft(item)
      })
      this.list = this.rotate(arr, this.size - i)
      this.setLocalstorage()
      if (!this.isAvailable()) {
        this.over = true
      }
    },
    //单行左移
    moveLeft(list) {
      let _list = [] //当前行非空格子
      let flg = false
      for (let i = 0; i < this.size; i++) {
        if (list[i]) {
          _list.push({
            x: i,
            merged: false,
            value: list[i]
          })
        }
      }
      _list.forEach(item => {
        let farthest = this.farthestPosition(list, item)
        let next = list[farthest - 1]
        if (next && next === item.value && !_list[farthest - 1].merged) {
          //合并
          list[farthest - 1] = next * 2
          list[item.x] = undefined
          item = {
            x: farthest - 1,
            merged: true,
            value: next * 2
          }
          this.score += next * 2
        } else {
          if (farthest != item.x) {
            list[farthest] = item.value
            list[item.x] = undefined
            item.x = farthest
          }
        }
      })
      return list
    },
    //逆时针旋转
    rotate(arr, n) {
      n = n % 4
      if (n === 0) return arr
      let tmp = Array.from(Array(this.size)).map(() => Array(this.size).fill(undefined))
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          tmp[this.size - 1 - i][j] = arr[j][i]
        }
      }
      if (n > 1) tmp = this.rotate(tmp, n - 1)
      return tmp
    },
    //左边最远空格的x位置
    farthestPosition(list, cell) {
      let farthest = cell.x
      while (farthest > 0 && !list[farthest - 1]) {
        farthest = farthest - 1
      }
      return farthest
    }
  }
}

</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .header {
    width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #2C3E50;
    .title {
      font-size: 60px;
    }
    .score {
      display: flex;
      justify-content: space-between;
      height: 80px;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-left: 5px;
        padding-right: 5px;
        border-radius: 5px;
        background: #2C3E50;
        .num {
          font-size: 25px;
          font-weight: bold;
          color: #2C3E50;
        }
        &:last-child {
          margin-left: 5px;
        }
      }
    }
  }
  .over {
    position: absolute;
    width: 400px;
    height: 400px;
    background: rgba(238, 228, 218, 0.73);
    z-index: 1000;
    border-radius: 5px;
    text-align: center;
    color: #ffd04b;
    p {
      font-size: 60px;
      font-weight: bold;
      height: 60px;
      line-height: 60px;
    }
  }
  .btn {
    display: inline-block;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    color: #ffd04b;
    background: #2C3E50;
    &.btn-mg {
      margin-bottom: 10px;
    }
  }
  .box {
    width: 400px;
    height: 400px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 5px;
    background: #2C3E50;
    .row {
      width: 100%;
      height: 23%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .col {
        width: 23%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        border-radius: 3px;
        background: #cec1b3;
        &.n-2 {
          background: #f8f3e8;
        }
        &.n-4 {
          background: #ede0c8;
        }

        &.n-8 {
          background: #f26179;
        }
        &.n-16 {
          background: #f59563;
        }
        &.n-32 {
          background: #f67c5f;
        }
        &.n-64 {
          background: #f65e36;
        }
        &.n-128 {
          background: #edcf72;
        }
        &.n-256 {
          background: #edcc61;
        }
        &.n-512 {
          background: #9c0;
        }
        &.n-1024 {
          background: #3365a5;
        }
        &.n-2048 {
          background: #09c;
        }
        &.n-4096 {
          background: #a6bc;
        }
        &.n-8192 {
          background: #93c;
        }
      }
    }
  }
}

</style>
