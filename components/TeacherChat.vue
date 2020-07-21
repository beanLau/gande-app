<template>
    <div class="teacher-chat">
        <div class="sound-recording" @touchstart.stop.prevent="recStart" @touchmove="moveCb" @touchend.stop.prevent="recStop">
            <div>
                <i v-if="isRecording" class="iconfont iconzhengzailuyin" />
                <i v-else class="iconfont iconanzhuluyin" />
                <p>{{isRecording ? '正在录音':'按住录音'}}</p>
            </div>
        </div>
        <div class="record-animation" v-if="isRecording">
            <template v-if="cancelRecord">
                <i class="iconfont iconquxiaofasong" />
                <div class="record-tip">松手，取消发送</div>
            </template>
            <template v-else>
                <img src="/images/record.gif" alt="" class="record-gif">
                <div class="record-tip">录音中</div>
                <div class="record-tip">上滑取消发送</div>
            </template>
        </div>
    </div>
</template>

<script>

const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
export default {
    components: {},
    props: {
    },
    data() {
        return {
            rec: null, //录音对象Recorder实例
            isRecording: false, //是否正在录音
            cancelRecord: false, //是否取消录音
            canComit: true, //是否可提交消息，防止重复提交。
            cancelArea: null,
            moveTime: 0, //录音师鼠标滑动事件节流参数
            moveTimer: null,
            beginTime: ''
        }
    },
    created() {
		let self = this;
		recorderManager.onStop(function (res) {
      if(Date.now() - self.beginTime <= 500){
        return
      }
			self.recordLen = (Date.now() - self.recordBeginTime)/1000
			let len = parseInt(Math.floor(self.recordLen / 60));
			let mo = parseInt(self.recordLen % 60);
			if(len == 0){
				len = '00'
			}else if(len < 10){
				len = '0' + len
			}
			len += ':'
			if(mo < 10){
				mo = '0' + mo
			}
			self.audios.push({
				src: res.tempFilePath,
				len: len + mo
			})
			self.recordBeginTime = '';
			self.recordLen = 0;
		});
    },
    mounted() {
		
    },
    methods: {
        sendMsg() {
            if (!this.canComit || !this.sendMsgData) {
                return
            }
            this.canComit = false
            this.$emit("sendData", this.sendMsgData, this)
        },
        /**开始录音**/
        recStart(e) { //打开了录音后才能进行start、stop调用
            this.isRecording = true
            this.beginTime = Date.now();
            recorderManager.start();
        },
        moveCb(e) {
            let cancelArea = this.cancelArea
            let now = Date.now()
            if (this.moveTime && (now - this.moveTime) < 150) {
                if (this.moveTimer) {
                    clearTimeout(this.moveTimer)
                }
                this.moveTimer = setTimeout(() => {
                    this.moveCb(e)
                }, now - this.moveTime)
                return
            }
            this.moveTime = now
            let clientX = e.touches[0].clientX
            let clientY = e.touches[0].clientY
            if (clientY <= $(".sound-recording").offset().top - 60) {
                this.cancelRecord = true
            } else {
                this.cancelRecord = false
            }
        },
        /**结束录音**/
        recStop() {
            let _this = this
            this.isRecording = false
            recorderManager.stop();
        }
    }
}

</script>
<style lang='scss' scoped>
.teacher-chat {
  background: #fff;
  border-top: 1px solid #eee;
  .notlive-wrap {
    height: 10rem;
    line-height: 10rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 2.8rem;
    border-top: 1px solid #eee;
    .notlive-item {
      width: 25rem;
      height: 6rem;
      line-height: 6rem;
      border-radius: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconkaishizhibo {
        font-size: 2.5rem;
      }
      .notlive-label {
        margin-left: 1rem;
      }
    }
    .notice-item {
      color: #ff989f;
      border: 1px solid #ff989f;
      background: #fff;
      .iconbianjitingkexuzhi {
        font-size: 2.5rem;
      }
    }
    .begin-item {
      background: #ff989f;
      color: #fff;
    }
  }
  .bottom-btn {
    width: 100%;
    height: 10rem;
    line-height: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5rem;
    .bottom-input-wrap {
      position: relative;
      border: 1px solid #eee;
      border-radius: 3.5rem;
    }
    .send-btn {
      font-size: 3.2rem;
    }
    .smile-icon {
      font-size: 4.5rem;
      position: absolute;
      bottom: -1.6rem;
      right: 0;
      width: 8rem;
      text-align: center;
    }
  }
  .teacher-btns {
    height: 7.5rem;
    color: #ddd;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .send-pic-wrap {
      position: relative;
      z-index: 0;
      .iconjiaoshizhibo-tupian {
        font-size: 3.5rem;
      }
      .sendpic-input {
        position: absolute;
        opacity: 0;
        display: inline-block;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1;
      }
    }
    .iconfont {
      font-size: 4rem;
    }
    .stop-live-wrap {
      display: flex;
      align-content: center;
      justify-content: space-between;
      padding: 0 1.8rem;
      font-size: 2.4rem;
      width: 16rem;
      height: 4.5rem;
      line-height: 4.5rem;
      background: #ff989f;
      border-radius: 2.25rem;
      color: #fff;
      .iconfont {
        font-size: 2.5rem;
      }
    }
  }
  .icon-wrap {
    padding: 2rem 3rem;
    .teacher-icon {
      margin-right: 1rem;
      margin-bottom: 1rem;
      width: 5rem;
      height: 5rem;
    }
  }
  .notice-title {
    height: 9rem;
    line-height: 9rem;
    border-bottom: 1px solid #eee;
    padding: 0 10%;
    text-align: center;
    position: relative;
    p {
      color: #333;
      font-size: 3.2rem;
    }
    span {
      display: inline-block;
      font-size: 2.8rem;
      position: absolute;
      right: 5rem;
      top: 0;
    }
  }
  .edit-content {
    textarea {
      width: 100%;
      font-size: 2.8rem;
      color: #323233;
      padding: 4rem 3rem;
      border: 0;
    }
    textarea::placeholder{
      color: #969799;
    }
  }
  .sound-recording {
    width: 30.7rem;
    height: 15.3rem;
    position: absolute;
    bottom: 17.5rem;
    left: 50%;
    margin-left: -15.4rem;
    & > div {
      box-shadow: 0px 0px 10px 1px #ff989f;
      width: 13rem;
      height: 13rem;
      border-radius: 50%;
      text-align: center;
      margin: 0 auto;
      margin-top: 1.5rem;
      border: 0.2rem solid #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .iconfont {
        font-size: 5.2rem;
      }
      p {
        font-size: 2rem;
        margin-top: 0.3rem;
      }
    }
    .iconanzhuluyin {
      color: #ff989f;
    }
    .iconzhengzailuyin {
      color: #ff989f;
    }
    p {
      color: #ff989f;
    }
  }
  .sound-recording2 {
    & > div {
      background: linear-gradient(125deg, #ff9ba2, #ff8484);
      box-shadow: 0px 0px 10px 1px #ff989f;
    }
    .iconanzhuluyin {
      color: #fff;
    }
    .iconzhengzailuyin {
      color: #fff;
    }
    p {
      color: #fff;
    }
  }
  .sound-bottom {
    bottom: 34rem;
  }
  .record-animation {
    position: fixed;
    width: 24rem;
    height: 24rem;
    top: 50rem;
    left: 50%;
    margin-left: -12rem;
    background: #000;
    opacity: 0.6;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 3rem 0;
    font-size: 2.4rem;
    color: #fff;
    .iconquxiaofasong {
      font-size: 8rem;
    }
  }
}
</style>