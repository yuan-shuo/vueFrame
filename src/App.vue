<template>
  <div class="bjimg">
    <div class="box-left">
      <img :src="headImg" class="headBox">
      <div class="divLine"></div>
      <div>{{ greeting }}，{{ myname }}</div>
      <div class="time">- {{ ctime }} -</div>
    </div>
    <div class="box-mid"></div>
    <div class="box-right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headImg: require('@/assets/ori.jpg'),
      mouseImg: require('@/assets/mouse.png'),
      greeting: '早上好',
      myname: '硕',
      ctime: ''
    }
  },
  methods: {
    setTime1() {
      let time = new Date()
      let currentTime = time.getHours()
      if (currentTime >= 5 && currentTime < 11) {
        this.greeting = '早上好';
      } else if (currentTime >= 11 && currentTime < 13) {
        this.greeting = '中午好';
      } else if (currentTime >= 13 && currentTime < 18) {
        this.greeting = '下午好';
      } else {
        this.greeting = '晚上好';
      }
      let year = time.getFullYear();
      let month = time.getMonth() + 1; // 月份是从 0 开始计数的，所以需要加 1
      let day = time.getDate();
      this.ctime = year + "年" + month + "月" + day + "日"
    },
    trackMouse(event) {
      const mouse = this.$refs.mouseRef;
      mouse.style.left = event.clientX - mouse.offsetWidth / 2 + 'px';
      mouse.style.top = event.clientY - mouse.offsetHeight / 2 + 'px';
    }
  },
  created() {
    this.setTime1()
  },
}
</script>

<style>
body {
  /* font-family: 'Consolas', 'Helvetica Neue', Arial, sans-serif; */
  font-family: 'SimHei', 'Helvetica Neue', Arial, sans-serif;
  font-size: 20px;
}

.bjimg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background-image: url(assets/03.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.box-left,
.box-mid,
.box-right {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  margin: 10px;
  width: 20%;
  height: 95%;
  backdrop-filter: blur(3px);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 10px;
}

.box-left {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box-mid {
  width: 50%;
}

.box-right {
  width: 20%;
}

.headBox {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 40px;
  margin-bottom: 10px;
  border: 5px solid rgba(255, 255, 255, 0.4);
}

.divLine {
  width: 50%;
  height: 2px;
  background-color: white;
  margin: 20px;
}

.time {
  margin: 20px;
  font-size: 15px;
}
</style>
