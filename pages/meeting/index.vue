<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" :title="pageTitle"></uni-nav-bar>
		</view>
		<view class="tui-pro-item tui-flex-list" hover-class="hover" :hover-start-time="150">
			<view class="item-top">
				<view>{{detailData.Title}}</view>
			</view>
			<view class="bottom-wrap">
				{{detailData.Riqi}}
			</view>
		</view>
		<view class="report-content">
			<view class="group">
				<text class="group-label">会议地点</text>
				<text class="group-value">{{detailData.Didian}}</text>
			</view>
			<view class="group">
				<text class="group-label">参会人员</text>
				<text class="group-value">{{detailData.Renyuan}}</text>
			</view>
			<view class="group">
				<text class="group-label">会议内容</text>
			</view>
			<u-parse class="item-desc" :html="detailData.Neirong"></u-parse>
		</view>
		<view class="solve-wrap">
			<view class="solve-title">
				会议图片
			</view>
			<image class="meet-pic" :src="item" mode="aspectFit" v-for="item in imgs"></image>
		</view>
		<u-toast ref="uToast" />
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
				detailData: {},
				audios: [],
				showReportBtn: false,
				showModule: false,
				isLoading: false,
				userinfo: {},
				authorizeMenu: {},
				pageTitle: '',
				imgs: []
			}
		},
		onLoad(opt) {
			this.id = opt.id
			this.pageTitle = opt.pageTitle + '会议详情';
			let self = this;
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
			this.getDetail();
		},
		onUnload: function (option) {
		},
        onHide: function (option) {
        },
		methods: {
			toReport(){
				this.showModule = true
			},
			pageBack(){
				uni.navigateBack()
			},
			getDetail(){
				let _this = this;
				this.tui.request("/Siji/AFP_Dangjian/GetFormJson?keyValue="+this.id,"get",{
					keyValue: this.id
				}).then((res)=>{
					console.log(res)
					_this.detailData = res;
					let imgs = res.Imgs.split(';')
					imgs.map(item=>{
						if(item.indexOf('http') == -1){
							item = 'http://110.166.84.163:8001/' + item
							item = 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1596897555&di=d054ec08352c56c0189ed8b1935871ce&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg'
						}
					})
					_this.imgs = imgs
				})
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
.meet-pic{
	width: 100%;
}
</style>
