<template>
  <div class="game">
    <canvas id="myCanvas" width="400" height="400"></canvas>
  </div>
  <h2>手指在屏幕中上下左右滑动，点击屏幕暂停。如果撞到自己或墙，游戏结束</h2>
  <el-button type="primary" @click="reset()">重新开始</el-button>
</template>

<script>
export default {
  name: 'game',
  mounted() {
    this.xianDuan();
  },
  data() {
    return {
      form: {
        flag: '1'
      }
    };
  },
  methods: {
    reset() {

    },
    xianDuan() {
      const canvas = document.getElementById('myCanvas');
      const ctx = canvas.getContext('2d');
      const tileCount = 20;
      // 每个格子的大小，最后-2是为了美观
      const tileSize = canvas.width / tileCount - 2;

      // --------------关于蛇--------------
      // 蛇头的坐标
      let headX = 10;
      let headY = 10;

      // 构建一个蛇身
      class SnakePart {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
      }

      // 蛇身长度：初始长度为2
      let tailLength = 2;

      // 蛇的速度，随着吃越多的苹果，速度也会变得越快
      let speed = 7;

      // 存放蛇身每一块格子的坐标，等下循环一个这个数组，就能把蛇更新起来
      const snakeParts = [];

      // 改变蛇行动方向
      let inputsXVelocity = 0;
      let inputsYVelocity = 0;

      // 蛇的行动方向
      let xVelocity = 0;
      let yVelocity = 0;

      // --------------关于苹果--------------
      // 苹果的坐标
      let appleX = 5;
      let appleY = 5;

      // --------------记录分数和音效--------------
      // 记录分数
      let score = 0;

      // 音效
      // const gulpSound = new Audio("gulp.mp3");

      // -----------------------------------------
      // --------------函数：实现功能--------------
      // -----------------------------------------

      /// ////------------游戏的核心函数：运行游戏-----------/////
      // store.state.countSnake++; 记录游戏次数
      function drawGame() {
        xVelocity = inputsXVelocity;
        yVelocity = inputsYVelocity;
        // console.log("headX", headX)
        // console.log("headY", headY)

        // 更新蛇的位子：当你用按下上下左右的按键后，蛇就会动起来，因为每次蛇头的横坐标或者纵坐标都在+1，-1
        changeSnakePosition();

        // 如果游戏结束，停止循环
        const result = isGameOver();
        if (result) {
          alert('游戏结束了');
          /* store.state.scoreSnake += score;//记录总分
          if (score > store.state.scoreMaxSnake)//记录最高分
            store.state.scoreMaxSnake = score; */
          return;
        }

        // 黑色背景
        clearScreen();

        // 查看是否吃到苹果
        checkAppleCollision();

        // 画一个苹果
        drawApple();

        // 画蛇，并且把刚吃到的苹果加到蛇的身体上，并把蛇画出来
        drawSnake();

        // 画分数
        drawScore();

        // 随着吃到的苹果越多，速度也越快
        if (score > 5) {
          speed = 9;
        }
        if (score > 10) {
          speed = 11;
        }
        // 用setTimeOut（）不停的循环游戏：每隔（1000/speed）时间就更新一下游戏页面，蛇就动起来了。1000是毫秒=1秒钟
        setTimeout(drawGame, 1000 / speed);
      }

      // 在画板的右上方更新分数。分数可以用变量score。x坐标=canvas.width - 50, y坐标=10
      function drawScore() {
        ctx.fillStyle = 'white';
        ctx.font = '10px Verdana';
        ctx.fillText('score:' + score, canvas.width - 50, 10);
      }

      // 在画板上画一个黑色背景，大小就是整个画板的大小
      function clearScreen() {
        if (!canvas.getContext) return;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 400, 400);
      }

      // 画一个苹果：x坐标为appleX * tileCount，y坐标为appleY * tileCount，宽和高为tileSize
      function drawApple() {
        ctx.fillStyle = 'red';
        ctx.fillRect(
          appleX * tileCount,
          appleY * tileCount,
          tileSize,
          tileSize
        );
      }

      // 把蛇画出来：蛇身体+蛇头
      function drawSnake() {
        // 先画蛇身体
        ctx.fillStyle = 'green';
        // ctx.fillRect(snakeParts[0].x*tileCount,snakeParts[0].y*tileCount, tileSize, tileSize);
        snakeParts.forEach((item) => {
          ctx.fillRect(
            item.x * tileCount,
            item.y * tileCount,
            tileSize,
            tileSize
          );
        });

        // 把吃到的苹果加到蛇的身体上
        snakeParts.push(new SnakePart(headX, headY)); // 把新的蛇方块加到snakeParts数组的最后面
        while (snakeParts.length > tailLength) {
          snakeParts.shift(); // 如果超过了尾巴的长度，那就在snakeParts头去掉一个
        }

        // 画蛇头
        ctx.fillStyle = 'blue';
        ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
      }

      // 改变蛇头的位置
      function changeSnakePosition() {
        headX = headX + xVelocity;
        headY = headY + yVelocity;
      }

      // 查看蛇是否吃到了苹果，如果吃到苹果就随机生成新的苹果的appleX，appleY坐标
      // 如果吃到了苹果，蛇身体长度要加一，分数要加一
      function checkAppleCollision() {
        if (headX == appleX && headY == appleY) {
          {
            tailLength++;
            score++;
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
          }
        }
      }

      // 查看游戏是否结束
      function isGameOver() {
        let gameOver = false;

        if (yVelocity === 0 && xVelocity === 0) {
          return false;
        }

        // 蛇头撞到墙，那就把gameover变量改成true
        // 你需要查看蛇头是否撞到上下左右四面墙
        if (headX < 0 || headY < 0 || headX > 19 || headY > 19) {
          gameOver = true;
          return true;
        }

        // 查看蛇头是否撞到自己的身体，如果撞到，就把变量gameover变成true
        try {
          snakeParts.forEach((item) => {
            if (item.x == headX && item.y == headY) throw new Error('true');
          });
        } catch (e) {
          if (e.message == 'true') {
            gameOver = true;
            return true;
          }
        }

        // 如果游戏结束，显示 “游戏结束” 四个字
        return gameOver;
      }
      // 监听触摸事件
      const EventUtil = {
        addHandler: function (element, type, handler) {
          if (element.addEventListener) { element.addEventListener(type, handler, { passive: false }); } else if (element.attachEvent) { element.attachEvent('on' + type, handler); } else element['on' + type] = handler;
        },
        removeHandler: function (element, type, handler) {
          if (element.removeEventListener) { element.removeEventListener(type, handler, { passive: false }); } else if (element.detachEvent) { element.detachEvent('on' + type, handler); } else element['on' + type] = handler;
        },
        /**
         * 监听触摸的方向
         * @param target            要绑定监听的目标元素
         * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
         * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
         * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
         * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
         * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
         * @param notmove
         */
        listenTouchDirection: function (
          target,
          isPreventDefault,
          upCallback,
          rightCallback,
          downCallback,
          leftCallback,
          notmove
        ) {
          this.addHandler(target, 'touchstart', handleTouchEvent);
          this.addHandler(target, 'touchend', handleTouchEvent);
          this.addHandler(target, 'touchmove', handleTouchEvent);
          let startX;
          let startY;
          function handleTouchEvent(event) {
            switch (event.type) {
              case 'touchstart':
                startX = event.touches[0].pageX;
                startY = event.touches[0].pageY;
                break;
              case 'touchend':
                let spanX = event.changedTouches[0].pageX - startX;
                let spanY = event.changedTouches[0].pageY - startY;

                if (Math.abs(spanX) > Math.abs(spanY)) {
                  // 认定为水平方向滑动
                  if (spanX > 30) {
                    // 向右
                    if (rightCallback) rightCallback();
                  } else if (spanX < -30) {
                    // 向左
                    if (leftCallback) leftCallback();
                  } else if (notmove) notmove();
                } else {
                  // 认定为垂直方向滑动
                  if (spanY > 30) {
                    // 向下
                    if (downCallback) downCallback();
                  } else if (spanY < -30) {
                    // 向上
                    if (upCallback) upCallback();
                  } else if (notmove) notmove();
                }

                break;
              case 'touchmove':
                // 阻止默认行为
                if (isPreventDefault) event.preventDefault();

                break;
            }
          }
        }
      };
      // 触摸改变方向
      function up() {
        if (inputsYVelocity == 1) return;
        inputsYVelocity = -1;
        inputsXVelocity = 0;
        console.log('action:up');
      }
      function right() {
        if (inputsXVelocity == -1) return;
        inputsYVelocity = 0;
        inputsXVelocity = 1;
        console.log('action:right');
      }
      function down() {
        if (inputsYVelocity == -1) return;
        inputsYVelocity = 1;
        inputsXVelocity = 0;

        console.log('action:down');
      }
      function left() {
        if (inputsXVelocity == 1) return;
        inputsYVelocity = 0;
        inputsXVelocity = -1;

        console.log('action:left');
      }
      function not() {
        inputsYVelocity = 0;
        inputsXVelocity = 0;
      }
      // 使用的时候很简单，只需要向下面这样调用即可
      // 其中下面监听的是整个DOM
      // up, right, down, left为四个回调函数，分别处理上下左右的滑动事件
      EventUtil.listenTouchDirection(
        document,
        true,
        up,
        right,
        down,
        left,
        not
      );

      // 给键盘控制加一个监听器，当按下键盘上的上下左右的时候，会改变蛇的走位
      document.body.addEventListener('keydown', keyDown);

      function keyDown(event) {
        // 按键盘的上键
        // event.keycode这些数字都是有固定搭配的，不同数字对应不同的方向
        console.log('onepress');
        if (event.keyCode == 38 || event.keyCode == 87) {
          // 87 对应w键
          // 如果蛇正在向下移动，那就不能向上移动了
          if (inputsYVelocity == 1) return;
          inputsYVelocity = -1;
          inputsXVelocity = 0;
        }

        /// 按键盘的下键
        if (event.keyCode == 40 || event.keyCode == 83) {
          // 83 对应s键
          if (inputsYVelocity == -1) return;
          inputsYVelocity = 1;
          inputsXVelocity = 0;
        }

        /// 按键盘的左键
        if (event.keyCode == 37 || event.keyCode == 65) {
          // 65 对应a键
          if (inputsXVelocity == 1) return;
          inputsYVelocity = 0;
          inputsXVelocity = -1;
        }

        /// 按键盘的右键
        if (event.keyCode == 39 || event.keyCode == 68) {
          // 68 对应d键
          if (inputsXVelocity == -1) return;
          inputsYVelocity = 0;
          inputsXVelocity = 1;
        }
      }

      drawGame();
    }
  }
};
</script>
