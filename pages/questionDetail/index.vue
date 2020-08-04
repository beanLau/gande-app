<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="问题详情"></uni-nav-bar>
		</view>
		<view class="tui-pro-item tui-flex-list" hover-class="hover" :hover-start-time="150">
			<view class="item-top">
				<view>{{detailData.Title}}</view>
			</view>
			<view class="bottom-wrap">
				<view class="bottom-left">
					<tui-tag padding="8rpx" size="24rpx" :type="detailData.jinjiClass" v-if="detailData.JinjiCode">
						<!-- <tui-icon name="about" :size="10" :color="detailData.jinjiColor"></tui-icon> -->
						<text>{{detailData.JinjiName}}</text>
					</tui-tag>
					<tui-tag v-if="detailData.TypeName" margin="0 15upx" padding="8rpx" type="light-orange" size="24rpx">{{detailData.TypeName}}</tui-tag>
				</view>
			</view>
		</view>
		<view class="report-content">
			<view class="group">
				<text class="group-label">反馈时间</text>
				<text class="group-value">{{detailData.FanKuiShiJian}}</text>
			</view>
			<view class="group">
				<text class="group-label">反馈人</text>
				<text class="group-value">{{detailData.LianHuYuanName}}</text>
			</view>
			<view class="group">
				<text class="group-label">完成进度</text>
				<text class="group-value light-hight">{{detailData.StatusName}}</text>
			</view>
			<view class="group">
				<text class="group-label">问题内容</text>
				<text class="group-value">{{detailData.Neirong || ''}}</text>
			</view>
			<view class="group">
				<text class="group-label">原始问题反馈语音</text>
				<view class="audio-list">
					<view class="audio-item" v-for="(audio,index) in audios" :data-index="index" @click="playDetailAudio">
						<image v-if="detailIndex == index" src="../../static/playing.gif" mode="" class="play-icon"></image>
						<image v-else src="../../static/play-icon.png" mode="" class="play-icon"></image>
						<text class="audio-len">{{audio.len}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="solve-wrap">
			<view class="solve-title">
				解决报告
			</view>
			<view class="solve-content" v-if="detailData.JieJueBaoGao">
				<view class="group">
					<text class="group-label">解决部门</text>
					<text class="group-value">{{detailData.JieJueRen}}</text>
				</view>
				<view class="group">
					<text class="group-label">汇报人</text>
					<text class="group-value">{{detailData.JieJueBaoGao}}</text>
				</view>
				<view class="group">
					<text class="group-label">跟进人</text>
					<text class="group-value">{{detailData.GenJinRenName}}</text>
				</view>
				<view class="group">
					<text class="group-label">解决报告</text>
					<text class="group-value">{{detailData.JieJueBaoGao}}</text>
				</view>
			</view>
			<view class="no-data" v-else>
				<image src="../../static/nodata.png" mode="" class="no-data-pic"></image>
				<text class="no-data-tip">暂无解决报告</text>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-modal v-model="showModule" :show-cancel-button="true" content="确认提交该问题吗?" @confirm="confirm"></u-modal>
		<view class="bottom-fix" v-if="showReportBtn && authorizeMenu.shangchuanxiada && authorizeMenu.shangchuanxiada.wentitijiao">
			<view class="report-btn" @click="toReport">问题提交</view>
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
				currentVillage: -1,
				currentAudioIndex: -1,
				hasPlay: false, //当前是否有音频在播放
				detailIndex: -1,
				detailData: {},
				audios: [],
				showReportBtn: false,
				showModule: false,
				isLoading: false,
				userinfo: {},
				authorizeMenu: {}
			}
		},
		onLoad(opt) {
			this.id = opt.id
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
			let userinfo = uni.getStorageSync("userinfo")
			if(userinfo){
				userinfo = JSON.parse(userinfo)
				this.userinfo = userinfo
				if(userinfo.Nature == 3){ //县
					this.jibie = 1
				}else if(userinfo.Nature == 6){ //乡
					this.jibie = 2
				}else if(userinfo.Nature == 7 && userinfo.IsWarner == 0){ //村
					this.jibie = 3
				}else{ //联户员
					this.jibie = 4
				}
			}
			console.log(userinfo)
			let authorizeMenu = uni.getStorageSync("authorizeMenu");
			console.log(authorizeMenu)
			this.authorizeMenu = authorizeMenu
		},
		mounted() {
			this.initAudioContext()
			this.getDetail();
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
			toReport(){
				this.showModule = true
			},
			pageBack(){
				uni.navigateBack()
			},
			confirm(){
				let _this = this;
				if(this.isLoading){
					return
				}
				_this.isLoading = true
				_this.tui.request("/Siji/AFP_WenTi/SaveForm",'POST',{
					"XiangCode": _this.detailData.XiangCode,
					"XiangName": _this.detailData.XiangName,
					"CunCode": _this.detailData.CunCode,
					"CunName": _this.detailData.CunName,
					"LianHuYuanID": _this.detailData.LianHuYuanID,
					"LianHuYuanName": _this.detailData.LianHuYuanName,
					"YuanShiRadioUrl": _this.detailData.YuanShiRadioUrl,
					"StatusCode": "2",
					"StatusName": "村级已提交"
				}).then((res)=>{
					console.log(res)
					_this.isLoading = false;
					if(res.type == 1){
						_this.$refs.uToast.show({
							title: '问题提交成功',
							back: true
						})
					}else{
						_this.$refs.uToast.show({
							title: res.message
						})
					}
					
				})
			},
			cancel(){
				this.showModule = false
			},
			getDetail(){
				let _this = this;
				this.tui.request("/Siji/AFP_WenTi/GetFormJson?keyValue="+this.id,"get",{
					keyValue: this.id
				}).then((res)=>{
					console.log(res)
					try{
						let jinjicode = res.JinjiCode
						
						if(_this.jibie == 3 &&  res.CunCode == _this.userinfo.CunCode && res.StatusCode == 1){
							_this.showReportBtn = true
						}
						if(jinjicode == 1){
							res.jinjiColor = '#4B8AFC'
							res.jinjiClass = 'green'
						}else if(jinjicode == 2){
							res.jinjiColor = '#4B8AFC'
							res.jinjiClass = 'warning'
						}else  if(jinjicode == 3){
							res.jinjiColor = '#4B8AFC'
							res.jinjiClass = 'danger'
						}
						let audios = [];
						let YuanShiRadioUrl = res.YuanShiRadioUrl || '';
						YuanShiRadioUrl = YuanShiRadioUrl.split(';');
						YuanShiRadioUrl.map(item=>{
							if(item.indexOf('http') == -1){
								item = 'http://116.131.134.198:9001/' + item
							}
							audios.push({
								src: item
							})
						})
						this.audios = audios
						this.detailData = res;
					}catch(e){
						console.log(e)
						//TODO handle the exception
					}
				})
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
					this.detailIndex = -1;
				}
				uni.hideLoading();
			},
			playDetailAudio(e){
				let index = e.currentTarget.dataset.index;
				let audios = this.audios;
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
				console.log(audios[index].src)
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
.play-icon{
	width: 20rpx;
	height: 20rpx;
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
</style>
