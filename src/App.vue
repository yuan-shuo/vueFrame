<template>
  <div class="bjimg">
    <div class="box-left">
      <img :src="headImg" class="headBox">
      <div class="divLine1"></div>
      <div>{{ greeting }}，{{ myname }}</div>
      <div class="time">- {{ ctime }} -</div>
    </div>
    <div class="box-mid">
      <!-- AI接口 -->
      <div class="mesBox">
        <div :class="item.role === 'assistant' ? 'talka' : 'talku'" v-for="(item, index) in talkList" :key=index>
          {{ item.role }}：{{ item.content }}
        </div>
        <div class="talka" v-if="awaiting">assistant：功能暂时禁用捏~</div>
        <!-- <div>{{ talkList }}</div> -->
      </div>
      <div class="divLine2"></div>
      <div class="inputBox">
        <!-- 输入框 -->
        <input class="textBox" type="text" v-model="intext" placeholder="想写些什么呢~">

        <!-- 提交按钮 -->
        <img :src="btnImg" @click="postText" class="btnInput">
      </div>
    </div>
    <div class="box-right">
      <div class="bookTitle">- 记事 -</div>
      <!-- debug -->
      <!-- <div>{{titlef}} {{keyf}} {{mesf}}</div> -->
      <!-- <div>{{ wordList }}</div> -->
      <div class="board">
        <div class="tc-container" v-for="(item, index) in wordList" :key="index">
          <tc :title="item.title" :mes="item.message_content" :date="item.date"></tc>
        </div>
      </div>
      <button @click="showForm" class="btnMes">+</button>
    </div>
    <div :class="{ 'inputForm': true, 'active': formOn }" v-if="formOn">
      <div class="headf">
        <textarea class="titlef ovf" placeholder="标题" v-model="titlef"></textarea>
        <textarea class="titlef passf ovf" placeholder="myKey" v-model="keyf"></textarea>
        <button class="btnf" @click="delForm">×</button>
      </div>
      <textarea class="bodyf ovf" placeholder="写点什么好呢" v-model="mesf"></textarea>
      <button class="subBtn" @click="leaveWord">Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import tc from '@/components/textCard.vue'
export default {
  data() {
    return {
      headImg: require('@/assets/ori.jpg'),
      mouseImg: require('@/assets/mouse.png'),
      btnImg: require('@/assets/send.png'),
      greeting: '早上好',
      myname: '硕',
      ctime: '',
      intext: '',
      talkList: [],
      awaiting: false,
      formOn: false,
      titlef: '',
      keyf: '',
      mesf: '',
      wordList: [],
    }
  },
  methods: {
    postText() {
      if (this.intext !== '') {
        console.log(this.intext)
        this.talkList.push({
          'role': 'user', 'content': this.intext
        })
        this.awaiting = true
        const messages = encodeURIComponent(JSON.stringify(this.talkList));
        axios.get(`API/copilot/?messages=${messages}`).then(res => {
          // console.log(res)
          // console.log(res.data.choices[0].message.content)
          this.talkList.push({
            'role': 'assistant', 'content': res.data.choices[0].message.content
          })
          this.awaiting = false
        }).catch(error => {
          console.log(error)
        })
        this.intext = ''
      } else {
        console.log("空的")
      }
    },
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
    showForm() {
      this.formOn = true
    },
    delForm() {
      const closeIf = this.showIf("确定关闭吗？")
      if (closeIf) {
        this.formOn = false
        this.titlef = ''
        this.keyf = ''
        this.mesf = ''
      }
    },
    leaveWord() {
      if (this.keyf == 'yu') {
        const postIf = this.showIf("确定提交吗？")
        if (postIf) {
          const postData = {
          title: this.titlef,
          content: this.mesf,
          name: 'test'
        }
        axios.post('https://yuanshuo.pythonanywhere.com/api/lw', postData)
        .then(()=>{
          console.log("留言成功！")
        })
        .catch(()=>{
          console.log("好像没成555~")
        })
        this.formOn = false
        }
      } else {
        this.showIf("抱歉喵，myKey没有写对喵，可以问问硕是什么喵")
      }
      
    },
    getWord() {
      axios.get('https://yuanshuo.pythonanywhere.com/api/gw')
        .then((res)=>{
          console.log(res)
          this.wordList = res.data
        })
        .catch((error)=>{
          console.log(error)
        })
    },
    showIf(str) {
      const confirmed = confirm(str)
      if (confirmed) {
        return true
      } else {
        return false
      }
    },
  },
  created() {
    this.setTime1()
    this.getWord()
  },
  components: {
    tc
  }
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

.divLine1 {
  width: 50%;
  height: 2px;
  background-color: white;
  margin: 20px;
}

.divLine2 {
  width: 90%;
  height: 2px;
  background-color: white;
  margin-top: 6px;
}

.time {
  margin: 20px;
  font-size: 15px;
}

.box-mid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.mesBox {
  width: 95%;
  height: 85%;
  display: flex;
  flex-direction: column;
  /* align-self: start; */
  align-items: center;
  /* background-color: aqua; */
  margin: 15px;
  border-radius: 20px;
  border: rgba(255, 255, 255, 0.8) dashed 2px;
  overflow: auto;
}

.mesBox::-webkit-scrollbar {
  display: none;
}

.talka,
.talku {
  width: 90%;
  height: auto;
  border-radius: 10px;
  margin: 10px;
  padding-left: 15px;
  padding-right: 15px;
  padding: 10px;
}

.talka {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-bottom: white solid 2px;
}

.talku {
  background-color: rgba(255, 255, 255, 0.6);
  border-bottom: black solid 2px;
}

.inputBox {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
}

.textBox {
  width: 85%;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.3);
  /* opacity: 0.2; */
  border-radius: 30px;
  border: none;
  outline: none;
  margin: 15px;
  margin-right: 0x;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 15px;
}

