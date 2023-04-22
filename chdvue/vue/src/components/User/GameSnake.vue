<template>
  <div class="can">
    <!-- 游戏界面 -->
    <div class="content" v-if="show">
      <div class="snake-grassland">
        <div
          class="snake"
          v-for="(item, index) in snake"
          :key="`snake${index}`"
          :style="location(item.x, item.y)"
        ></div>
        <div
          class="food"
          v-for="(item, index) in foods"
          :key="`food${index}`"
          :style="location(item.x, item.y)"
        ></div>
      </div>
      <div class="right">
        <div class="content-title">
          <div class="score">得分：{{ score }}</div>
        </div>
        <div class="button">
          <el-button @click="stopGame" type="warning">暂停游戏</el-button>
          <el-button type="primary" @click="continueGame">继续游戏</el-button>
        </div>
      </div>
      <!-- 结束面板 -->
      <div class="fail" v-if="showFail">
        <div class="fail-title">游戏结束!</div>
        <div class="total-score">score:{{ score }}</div>
        <br />
        <el-button @click="reStart">重新开始</el-button>
        <el-button @click="exitGame">退出游戏</el-button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  // snake-grassland 50*50的格子
  data() {
    return {
      score: 0, // 得分
      show: true,
      showFail: false,
      foods: [],
      direction: 3, //初始方向向右
      timer: null,
      snake: [
        { x: 0, y: 0 }, //蛇尾
        { x: 1, y: 0 },
        { x: 2, y: 0 }, //蛇头
      ], //(x, y) 组成蛇的每一块儿的位置
      xStep: 1,
      yStep: 1,
    };
  },
  computed: {

  },
  created() {
    // 随机生成3个食物
    this.active()
    this.foods = this.generateFoods(3);
  },
  mounted() {
    window.addEventListener("keyup", (event) => {
      // event.key = ArrowUp 上
      switch (event.key) {
        case "ArrowUp":
          this.direction = 0;
          this.snakeMove();
          break;
        case "ArrowDown":
          this.direction = 1;
          this.snakeMove();
          break;
        case "ArrowLeft":
          this.direction = 2;
          this.snakeMove();
          break;
        case "ArrowRight":
          this.direction = 3;
          this.snakeMove();
          break;
        default:
          break;
      }
    });
  },
  methods: {
    // 暂停游戏
    stopGame() {
      clearInterval(this.timer); //清除了定时器
      this.timer = null; //清除了timer的内存占用
    },
    //继续游戏
    continueGame() {
      this.timer = setInterval(() => {
        this.snakeMove();
      }, 200);
    },

    // 重新开始
    reStart() {
      this.showFail = false;

      this.snake = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ]; //(x, y) 组成蛇的每一块儿的位置
      this.foods = this.generateFoods(3);
      this.direction = 3;
      this.score = 0;
      this.timer = setInterval(() => {
        this.snakeMove();
      }, 200);
    },
    //退出游戏
    exitGame() {
      this.$router.go(-1);
    },
    //碰撞检测是否吃到食物
    isEat() {
      // 小蛇移动就是除头部以外的部分向前移动一个身位,即前一个状态的最后一个身位丢弃
      let head = this.snake[this.snake.length - 1];
      let isEat = false;
      // 消除吃掉的食物
      this.foods = this.foods.filter((food) => {
        if (head.x === food.x && head.y === food.y) {
          isEat = true;
          this.eat(); // 加长蛇身
          //碰撞一次加10分
          this.score = this.score + 10;
          return false;
        }
        return true;
      });
      // 添加一个新食物，使食物总量保持不变
      if (isEat) {
        this.foods.push(...this.generateFoods(1));
      }
    },
    // 吃食物
    eat() {
      let tail = this.snake[0];
      let xStep = 0,
        yStep = 0;

      if (this.direction === 0) {
        yStep = -1;
      } else if (this.direction === 1) {
        yStep = 1;
      } else if (this.direction === 2) {
        xStep = -1;
      } else if (this.direction === 3) {
        xStep = 1;
      }
      //添加到数组的开头
      this.snake.unshift({ x: tail.x - xStep, y: tail.y - yStep });
    },
    // 开始游戏
    active() {
      this.show = true;
      this.snake = [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
      ]; //(x, y) 组成蛇的每一块儿的位置
        this.foods = this.generateFoods(3);
        this.direction = 3;
        this.timer = setInterval(() => {
          this.snakeMove();
        }, 200);
    },

    // 随机生成食物
    generateFoods(total) {
      const foods = [];
      for (let i = 0; i < total; i++) {
        //食物的随机x轴坐标，也就是第几行
        const foodX = Math.floor(Math.random() * 50);
        //食物的随机x轴坐标，也就是第几列
        const foodY = Math.floor(Math.random() * 50);
        foods.push({ x: foodX, y: foodY });
      }
      return foods;
    },
    // 获取位置
    location(x, y) {
      return {
        left: x * 10 + "px",
        top: y * 10 + "px",
      };
    },
    //蛇开始动 判断是否超出界限 head表示贪吃蛇的头部，当头部超过地图的范围时
    //先获取下一步数据，坐标值，判断坐标值是否非法，如果不非法就可以动了
    move(xStep, yStep) {
      //定义蛇的头部位置
      let head = this.snake[this.snake.length - 1];
      //需要监听蛇头的方向而且判断
      if (
        (this.direction == 2 && head.x <= 0) ||
        (this.direction == 0 && head.y <= 0) ||
        (this.direction == 3 && head.x >= 49) ||
        (this.direction == 1 && head.y >= 49)
      ) {
        clearInterval(this.timer);
        this.timer = null;
        this.endGame();
      }  else {
        this.snake.push({ x: head.x + xStep, y: head.y + yStep });
        this.snake.shift();
      }

    },
    //结束游戏
    endGame() {
      this.showFail = true;
    },
    // 改变方向
    changeDirection(direction) {
      this.direction = direction;
      this.snakeMove();
    },
    // 控制蛇的方向
    snakeMove() {
      switch (this.direction) {
        case 0: // 上  网上移动就是列的改变，列减1行
          this.move(0, -1);
          break;
        case 1: // 下
          this.move(0, 1);
          break;
        case 2: // 左
          this.move(-1, 0);
          break;
        case 3: // 右
          this.move(1, 0);
          break;
        default:
          break;
      }
      this.isEat();
    },
  },
};
</script>
<style scope="lang">
.can {
  height: 500px;
}
.content {
  width: 750px;
  height: 500px;
  position: relative;
  border: 1px solid gainsboro;
  display: flex;
}
.snake-grassland {
  position: relative;
  background-color: #2C3E50;
  width: 500px;
  height: 500px;
}
.snake-grassland .snake {
  position: absolute;
  border: 1px solid #ccc;
  box-sizing: border-box;
  width: 10px;
  height: 10px;
}
.score{
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.snake-grassland .food {
  background-color: red;
  position: absolute;
  border: 1px solid #ccc;
  box-sizing: border-box;
  width: 10px;
  height: 10px;
}
.right {
  position: absolute;
  width: 200px;
  margin: 150px 500px;
  text-align: left;
  padding: 10px;
}
.button {
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0;
}
.fail {
  position: absolute;
  width: 400px;
  height: 300px;
  background-color: rgb(207, 202, 224);
  top: 150px;
  left: 50px;
  border: 1px solid black;
  border-radius: 25px;
}
.fail-title {
  margin: 20px auto;
  font-size: 28px;
  font-weight: bold;
}
.total-score {
  margin: 40px auto 20px;
  font-size: 28px;
  font-weight: bold;
}
</style>

