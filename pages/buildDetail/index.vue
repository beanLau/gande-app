<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="任务详情"></uni-nav-bar>
		</view>
		<view class="tui-pro-item tui-flex-list" hover-class="hover" :hover-start-time="150">
			<view class="item-top">
				<view>{{detailData.Title}}</view>
			</view>
			<view class="bottom-wrap">
				<view class="bottom-left">
					<view class="bottom-time">
						{{detailData.RenwuQixianDate}}
					</view>
				</view>
				<view class="item-status">
					{{detailData.StatusName}}
				</view>
			</view>
			<u-parse :html="detailData.Renwu" class="item-desc"></u-parse>
			<!-- <rich-text :nodes="detailData.Renwu" class="item-desc"></rich-text> -->
		</view>
		<view class="towns-list">
			<view class="towns-title">
				完成情况
			</view>
			<view class="towns-item" v-for="item in list">
				<view class="towns-top">
					<text class="towns-name">{{item.DzbName}}</text>
					<text class="towns-status">{{item.StatusName}}</text>
				</view>
				<view class="towns-content" v-html="item.Huibao">
				</view>
				<view class="towns-bottom">
					<text class="towns-time">汇报时间 {{item.CreateDate}}</text>
					<!-- <text class="towns-btn" @click="toDetail">查看详情</text> -->
				</view>
			</view>
			<view v-if="list && list.length == 0" class="nodata-wrap flex">
				<image src="../../static/nodata.png" mode="" class="nodata-pic"></image>
				<text class="nodata-tip">暂无数据</text>
			</view>
		</view>
		
		<view class="bottom-fix" v-if="showReportBtn">
			<view class="report-btn" @click="toReport">汇报</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData: {},
				list: [],
				id: '',
				showReportBtn: false
			}
		},
		
		onLoad(opt){
			console.log(opt)
			this.id = opt.id
			this.RenwuID = opt.RenwuID
			// this.detailData = JSON.parse(opt.item)
			// console.log(this.detailData)
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
		},
		onShow() {
			this.getList();
			this.getDetail();
		},
		mounted(){
		},
		methods: {
			toReport(){
				uni.navigateTo({
					url: `../reportBuild/index?RenwuID=${this.RenwuID}&id=${this.id}`
				})
			},
			getDetail(){
				let _this = this;
				this.tui.request("/Siji/AFP_DangjianRenwu/GetFormJson?keyValue="+_this.RenwuID, "get",{
					keyValue: _this.RenwuID
				}).then((res)=>{
					console.log(res)
					if(_this.jibie == 3 && res.XiangCode == _this.userinfo.XiangCode && res.StatusCode == 1){
						_this.showReportBtn = true
					}else{
						_this.showReportBtn = false
					}
					this.detailData = res || []
				})
			},
			getList(){
				let _this = this;
				let resData = {
					"queryJson": decodeURIComponent(JSON.stringify({
						RenwuID: this.RenwuID
					}))
				}
				this.tui.request("/Siji/AFP_DangjianRenwuHuibao/GetListJson", "get",resData).then((res)=>{
					this.list = res || []
					console.log(res)
				})
			},
			pageBack(){
				uni.navigateBack()
			},
			toDetail(){
				uni.navigateTo({
					url: '../taskDetail2/index'
				})
			}
		}
	}
</script>

<style>
.page-content{
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
	width: 100%;
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
.towns-bottom{
	margin-top: 27upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.towns-time{
	color: #bbb;
	font-size: 24upx;
}
.towns-btn{
	color: #bbb;
	font-size: 24upx;
}
/* 任务完成列表end */
</style>
