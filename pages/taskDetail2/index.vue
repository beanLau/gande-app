<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="完成情况"></uni-nav-bar>
		</view>
		<view class="tui-pro-item tui-flex-list" hover-class="hover" :hover-start-time="150">
			<view class="item-top">
				<tui-tag margin="0 15upx 0 0" padding="8rpx" type="danger" size="24rpx">任务</tui-tag>
				<view>甘德县政府工作报告准时发布</view>
			</view>
			<view class="bottom-wrap">
				<view class="bottom-left">
					<tui-tag padding="8rpx" size="24rpx" type="light-blue">
						<tui-icon name="about" :size="10" color="#4B8AFC"></tui-icon>
						<text>紧急</text>
					</tui-tag>
					<tui-tag margin="0 15upx" padding="8rpx" type="light-orange" size="24rpx">扶贫</tui-tag>
					<view class="bottom-time">
						县政府  2020-06-01
					</view>
				</view>
				<view class="item-status">
					待处理
				</view>
			</view>
			<view class="item-desc">
				2019年是新中国70华诞，是决胜全面建成小康社会的关键之年。一年来，我们始终坚持以习近平新时代中国特色社会主义思想为指导，坚决贯彻党的十九大、十九届历次全会精神、习近平总书记“4·13”重要讲话和中央12号文件精神，在县委、县政府及镇委的坚强领导下，践行新发展理念，推动高质量发展，较好完成了镇三届人大四次会议确定的目标任务，取得重大进展。
			</view>
		</view>
		<view class="report-content">
			<view class="report-title">柯曲镇任务汇报</view>
			<view class="group">
				<text class="group-label">汇报时间</text>
				<text class="group-value">2020-06-01</text>
			</view>
			<view class="group">
				<text class="group-label">汇报人</text>
				<text class="group-value">张倩</text>
			</view>
			<view class="group" v-if="!showReport">
				<text class="group-label">完成状态</text>
				<text class="group-value light-hight">已完结</text>
			</view>
			<view class="group" v-else>
				<text class="group-label">完成状态</text>
				<radio-group class="radio-group group-value" name="chengdu">
					<label class="tui-radio">
						<radio value="1" color="#5677fc" />未完结
					</label>
					<label class="tui-radio">
						<radio value="2" color="#5677fc" checked/>已完结
					</label>
				</radio-group>
			</view>
			
			<view class="group" v-if="!showReport">
				<text class="group-label">汇报内容</text>
				<text class="group-value">在县委、县政府及镇委的坚强领导下，践行发展理念，推动高质量发展，较好完成了镇三届人大四次会议确定的任务，取得重大进展。</text>
			</view>
			<view class="group" v-if="showReport">
				<text class="group-label">汇报内容</text>
				<view class="record-audios">
					<view class="audio-item-wrap" v-for="(audio,index) in audios">
						<view class="audio-item" :data-index="index" @click="playRecordAudio">
							<tui-icon name="about" :size="14" color="#DE1727"></tui-icon>
							<text class="audio-len">{{audio.len}}</text>
						</view>
						<view class="delete-icon" :data-index="index" @click="deleteRecordAudio">
							<tui-icon name="delete" :size="18" ></tui-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="textarea-wrap" v-if="showReport">
				<textarea placeholder-style="color:#999" placeholder="占位符字体是红色的"/>
			</view>
			<view class="tui-btn-box flex" v-if="showReport">
				<button class="tui-button-primary cancel-btn" hover-class="tui-button-hover" @click="cancelCb">取消</button>
				<button class="tui-button-primary submit-btn" hover-class="tui-button-gray_hover" @click="submit">提交</button>
			</view>
			
		</view>
		<view class="towns-list" v-if="!showReport">
			<view class="towns-title">
				完成情况
			</view>
			<view class="towns-item" v-for="(item,idx) in villageList" :key="item.name">
				<view class="towns-top">
					<text class="towns-name">{{item.name}}</text>
					<text class="towns-btn" @click="toDetail">详情</text>
				</view>
				<view class="towns-audios">
					<view class="audio-item" v-for="(audio,index) in item.audios" :data-idx="idx" :data-index="index" @click="playAudio">
						<tui-icon name="about" :size="14" color="#DE1727"></tui-icon>
						<text class="audio-len">{{audio.len}}</text>
					</view>
				</view>
				<view class="towns-bottom">
					<text class="towns-time">汇报时间 {{item.reportTime}}</text>
					<text class="towns-person">汇报人 {{item.reportName}}</text>
				</view>
			</view>
		</view>
		<view class="bottom-fix" v-if="!showReport">
			<view class="report-btn" @click="toReport">汇报</view>
			<view class="send-btn" @click="toIssue">下发</view>
		</view>
		<view class="bottom-fix" v-else>
			<view class="report-btn" @touchend="endRecord" @touchstart="beginRecord">长按开始语音汇报</view>
		</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	export default {
		data() {
			return {
				showReport: false, //是否显示提交汇报信息
				currentVillage: -1,
				currentAudioIndex: -1,
				hasPlay: false, //当前是否有音频在播放
				villageList: [{
					name: "培田古村",
					statusName: '进行中',
					reportTime: "2020-06-01",
					reportName: "张倩",
					audios: [{
						src: 'http://www.douxue.top/audio.mp3',
						isPlay: false,
						len: '00:50'
					},{
						src: 'http://www.douxue.top/audio.mp3',
						isPlay: false,
						len: '00:50'
					}]
				},{
					name: "培田古村2",
					statusName: '进行中',
					reportTime: "2020-06-01",
					reportName: "张倩",
					audios: [{
						src: 'http://www.douxue.top/audio.mp3',
						isPlay: false,
						len: '00:50'
					}]
				},{
					name: "培田古村3",
					statusName: '进行中',
					reportTime: "2020-06-01",
					reportName: "张倩",
					audios: [{
						src: 'http://www.douxue.top/audio.mp3',
						isPlay: false,
						len: '00:50'
					}]
				},{
					name: "培田古村4",
					statusName: '进行中',
					reportTime: "2020-06-01",
					reportName: "张倩",
					audios: [{
						src: 'http://www.douxue.top/audio.mp3',
						isPlay: false,
						len: '00:50'
					}]
				}],
				audios: [],
				recordIndex: -1,
				recordBeginTime: '',
				recordLen: 0
			}
		},
		onLoad() {
			let self = this;
			recorderManager.onStop(function (res) {
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
			this.initAudioContext()
		},
		onUnload: function (option) {
			uni.hideLoading();
			this.playEnd();
		},
        onHide: function (option) {
            uni.hideLoading();
			this.playEnd();
        },
		methods: {
			pageBack(){
				uni.navigateBack()
			},
			endRecord(){
				recorderManager.stop();
			},
			beginRecord(){
				this.recordBeginTime = Date.now();
				recorderManager.start();
			},
			deleteRecordAudio(e){
				let index = e.currentTarget.dataset.index;
				let audios = this.audios;
				this.audios.splice(index,1);
				if(this.innerAudioContext && !this.innerAudioContext.paused && this.recordIndex == index){
					this.innerAudioContext.stop();
				}
			},
			playRecordAudio(e){
				let index = e.currentTarget.dataset.index;
				let audios = this.audios;
				if(this.innerAudioContext && !this.innerAudioContext.paused && this.recordIndex == index){
					this.innerAudioContext.stop();
					return
				}
				this.recordIndex = index
				if(this.innerAudioContext){
					this.innerAudioContext.destroy();
					this.innerAudioContext = null
				}
				uni.showLoading({
					title: '音频资源加载中'
				});
				this.initAudioContext()
				this.innerAudioContext.src = audios[index].src;
				this.innerAudioContext.play();
			},
			initAudioContext(){
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.onCanplay(() => {
					uni.hideLoading();
				});
				this.innerAudioContext.onPlay(() => {
					uni.hideLoading();
				});
				this.innerAudioContext.onEnded(() => {
					this.playEnd();
				});
				this.innerAudioContext.onStop(() => {
					this.playEnd();
				});
				this.innerAudioContext.onWaiting(() => {
					console.log("loading")
					uni.showLoading({
					    title: '音频资源加载中'
					});
				});
				this.innerAudioContext.onError((e) => {
					console.log(e)
				});
			},
			//音频播放结束处理逻辑
			playEnd(){
				if(this.innerAudioContext.stop){
					this.innerAudioContext.stop();
					this.currentVillage = -1;
					this.currentAudioIndex = -1;
				}
				uni.hideLoading();
			},
			playAudio(e){
				let idx = e.currentTarget.dataset.idx; //村子的index
				let index = e.currentTarget.dataset.index;
				let currentVillage = this.currentVillage;
				let currentAudioIndex = this.currentAudioIndex;
				let list = this.villageList;
				let src;
				//如果当前正在播放
				if(this.innerAudioContext && !this.innerAudioContext.paused && idx == currentVillage && index == currentAudioIndex){
					//如果点击的是当前在播放的，暂停播放
					this.innerAudioContext.stop();
					this.currentVillage = -1;
					this.currentAudioIndex = -1;
					//设置字段isPlay = flase
					list[idx].audios[index].isPlay = false;
					return
				}else{
					if(currentVillage != -1 && currentAudioIndex != -1){
						list[currentVillage].audios[currentAudioIndex].isPlay = false;
					}
					list[idx].audios[index].isPlay = true;
					this.currentVillage = idx;
					this.currentAudioIndex = index;
					if(this.innerAudioContext){
						this.innerAudioContext.destroy();
						this.innerAudioContext = null
					}
					this.initAudioContext()
					src = list[idx].audios[index].src;
					//播放对应音频
					uni.showLoading({
						title: '音频资源加载中'
					});
					if(!this.innerAudioContext){
						this.initAudioContext()
					}
					this.innerAudioContext.src = src;
					this.innerAudioContext.autoplay = true;
					this.innerAudioContext.play();
				}
				
			},
			toDetail(){
				uni.navigateTo({
					url: '../taskDetail3/index'
				})
			},
			toReport(){
				this.showReport = true
			},
			toIssue(){
				let _this = this;
				uni.showModal({
				    title: '任务下发提醒',
				    content: '是否确认进行任务下发？',
				    success: function (res) {
				        if (res.confirm) {
							uni.showToast({
								icon :'none',
								title: '下发成功'
							})
				        } else if (res.cancel) {
				            
				        }
				    }
				});
			},
			cancelCb(){
				this.showReport = false
			},
			submit(){
				this.showReport = false
			}
		}
	}
</script>

<style>
.page-content{
	background: #FAFAFA;
	padding-bottom: 100rpx;
}
.bottom-fix{
	position: fixed;
	background: #DE1727;
	display: flex;
	align-items: center;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100rpx;
}
.report-btn{
	text-align: center;
	color: #fff;
	font-size: 36rpx;
	line-height: 100rpx;
	flex: 1;
	border-right: 1px solid #eee;
}
.send-btn{
	text-align: center;
	color: #fff;
	font-size: 36rpx;
	line-height: 100rpx;
	flex: 1;
}
.navbar-wrap{
	position: relative;
	background: #851A1C;
}
.status_bar{
	height: var(--status-bar-height);
	width: 100%;
}

.tui-pro-item {
	width: 100%;
	margin-bottom: 30rpx;
	background: #fff;
	box-sizing: border-box;
	border-radius: 10rpx;
	overflow: hidden;
	transition: all 0.15s ease-in-out;
}

.tui-flex-list {
	display: flex;
	flex-direction: column;
}
.tui-pro-item{
	padding: 30upx 30upx;
}
.item-top{
	margin-top: 10upx;
	display: flex;
	align-items: center;
}
.top-tag{

}
.item-title{
	margin-left: 15px;
	color: #4E4E4E;
	font-size: 32upx;
	font-weight: bold;
}
.item-desc{
	margin-top: 27upx;
	margin-bottom: 42upx;
	color: #aaa;
	font-size: 24upx;
	line-height: 36upx;
}
.bottom-wrap{
	margin-top: 30upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.bottom-left{
	display: flex;
	align-items: center;
}
.bottom-tag{

}
.bottom-time{
	color: #bbb;
	font-size: 24upx;
}
.item-status{
	color: #DE1727;
	font-size: 24upx;
}
/* 任务信息结束 */


.report-content{
	background: #fff;
	margin: 20upx 0;
	padding: 30upx;
}
.report-title{
	color: #2E2E2E;
	font-size: 38upx;
	font-weight: bold;
	margin-bottom: 45upx;
}
.group{
	display: flex;
	align-items: flex-start;
	margin-bottom: 42upx;
}
.group-label{
	color: #bbb;
	font-size: 28upx;
	width: 110upx;
	flex-shrink: 0;
}
.group-value{
	font-size: 28upx;
	color: #4E4E4E;
	padding-left: 50upx;
	flex-grow: 1;
}
.light-hight{
	color: #DE1727;
}

/* 任务完成列表begin */
.towns-list{
	padding: 30upx;
	background: #fff;
}
.towns-title{
	padding: 4upx 0;
	color: #2E2E2E;
	font-size: 32upx;
	font-weight: bold;
	line-height: 1;
	position: relative;
	padding-left: 22upx;
	margin: 10upx 0;
}
.towns-title::after{
	position: absolute;
	left: 0;
	top: 3upx;
	content: "";
	width: 8upx;
	height: 30upx;
	background: #DE1727;
}
.towns-item{
	margin-top: 30upx;
	border:1px solid rgba(246,246,246,1);
	box-shadow:0px 0px 10px 0px rgba(170,170,170,0.1);
	border-radius:10px;
	padding: 30upx 20upx;
}
.towns-top{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20upx;
}
.towns-name{
	color: #4E4E4E;
	font-size: 32upx;
	font-weight: bold;
}
.towns-status{
	color: #DE1727;
	font-size: 24upx;
}
.end-status{
	color: #bbb;
}
.towns-content{
	margin-top: 25upx;
	font-size: 24upx;
	color: #aaa;
	line-height: 36upx;
}
.audio-item{
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 400upx;
	height: 60upx;
	line-height: 60upx;
	padding: 0 24upx;
	border-radius: 30upx;
	background: #FEF3F3;
	margin-bottom: 30upx;
}
.audio-len{
	color: #DE1727;
	font-size: 22upx;
}
.towns-bottom{
	margin-top: 27upx;
	display: flex;
	align-items: center;
}
.towns-time{
	color: #bbb;
	font-size: 24upx;
}
.towns-person{
	margin-left: 77upx;
	color: #bbb;
	font-size: 24upx;
}
.towns-btn{
	color: #D4091C;
	font-size: 24upx;
}

.cancel-btn{
	background: #eee;
	color: #999;
	margin: 0 20rpx;
}
.submit-btn{
	background: #D4091C;
	color: #fff;
	margin: 0 20rpx;
}
.uni-radio-input-checked {
	background-color: rgb(222, 23, 39) !important;
	border-color: rgb(222, 23, 39) !important;
}
.uni-input{
	display: inline-block;
}

uni-radio .wx-radio-input, uni-checkbox .wx-checkbox-input, uni-radio .uni-radio-input, uni-checkbox .uni-checkbox-input {
	margin: 0;
	width: 36upx;
	height: 36upx;
	margin-right: 8upx;
}

.textarea-wrap textarea{
	padding: 10upx 20upx;
	width: 100%;
	border: 1px solid #ccc;
	color: #666;
}
.tui-btn-box{
	margin-top: 40rpx;
}

.tui-radio{
	margin-right: 20rpx;
}

.record-audios{
	padding-left: 40rpx;
}
.audio-item-wrap{
	display: flex;
	align-items: center;
}
.delete-icon{
	margin-bottom: 30rpx;
}
/* 任务完成列表end */
</style>
