<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" color="#fff" fixed background-color="#DE1727" title="完成情况"></uni-nav-bar>
		</view>
		<view class="tui-pro-item tui-flex-list" hover-class="hover" :hover-start-time="150">
			<view class="item-top">
				<tui-tag margin="0 15upx 0 0" padding="8rpx" type="danger" size="24rpx">任务</tui-tag>
				<view>{{detailData.Title}}</view>
			</view>
			<view class="bottom-wrap">
				<view class="bottom-left">
					<tui-tag padding="8rpx" size="24rpx" :type="detailData.jinjiClass" v-if="detailData.JinjiName">
						<!-- <tui-icon name="about" :size="10" :color="detailData.jinjiColor"></tui-icon> -->
						<text>{{detailData.JinjiName}}</text>
					</tui-tag>
					<tui-tag margin="0 15upx" padding="8rpx" type="light-orange" size="24rpx">{{detailData.TypeName}}</tui-tag>
					<view class="bottom-time">
						{{detailData.CreateUserName}}  {{detailData.RenWuDaoQiRiQi}}
					</view>
				</view>
				<view class="item-status">
					{{detailData.StatusName}}
				</view>
			</view>
			<u-parse class="item-desc" :html="detailData.Neirong"></u-parse>
		</view>
		<view class="report-content" v-if="huibaoData.length > 0">
			<view class="report-title">{{detailData.XiangName}}任务汇报</view>
			<view class="huibao-item" v-for="huibao in huibaoData">
				<view class="group">
					<text class="group-label">汇报时间</text>
					<text class="group-value">{{huibao.CompDate}}</text>
				</view>
				<view class="group">
					<text class="group-label">汇报人</text>
					<text class="group-value">{{huibao.XiangName}}</text>
				</view>
				<view class="group">
					<text class="group-label">完成状态</text>
					<text class="group-value light-hight">{{huibao.StatusName}}</text>
				</view>
				
				<view class="group">
					<text class="group-label">汇报内容</text>
					<u-parse class="group-value" :html="huibao.HuibaoNeirong"></u-parse>
				</view>
			</view>
		</view>
		<view class="towns-list">
			<view class="towns-title">
				完成情况
			</view>
			<view class="towns-item" v-if="renWuCun.length > 0" v-for="(item,idx) in renWuCun" :key="item.name" @click="toDetail(item)">
				<view class="towns-top">
					<text class="towns-name">{{item.cunData.CunName}}</text>
					<text class="towns-status">{{item.cunData.StatusName}}</text>
					<!-- <text class="towns-btn">详情</text> -->
				</view>
				<view class="towns-audios">
					<view class="audio-item" v-for="(audio,index) in item.audios" :data-idx="idx" :data-index="index" @click.stop="playAudio">
						<image v-if="currentVillage == idx && currentAudioIndex == index" src="../../static/playing.gif" mode="" class="play-icon"></image>
						<image v-else src="../../static/play-icon.png" mode="" class="play-icon"></image>
						<text class="audio-len">{{audio.len}}</text>
					</view>
				</view>
				<view class="towns-bottom">
					<text class="towns-time">汇报时间 {{item.cunData.CompDate || ''}}</text>
					<text class="towns-person">汇报人 {{item.cunData.CunName}}</text>
				</view>
			</view>
			<view v-if="renWuCun && renWuCun.length == 0" class="nodata-wrap flex">
				<image src="../../static/nodata.png" mode="" class="nodata-pic"></image>
				<text class="nodata-tip">暂无数据</text>
			</view>
		</view>
		<view class="bottom-fix" v-if="showReport || showIssue">
			<view class="report-btn" @click="toReport"  v-if="showReport">汇报</view>
			<view class="send-btn" @click="toIssue" v-if="showIssue">下发</view>
		</view>
		<!-- <view class="bottom-fix" v-if="showReport">
			<view class="report-btn" @touchend="endRecord" @touchstart="beginRecord">长按开始语音汇报</view>
		</view> -->
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	export default {
		data() {
			return {
				detailData: {},
				id: '',
				currentVillage: -1,
				currentAudioIndex: -1,
				hasPlay: false, //当前是否有音频在播放
				renWuCun: [],
				audios: [],
				recordIndex: -1,
				recordBeginTime: '',
				recordLen: 0,
				showReportBtn: false,
				authorizeMenu: {},
				huibaoData: [],
				canReport: false,
				showReport: false,
				showIssue: false
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
			let authorizeMenu = uni.getStorageSync("authorizeMenu");
			console.log(authorizeMenu)
			this.authorizeMenu = authorizeMenu
		},
		onShow() {
			this.getDetail();
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
			formatTable(content){
				if(content){
					content = content.replace(/<br[^>]*\/>/gi, '');
					content = content.replace(/<td[^<>]*>/ig, '<td style="border:1px solid #ccc;padding:0px;height:auto;word-break:break-all;">');
					content = content.replace(/<td[^<>]*>\s*?<p>/ig, '<td>');
					content = content.replace(/<table[^>]*>/gi, '<table cellpadding="0" cellspacing="0" max-width="100%" border="1" style="font-size:12px;max-width:100%; text-align:left;text-indent: 0em;line-height:12px;"'); 
					return content;
				}else{
					return null;
				}
			},
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
					console.log('onCanplay')
					uni.hideLoading();
				});
				this.innerAudioContext.onPlay(() => {
					console.log('onPlay')
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
					// uni.showLoading({
					//     title: '音频资源加载中'
					// });
				});
				this.innerAudioContext.onError((e) => {
					console.log(e)
					uni.hideLoading()
					uni.showToast({
						title: '资源加载失败'
					})
				});
			},
			//音频播放结束处理逻辑
			playEnd(){
				if(this.innerAudioContext.stop){
					this.innerAudioContext.stop();
				}
				this.currentVillage = -1;
				this.currentAudioIndex = -1;
				this.recordIndex = -1;
				uni.hideLoading();
			},
			playAudio(e){
				let idx = e.currentTarget.dataset.idx; //村子的index
				let index = e.currentTarget.dataset.index;
				let currentVillage = this.currentVillage;
				let currentAudioIndex = this.currentAudioIndex;
				let list = this.renWuCun;
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
					if(!this.innerAudioContext){
						this.initAudioContext()
					}
					this.innerAudioContext.src = src;
					this.innerAudioContext.autoplay = true;
					uni.showLoading({
					    title: '音频资源加载中'
					});
					this.innerAudioContext.play();
				}
				
			},
			toDetail(item){
				uni.navigateTo({
					url: '../taskDetail3/index?id='+ item.cunData.ID
				})
			},
			toReport(){
				let detailData = this.detailData;
				console.log(detailData.StartNode)
				uni.navigateTo({
					url: `../reportXiang/index?RenwuID=${detailData.RenwuID}&XiangCode=${detailData.XiangCode}&XiangName=${detailData.XiangName}&StartNode=${detailData.StartNode}`
				})
			},
			toIssue(){
				let _this = this;
				let detailData = _this.detailData;
				uni.navigateTo({
					url: `../sendXiang/index?RenwuID=${detailData.ID}&XiangCode=${detailData.XiangCode}&XiangName=${detailData.XiangName}`
				})
			},
			cancelCb(){
				this.showReport = false
			},
			submit(){
				this.showReport = false
			},
			getDetail(){
				let _this = this;
				this.tui.request("/Siji/AFP_RenwuXiang/GetAppXiangRenWuDetail?keyValue="+this.id,"get",{
					keyValue: this.id
				}).then((res)=>{
					console.log(res)
					if(res.renWuCun.length && res.renWuCun.every(item=>{
							return item.cunData.StatusCode == 4
						})){
						_this.canReport = true
					}
					if(res.xiangRenWuData.StatusCode == 1 || res.xiangRenWuData.StatusCode == 3){
						_this.canReport = true
					}
					//当前用户
					let StartNode = res.xiangRenWuData.StartNode
					let StatusCode = res.xiangRenWuData.StatusCode
					
					if(_this.jibie == 2 && res.xiangRenWuData.XiangCode == _this.userinfo.XiangCode){
						if(_this.canReport && res.xiangRenWuData.StatusCode != 4 && StartNode == 1 && _this.authorizeMenu.shangchuanxiada && _this.authorizeMenu.shangchuanxiada.shangbaorenwu){
							_this.showReport = true;
						}else{
							_this.showReport = false;
						}
						if(res.xiangRenWuData.StatusCode == 1 && _this.authorizeMenu.shangchuanxiada && _this.authorizeMenu.shangchuanxiada.xiafarenwu && StartNode == 1){
							_this.showIssue = true
						}else{
							_this.showIssue = false;
						}
					}
					let jinjicode = res.xiangRenWuData.JinjiCode
					if(jinjicode == 1){
						res.xiangRenWuData.jinjiColor = '#4B8AFC'
						res.xiangRenWuData.jinjiClass = 'green'
					}else if(jinjicode == 2){
						res.xiangRenWuData.jinjiColor = '#4B8AFC'
						res.xiangRenWuData.jinjiClass = 'warning'
					}else  if(jinjicode == 3){
						res.xiangRenWuData.jinjiColor = '#4B8AFC'
						res.xiangRenWuData.jinjiClass = 'danger'
					}
					_this.detailData = res.xiangRenWuData;
					console.log(_this.detailData)
					_this.huibaoData = res.xiangHuiBaoData || [];
					res.renWuCun.map(item=>{
						if(!item.audioList){
							return
						}
						let audioList = item.audioList.split(",");
						let audios = []
						audioList.map((audio,index)=>{
							if(audio.indexOf('http') == -1){
								let url = 'http://110.166.84.163:8001/' + audio
								audios[index] = {
									src: url
								}
							}
							
						})
						item.audios = audios
					})
					console.log(res.renWuCun)
					_this.renWuCun = res.renWuCun || [];
					
				})
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
.huibao-item{
	margin-bottom: 1px solid #ccc;
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
	margin-left: 30rpx;
	margin-bottom: 30rpx;
}
.play-icon{
	width: 20rpx;
	height: 20rpx;
}
/* 任务完成列表end */
</style>
