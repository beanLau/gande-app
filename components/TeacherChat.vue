<template>
    <div class="teacher-chat">
		<div class="record-animation" v-if="isRecording">
		    <template v-if="cancelRecord">
		        <image src="/static/cancel.png" mode="" class="record-gif"></image>
		        <div class="record-tip">松手，取消发送</div>
		    </template>
		    <template v-else>
				<image src="/static/record.gif" mode="" class="record-gif"></image>
		        <div class="record-tip">录音中</div>
		        <div class="record-tip">上滑取消发送</div>
		    </template>
		</div>
        <div class="sound-recording" @touchstart.stop.prevent="recStart" @touchmove="moveCb" @touchend.stop.prevent="recStop">
            <div class="recording-style">
				<image v-if="isRecording" src="/static/anzhuing.png" mode="" class="recording-icon"></image>
				<image v-else src="/static/anzhu.png" mode="" class="recording-icon"></image>
				<view class="recording-title">
					{{isRecording ? '正在录音':'按住录音'}}
				</view>
            </div>
        </div>
    </div>
</template>

<script>

const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = false;
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
            beginTime: '',
			beginTop: 0,
			currentTop: 0,
			userinfo: {
				
			}
        }
    },
    created() {
		let self = this;
		let userinfo = uni.getStorageSync("userinfo")
		if(userinfo){
			userinfo = JSON.parse(userinfo)
			this.userinfo = userinfo
		}
		recorderManager.onStop(function (res) {
			if(Date.now() - self.beginTime <= 500){
				return
			}
			if(self.cancelRecord){
				return
			}
			innerAudioContext.src = res.tempFilePath
			// console.log(innerAudioContext.duration)
			// self.recordLen = (Date.now() - self.beginTime)/1000
			// let len = parseInt(Math.floor(self.recordLen / 60));
			// let mo = parseInt(self.recordLen % 60);
			// if(len == 0){
			// 	len = '00'
			// }else if(len < 10){
			// 	len = '0' + len
			// }
			// len += ':'
			// if(mo < 10){
			// 	mo = '0' + mo
			// }
			let formData = {
				'folder': self.userinfo.UserId
			}
			uni.uploadFile({
				url: 'http://116.131.134.198:9001/PublicInfoManage/ResourceFile/UploadFolderFile',
				filePath: res.tempFilePath,
				name: 'File',
				formData: formData,
				header: {
					"token": uni.getStorageSync("token")
				},
				success: (uploadFileRes) => {
					try{
						let data,url;
						if (uploadFileRes.statusCode === 200) {
							data = JSON.parse(uploadFileRes.data)
							url = 'http://116.131.134.198:9001/' + data.resultdata
							url = url.replace(';','')
							self.$emit("sendData", {
								src: url,
								len: ''
							})
						}
					}catch(e){
						//TODO handle the exception
					}
				}
			});
			// self.audios.push({
			// 	src: res.tempFilePath,
			// 	len: len + mo
			// })
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
			this.cancelRecord = false
            this.beginTime = Date.now();
			this.beginTop = e.touches[0].clientY
            recorderManager.start();
        },
        moveCb(e) {
			let currentTop = e.touches[0].clientY;
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
            if (this.beginTop - currentTop >= 60) {
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
	z-index: 9;
	position: fixed;
	bottom: 0;
	width: 100%;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.sound-recording{
	position: absolute;
	left: 50%;
	bottom: 10px;
	transform: translateX(-50%);
}
.recording-style{
	width: 220rpx;
	height: 220rpx;
	border-radius: 110rpx;
	border: 1px solid #D4091C;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.recording-icon{
	width: 100rpx;
	height: 100rpx;
}
.recording-title{
	margin-top: 20rpx;
	text-align: center;
	color: #666666;
}
.record-animation {
	margin-bottom: 400rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: #fff;
 }
.record-gif{
  width: 150rpx;
  height: 150rpx;
}
.record-tip{
  color: #666666;
  text-align: center;
}
</style>