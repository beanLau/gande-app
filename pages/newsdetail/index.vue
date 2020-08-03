<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="新闻详情"></uni-nav-bar>
		</view>
		<view class="tui-pro-item tui-flex-list" hover-class="hover" :hover-start-time="150">
			<view class="item-top">
				<view>{{detailData.FullHead}}</view>
			</view>
			<view class="bottom-wrap">
				<view class="bottom-left">
					<view class="bottom-time">
						{{detailData.AuthorName}}  {{detailData.CreateDate}}
					</view>
				</view>
			</view>
			<u-parse class="item-desc" :html="detailData.NewsContent"></u-parse>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData: {},
				xiangRenWu: [],
				id: ''
			}
		},
		onLoad(opt) {
			this.id = opt.id
			let userinfo = uni.getStorageSync("userinfo")
			if(userinfo){
				userinfo = JSON.parse(userinfo)
				console.log(userinfo)
			}
		},
		mounted() {
			this.getDetail();
		},
		methods: {
			pageBack(){
				uni.navigateBack()
			},
			toDetail(item){
				uni.navigateTo({
					url: '../taskDetail2/index?id=' + item.ID
				})
			},
			getDetail(){
				this.tui.request("PublicInfoManage/Notice/GetFormJson?keyValue="+this.id,"get").then((res)=>{
					console.log(res)
					this.detailData = res || {};
				})
			}
		}
	}
</script>

<style>
.page-content{
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
