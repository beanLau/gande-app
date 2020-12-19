<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="任务详情"></uni-nav-bar>
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
			<u-parse class="item-desc" :html="formatTable(detailData.Neirong)"></u-parse>
		</view>
		<view class="towns-list" v-if="xiangRenWu.length != 0">
			<view class="towns-title">
				完成情况
			</view>
			<view class="towns-item" v-for="item in xiangRenWu" :key="item.ID" @click="toDetail(item)">
				<view class="towns-top">
					<text class="towns-name">{{item.XiangName}}</text>
					<text class="towns-status">{{item.StatusName}}</text>
				</view>
				<u-parse class="towns-content" :html="'具体工作内容：'+ formatTable(item.Neirong)"></u-parse>
				<view class="towns-bottom">
					<text class="towns-time">汇报时间 {{item.CompDate || ' 无'}}</text>
					<text class="towns-btn">查看详情</text>
				</view>
			</view>
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
			toDetail(item){
				uni.navigateTo({
					url: '../taskDetail2/index?id=' + item.ID
				})
			},
			getDetail(){
				this.tui.request("/Siji/AFP_RenwuXian/GetXianRenWuDetail?keyValue="+this.id,"get",{
					keyValue: this.id
				}).then((res)=>{
					let jinjicode = res.xianRenWuData.JinjiCode
					if(jinjicode == 1){
						res.xianRenWuData.jinjiColor = '#4B8AFC'
						res.xianRenWuData.jinjiClass = 'green'
					}else if(jinjicode == 2){
						res.xianRenWuData.jinjiColor = '#4B8AFC'
						res.xianRenWuData.jinjiClass = 'warning'
					}else  if(jinjicode == 3){
						res.xianRenWuData.jinjiColor = '#4B8AFC'
						res.xianRenWuData.jinjiClass = 'danger'
					}
					this.detailData = res.xianRenWuData;
					this.xiangRenWu = res.xiangRenWu || [];
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
