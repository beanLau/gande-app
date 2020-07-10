<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="问题详情"></uni-nav-bar>
		</view>
		<view class="tui-pro-item tui-flex-list" hover-class="hover" :hover-start-time="150">
			<view class="item-top">
				<view>下贡麻乡扶贫进展情况</view>
			</view>
			<view class="bottom-wrap">
				<view class="bottom-left">
					<tui-tag padding="8rpx" size="24rpx" type="light-blue">
						<tui-icon name="about" :size="10" color="#4B8AFC"></tui-icon>
						<text>一般</text>
					</tui-tag>
					<tui-tag margin="0 15upx" padding="8rpx" type="light-orange" size="24rpx">扶贫</tui-tag>
				</view>
			</view>
		</view>
		<view class="report-content">
			<view class="group">
				<text class="group-label">反馈时间</text>
				<text class="group-value">{{detail.time}}</text>
			</view>
			<view class="group">
				<text class="group-label">反馈人</text>
				<text class="group-value">{{detail.person}}</text>
			</view>
			<view class="group">
				<text class="group-label">完成进度</text>
				<text class="group-value light-hight">联护员已反馈/村已上报</text>
			</view>
			<view class="group">
				<text class="group-label">问题内容</text>
				<text class="group-value">暂未登记</text>
			</view>
			<view class="group">
				<text class="group-label">原始问题反馈语音</text>
				<view class="audio-list">
					<view class="audio-item" v-for="(audio,index) in detail.audios" :data-index="index" @click="playDetailAudio">
						<tui-icon name="about" :size="14" color="#DE1727"></tui-icon>
						<text class="audio-len">{{audio.len}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="solve-wrap">
			<view class="solve-title">
				解决报告
			</view>
			<view class="solve-content">
				<view class="group">
					<text class="group-label">解决部门</text>
					<text class="group-value">环保</text>
				</view>
				<view class="group">
					<text class="group-label">汇报人</text>
					<text class="group-value">解决时间</text>
				</view>
				<view class="group">
					<text class="group-label">跟进人</text>
					<text class="group-value">张倩</text>
				</view>
				<view class="group">
					<text class="group-label">解决报告</text>
					<text class="group-value">在县委、县政府及镇委的坚强领导下，践行发展理念，推动高质量发展，较好完成了镇三届人大四次会议确定的任务，取得重大进展。</text>
				</view>
			</view>
			<view class="no-data">
				<image src="../../static/BasicsBg.png" mode="" class="no-data-pic"></image>
				<text class="no-data-tip">暂无解决报告</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentVillage: -1,
				currentAudioIndex: -1,
				hasPlay: false, //当前是否有音频在播放
				detailIndex: -1,
				detail: {
					name: '',
					person: '剑侠客',
					time: '2020-07-08',
					audios: [{
						src: 'http://www.douxue.top/audio.mp3',
						isPlay: false,
						len: '00:50'
					},{
						src: 'http://www.douxue.top/audio.mp3',
						isPlay: false,
						len: '00:50'
					}]
				}
			}
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
			initAudioContext(){
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.loop = true;
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
			playDetailAudio(e){
				let index = e.currentTarget.dataset.index;
				let audios = this.detail.audios;
				if(this.innerAudioContext && !this.innerAudioContext.paused && this.detailIndex == index){
					this.innerAudioContext.stop();
					return
				}
				this.detailIndex = index
				if(this.innerAudioContext){
					this.innerAudioContext.destroy();
					this.innerAudioContext = null
				}
				uni.showLoading({
					title: '音频资源加载中'
				});
				this.initAudioContext()
				this.innerAudioContext.src = audios[index].src;
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.play();
			}
		}
	}
</script>

<style>
.page-content{
	background: #FAFAFA;
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
	margin: 0;
	border-top: 1px solid #eee;
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
.audio-list{
	padding-left: 50upx;
	flex-grow: 1;
}
.audio-list >.audio-item{
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

/* 任务完成列表begin */
.solve-wrap{
	margin-top: 20rpx;
	padding: 30upx;
	background: #fff;
}
.solve-title{
	padding: 4upx 0;
	color: #2E2E2E;
	font-size: 32upx;
	font-weight: bold;
	line-height: 1;
	position: relative;
	padding-left: 22upx;
	margin: 10upx 0 40rpx;
}
.solve-title::after{
	position: absolute;
	left: 0;
	top: 3upx;
	content: "";
	width: 8upx;
	height: 30upx;
	background: #DE1727;
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

.no-data{
	padding: 60rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.no-data-pic{
	width: 426rpx;
	height: 300rpx;
}
.no-data-tip{
	color: #bbb;
	font-size: 28rpx;
	margin-top: 2rpx;
}
</style>
