<template>
  <div id="mainScreen" class=" container-lg container-md">
    <!--大标题-->
    <a href="" class="mainLogo"></a>
    <h1 class="mainTitle">简易五子棋</h1>
    <!--结果文字，对局结束后跳出-->

    <!-- 五个棋子连到一起会出现一条红色线，我们管这个红色线叫strike -->
    <div id="strike" class="strike"></div>
    <!--功能按钮-->
    <div class="fButtons">
      <input type="button" value="开始" class="start" @click="startInit()" v-show="showBefore" />
      <input type="button" value="悔棋" class="regret" @click="regret()" v-show="showIng" />
      <input type="button" value="投降" class="giveUp" @click="giveUp()" v-show="showIng" />
      <input type="button" value="重新开始" class="playAgain" @click="playAgain()" v-show="showIng" />
    </div>
    <br />
    <!--游戏主界面-->
    <div class="mainGame">
      <canvas id="goBangCanvas" ref="gbcanvas" :width="screenWidth" :height="screenHeight"></canvas>
    </div>
    <!--播放音乐-->
    <audio id="bgmusic" src="@/assets/music/gobang/麦振鸿 - 混天棋盘.mp3" autoplay="true" loop="true" controls=stopbutton
      style="display:none;"></audio>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chessMapArr: [], // 棋盘落子情况
      chessColor: ['black', 'white'], // 棋子颜色
      victory: '', // 输赢显示文本
      step: 0, // 记录当前步数
      checkMode: [ // 输赢检查方向
        [1, 0], // 水平
        [0, 1], // 竖直
        [1, 1], // 左斜线
        [1, -1] // 右斜线
      ],
      flag: false,
      img: ['@/assets/images/gobang/黑.png', '@/assets/images/白.png'],
      screenWidth: document.documentElement.clientWidth / 1.5, // 屏幕宽度
      screenHeight: document.documentElement.clientWidth / 1.5, // 屏幕高度
      history: [], // 历史记录位置
      historyVal: [], // 历史记录不被删除数组
      stepHistory: 0,
      domChess: [],
      showBefore: true,
      showIng: false,
      MusicClose: true,
      MusicOpen: false
    }
  },
  created() {
    // 打开时自适应当前屏幕
    this.windowSize();
  },
  mounted() {
    // 项目初始化
    this.gameInit();
    const gbcanvas = this.$refs.gbcanvas;
    const gbcontext = gbcanvas.getContext('2d');
    const fontpx = this.screenWidth / 15;
    // console.log(this.screenWidth, fontpx);
    // 自适应canvas文本
    gbcontext.font = '' + fontpx + 'px "微软雅黑"';
    gbcontext.fillStyle = 'white';
    gbcontext.fillText('点击按钮开始游戏', this.screenWidth / 4, this.screenHeight / 2);

    // 监听屏幕大小
    window.addEventListener('resize', e => {
      // 棋盘随最小的边进行变化棋盘，比如宽比高小，棋盘就是以宽为主的正方形
      this.windowSize();
      // 尺寸变化后重绘
      setTimeout(() => {
        this.drawBoard();
        if (this.history.length) {
          // 绘制棋盘
          this.drawBoard();
          // 重绘制棋子
          const lineWidth = this.screenWidth / 15;
          this.history.forEach(e => {
            this.drawChess(e.x * lineWidth + lineWidth / 2, e.y * lineWidth + lineWidth / 2, e.color);
            this.chessMapArr[e.x][e.y] = e.color;
          });
        }
        // 游戏结束跳出文本
        if (this.flag) { this.gameOverText(); }
      }, 300);
    })
  },

  methods: {
    // 屏幕自适应
    windowSize() {
      if (document.body.clientWidth > 1800) {
        // 防止棋盘过大
        this.screenWidth = 1800 / 1.5;
        this.screenHeight = 1800 / 1.5;
      }
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;

      console.log(clientWidth, clientHeight);
      if (clientWidth > clientHeight) {
        this.screenHeight = clientHeight / 1.5;
        this.screenWidth = this.screenHeight;
      } else {
        this.screenWidth = clientWidth / 1.5;
        this.screenHeight = this.screenWidth;
      }
    },
    // 初始化
    gameInit() {
      // console.log("初始化成功！");
      this.drawBoard();
      const audio = document.getElementById('bgmusic');
      // 开始自动放音乐
      audio.click();
      audio.play();
    },
    // 初始化棋盘数组
    chessArr() {
      for (let i = 0; i < 15; i++) {
        this.chessMapArr[i] = [];
        for (let j = 0; j < 15; j++) {
          this.chessMapArr[i][j] = 0;
        }
      }
    },
    // 绘制棋盘
    drawBoard() {
      // 初始化棋盘数组
      this.repaint();
      this.chessArr();
      const gbcanvas = this.$refs.gbcanvas;
      const gbcontext = gbcanvas.getContext('2d');
      // 绘制，五子棋标准棋盘为15×15
      gbcontext.strokeStyle = '#666';
      for (let i = 0; i < 15; i++) {
        // //canvas宽高为900
        // gbcontext.moveTo(30 + i * 60, 30);
        // gbcontext.lineTo(30 + i * 60, gbcanvas.height - 30);
        // gbcontext.stroke();
        // gbcontext.moveTo(30, 30 + i * 60);
        // gbcontext.lineTo(gbcanvas.width - 30, 30 + i * 60);
        // gbcontext.stroke();
        // 实现canvas适应盒子大小变化
        const lineWidth = this.screenWidth / 15;
        const lineHeight = lineWidth;
        gbcontext.moveTo(lineWidth / 2 + i * lineWidth, lineWidth / 2);
        gbcontext.lineTo(lineHeight / 2 + i * lineHeight, gbcanvas.height - lineHeight / 2);
        gbcontext.stroke();
        gbcontext.moveTo(lineHeight / 2, lineHeight / 2 + i * lineHeight);
        gbcontext.lineTo(gbcanvas.width - lineWidth / 2, lineWidth / 2 + i * lineWidth);
        gbcontext.stroke();
      }
    },
    // 绘制棋子
    drawChess(x, y, color) {
      const gbcanvas = this.$refs.gbcanvas;
      const context = gbcanvas.getContext('2d');
      // 变立体
      // let grd = context.createRadialGradient(x, y, this.screenWidth / 15 / 6, x, y, this.screenWidth / 15 / 2);
      // grd.addColorStop(0, color == "white" ? "black" : "#4c4c4c");
      // grd.addColorStop(1, color == "white" ? "#dadada" : "#000");
      context.beginPath();
      context.arc(x, y, this.screenWidth / 15 / 2, 0, Math.PI * 4, false);
      context.closePath();
      context.fillStyle = color;
      context.fill();
    },
    // 开始
    startInit() {
      this.drawBoard();
      const gbcanvas = this.$refs.gbcanvas;
      this.showBefore = false;
      this.showIng = true;
      // 给canvas添加点击监听事件
      gbcanvas.addEventListener('click', e => {
        if (this.flag == true) {
          alert('游戏结束,请重新开始~');
          return;
          // this.playAgain();
        }
        // 判断点击范围是否越出棋盘
        if (e.offsetx < 30 || e.offsetx > 900 || e.offsetY < 10 || e.offsetY > 900) {
          return;
        }

        const lineWidth = this.screenWidth / 15;
        // 给棋子限定落子范围
        const x = Math.floor(e.offsetX / lineWidth);
        const y = Math.floor(e.offsetY / lineWidth);
        // 添加落子音效
        const clickSound = new Audio('@/assets/music/gobang落子.wav');
        // console.log('this.chessMapArr 数组', this.chessMapArr)
        if (this.chessMapArr[x][y] == 0) {
          // 落子位置和颜色
          console.log('落下棋子', x, y, this.chessColor[this.step % 2]);
          // 落子
          this.drawChess(x * lineWidth + lineWidth / 2, y * lineWidth + lineWidth / 2, this.chessColor[this.step % 2]);
          this.chessMapArr[x][y] = this.chessColor[this.step % 2];
          // 播放下棋音效
          clickSound.play();
          // 历史记录位置
          this.history.length = this.step;
          this.history.push({
            x,
            y,
            color: this.chessColor[this.step % 2]
          });
          this.stepHistory++;
          // 检查是否赢得游戏
          for (let i = 0; i < 4; i++) {
            this.checkWin(x, y, this.chessColor[this.step % 2], this.checkMode[i]);
          }
          // 更换下棋方
          this.step++;
        } else if (this.chessMapArr[x][y] != 0) {
          alert('已有棋子！')
        }
      })
    },
    // 悔棋
    regret() {
      if (this.history.length && !this.flag) {
        this.history.pop(); // 删除数组最后一项
        // 绘制棋盘
        this.drawBoard();
        // 绘制棋子
        const lineWidth = this.screenWidth / 15;
        this.history.forEach(e => {
          this.drawChess(e.x * lineWidth + lineWidth / 2, e.y * lineWidth + lineWidth / 2, e.color)
          this.chessMapArr[e.x][e.y] = e.color;
        });
        this.step--;
      } else {
        alert('已经不能悔棋了~')
      }
    },
    // 投降
    giveUp() {
      if (this.step > 0) {
        if (this.chessColor[this.step % 2] == 'black') { this.victory = '白子棋方胜利！'; } else { this.victory = '黑子棋方胜利！'; }
        this.flag = true;
        this.gameOverText();
      }
    },
    // 重新开始
    playAgain() {
      this.drawBoard();
      this.flag = false;
      this.step = 0;
      this.victory = '';
    },
    // 重画
    repaint() {
      const gbcanvas = this.$refs.gbcanvas;
      const context = gbcanvas.getContext('2d');
      context.fillStyle = 'bisque';
      context.fillRect(0, 0, gbcanvas.width, gbcanvas.height);
      context.beginPath();
      context.closePath();
    },
    // 胜负判断
    checkWin(x, y, color, mode) {
      let count = 1; // 记录
      // 判断棋子的水平竖直斜上斜下方向是否相同 相同则count加一 count>=5时游戏结束
      for (let i = 1; i < 5; i++) {
        if (this.chessMapArr[x + i * mode[0]]) {
          if (this.chessMapArr[x + i * mode[0]][y + i * mode[1]] == color) {
            count++;
          } else break;
        }
      }

      for (let j = 1; j < 5; j++) {
        if (this.chessMapArr[x - j * mode[0]]) {
          if (this.chessMapArr[x - j * mode[0]][y - j * mode[1]] == color) {
            count++;
          } else {
            break;
          }
        }
      }
      if (count >= 5) {
        if (color == 'black') {
          this.victory = '黑子棋方胜利！';
        } else {
          this.victory = '白子棋方胜利！';
        }
        // 游戏结束
        // console.log('游戏结束')
        this.gameOverText();
        const gameOverMusic = new Audio('@/assets/music/gobang/游戏胜利音效.mp3');
        gameOverMusic.play();
        this.flag = true;
      }
    },
    // 游戏结束文本
    gameOverText() {
      const gbcanvas = this.$refs.gbcanvas;
      const gbcontext = gbcanvas.getContext('2d');
      const fontpx = this.screenWidth / 12;
      console.log(this.screenWidth, fontpx);
      gbcontext.font = '' + fontpx + 'px "微软雅黑"';
      gbcontext.fillStyle = 'white';
      gbcontext.fillText(this.victory, this.screenWidth / 4, this.screenHeight / 2);
      gbcontext.font = '' + fontpx / 1.6 + 'px "微软雅黑"';
      gbcontext.fillStyle = 'red';
      gbcontext.fillText('点击上方按钮重新开始', this.screenWidth / 4, this.screenHeight / 2 + this.screenHeight / 10);
    },
    // 关闭音乐
    closeMusic() {
      const audio = document.getElementById('bgmusic');
      audio.pause();
      this.MusicClose = false;
      this.MusicOpen = true;
    },
    // 打开音乐
    openMusic() {
      const audio = document.getElementById('bgmusic');
      audio.play();
      this.MusicClose = true;
      this.MusicOpen = false;
    }
  }
}
</script>
<style>
.mainTitle {
  text-align: center;
}

#mainScreen {
  margin: 0;
  padding: 0;
  background-size: cover;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.start,
.regret,
.giveUp,
.playAgain,
.closeMusic,
.openMusic {
  background: bisque;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  width: 100px;
  margin-left: 15px;
  margin-right: 15px;
}
</style>