.textBox::placeholder {
  color: rgba(250, 116, 138, 0.795);
  font-weight: 600;
}

.btnInput {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
  margin: 15px;
  margin-left: 0;
  padding: 2px;
  transition: background-color 0.5s;
}

.btnInput:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.btnInput:active {
  background-color: rgba(255, 255, 255);
}

.board {
  position: absolute;
  width: 100%;
  height: 93%;
  /* border: #ff0303 solid 1px; */
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.board::-webkit-scrollbar {
  display: none;
}

.btnMes {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border: none;
  font-size: 24px;
  font-weight: 500;
  border-radius: 50%;
  background-color: white;
  margin: 15px;
  margin-left: 15px;
  padding: 2px;
  transition: background-color 0.5s;
}

.btnMes:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.btnMes:active {
  background-color: rgba(255, 255, 255);
}
.bookTitle {
  margin: 10px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.inputForm {
  position: absolute;
  background-color: rgb(255, 255, 255);
  width:500px;
  height: 350px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 10px;
}
.headf {
  display: flex;
  flex-direction: row;
  /* background-color: #6d6d6d79; */
  height: 10%;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}
.titlef {
  width: 85%;
  height: 60%;
  background-color:rgba(198, 198, 198, 0.3);
  /* opacity: 0.2; */
  border-radius: 30px;
  border: none;
  outline: none;
  padding-top: 5px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 15px;
  margin: 10px;
}

.titlef::placeholder {
  color: rgba(250, 116, 138, 0.795);
  font-weight: 600;
}
.btnf {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  font-size: 24px;
  font-weight: 500;
  color: white;
  border-radius: 50%;
  background-color: pink;
  /* margin: 15px;
  margin-left: 15px;
  padding: 2px; */
  transition: background-color 0.5s;
}

.btnf:hover {
  background-color: rgba(42, 218, 245, 0.71);;
}

.btnf:active {
  background-color: rgba(255, 192, 203, 0.87);
}
.bodyf {
  width: 90%;
  height: 85%;
  background-color:rgba(198, 198, 198, 0.3);
  /* opacity: 0.2; */
  border-radius: 30px;
  border: none;
  outline: none;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 15px;
  margin: 10px;
  margin-bottom: 20px;
  text-indent: 1em;
}

.bodyf::placeholder {
  color: rgba(250, 116, 138, 0.795);
  font-weight: 600;
}
.ovf {
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-size: 15px;
  font-weight: 500;
}
.ovf::-webkit-scrollbar {
  display: none;
}
textarea {
  resize: none;
}
.subBtn {
  background-color: pink;
  border: none;
  border-radius: 15px;
  margin-bottom: 15px;
  font-size: 15px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 25px;
  transition: background-color 0.5s;
}
.subBtn:hover {
  background-color: rgba(42, 218, 245, 0.71);
}

.subBtn:active {
  background-color: rgba(255, 192, 203, 0.87);
}
.inputForm {
  /* 初始状态 */
  opacity: 0;
  transition: opacity 0.3s ease-in-out; /* 设置过渡效果 */
}

.inputForm.active {
  /* 激活状态 */
  opacity: 1;
}
.tc-container {
  width: 300px; /* 设置每个 tc-container 的宽度 */
}
</style>
