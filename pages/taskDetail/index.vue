<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="任务详情"></uni-nav-bar>
		</view>
		<view class="tui-pro-item tui-flex-list" hover-class="hover" :hover-start-time="150" @tap="detail">
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
		<view class="towns-list">
			<view class="towns-title">
				完成情况
			</view>
			<view class="towns-item">
				<view class="towns-top">
					<text class="towns-name">柯曲镇</text>
					<text class="towns-status">进行中</text>
				</view>
				<view class="towns-content">
					具体工作内容：甘德县政府报告准时发布甘德县政府报告准时发布甘德县政府报告准时发布
				</view>
				<view class="towns-bottom">
					<text class="towns-time">汇报时间 2020-06-01</text>
					<text class="towns-btn">查看详情</text>
				</view>
			</view>
			<view class="towns-item">
				<view class="towns-top">
					<text class="towns-name">柯曲镇</text>
					<text class="towns-status">进行中</text>
				</view>
				<view class="towns-content">
					具体工作内容：甘德县政府报告准时发布甘德县政府报告准时发布甘德县政府报告准时发布
				</view>
				<view class="towns-bottom">
					<text class="towns-time">汇报时间 2020-06-01</text>
					<text class="towns-btn">查看详情</text>
				</view>
			</view>
			<view class="towns-item">
				<view class="towns-top">
					<text class="towns-name">柯曲镇</text>
					<text class="towns-status">进行中</text>
				</view>
				<view class="towns-content">
					具体工作内容：甘德县政府报告准时发布甘德县政府报告准时发布甘德县政府报告准时发布
				</view>
				<view class="towns-bottom">
					<text class="towns-time">汇报时间 2020-06-01</text>
					<text class="towns-btn">查看详情</text>
				</view>
			</view>
			<view class="towns-item">
				<view class="towns-top">
					<text class="towns-name">柯曲镇</text>
					<text class="towns-status end-status">已完成</text>
				</view>
				<view class="towns-content">
					具体工作内容：甘德县政府报告准时发布甘德县政府报告准时发布甘德县政府报告准时发布
				</view>
				<view class="towns-bottom">
					<text class="towns-time">汇报时间 2020-06-01</text>
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
				
			}
		},
		methods: {
			pageBack(){
				uni.navigateBack()
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
