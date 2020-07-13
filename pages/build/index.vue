<template>
	<view class="container">
		<uni-nav-bar status-bar color="#fff" fixed background-color="#DE1727" title="党建"></uni-nav-bar>
		<view class="title-wrap">
			<view class="group-title">
				党建任务
			</view>
			<view class="title-right" @click="moreBuild">
				<text>更多</text>
				<uni-icons type="arrowright" :size="16" color="#aaa"></uni-icons>
			</view>
		</view>
		<view class="task-list">
			<view class="task-item" v-for="item in list" @click="buildDetail">
				<image src="../../static/BasicsBg.png" mode="" class="task-pic"></image>
				<view class="task-right">
					<view class="task-title">
						岗龙乡党风建设进展情况
					</view>
					<view class="task-desc">
						具体工作内容：甘德县政府报告准时发布甘德县政府报告准时发
					</view>
					<view class="task-time">
						2020-06-07
					</view>
				</view>
			</view>
		</view>
		<view class="title-wrap">
			<view class="group-title">
				党支部会议
			</view>
			<view class="title-right" @click="moreZhibu">
				<text>更多</text>
				<uni-icons type="arrowright" :size="16" color="#aaa"></uni-icons>
			</view>
		</view>
		<view class="task-list" v-for="item in list">
			<view class="task-item">
				<image src="../../static/BasicsBg.png" mode="" class="task-pic"></image>
				<view class="task-right">
					<view class="task-title">
						岗龙乡党风建设进展情况
					</view>
					<view class="task-desc">
						具体工作内容：甘德县政府报告准时发布甘德县政府报告准时发
					</view>
					<view class="task-time">
						2020-06-07
					</view>
				</view>
			</view>
		</view>
		<view class="title-wrap">
			<view class="group-title">
				党员会议
			</view>
			<view class="title-right" @click="moreDangyuan">
				<text>更多</text>
				<uni-icons type="arrowright" :size="16" color="#aaa"></uni-icons>
			</view>
		</view>
		<view class="task-list" v-for="item in list">
			<view class="task-item">
				<image src="../../static/BasicsBg.png" mode="" class="task-pic"></image>
				<view class="task-right">
					<view class="task-title">
						岗龙乡党风建设进展情况
					</view>
					<view class="task-desc">
						具体工作内容：甘德县政府报告准时发布甘德县政府报告准时发
					</view>
					<view class="task-time">
						2020-06-07
					</view>
				</view>
			</view>
		</view>
		<view class="title-wrap">
			<view class="group-title">
				党课
			</view>
			<view class="title-right" @click="moreDangke">
				<text>更多</text>
				<uni-icons type="arrowright" :size="16" color="#aaa"></uni-icons>
			</view>
		</view>
		<view class="task-list" v-for="item in list">
			<view class="task-item">
				<image src="../../static/BasicsBg.png" mode="" class="task-pic"></image>
				<view class="task-right">
					<view class="task-title">
						岗龙乡党风建设进展情况
					</view>
					<view class="task-desc">
						具体工作内容：甘德县政府报告准时发布甘德县政府报告准时发
					</view>
					<view class="task-time">
						2020-06-07
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {uniNavBar},
		data() {
			return {
				list: [1,2,3,4]
			}
		},
		methods: {
			moreBuild(){
				uni.navigateTo({
					url: '../buildList/index'
				})
			},
			moreZhibu(){
				uni.navigateTo({
					url: '../zhibuList/index'
				})
			},
			moreDangyuan(){
				uni.navigateTo({
					url: '../dangyuanList/index'
				})
			},
			moreDangke(){
				uni.navigateTo({
					url: '../dangkeList/index'
				})
			},
			buildDetail(){
				uni.navigateTo({
					url: '../buildDetail/index'
				})
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: 120upx;
		background: #fff;
	}
	.title-wrap{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 22rpx 30rpx;
		margin-top: 20rpx;
		border-bottom: 1px solid #eee;
	}
	.group-title{
		position: relative;
		color: #2E2E2E;
		font-size: 32rpx;
		font-weight:bold;
		line-height:34rpx;
		padding-left: 20rpx;
	}
	.group-title::after{
		position: absolute;
		left: 0;
		top: 3upx;
		content: "";
		width: 8upx;
		height: 30upx;
		background: #DE1727;
	}
	.title-right{
		font-size: 26rpx;
		color: #9A9A9A;
	}
	.task-list{
		padding: 25rpx 30rpx;
	}
	.task-item{
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;
	}
	.task-item:last-of-type{
		margin-bottom: 0;
	}
	.task-pic{
		width: 160rpx;
		height: 160rpx;
		flex-shrink: 0;
	}
	.task-right{
		height: 160rpx;
		padding-left: 25rpx;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.task-title{
		color: #4E4E4E;
		font-size: 32rpx;
	}
	.task-desc{
		color: #aaa;
		font-size: 24rpx;
	}
	.task-time{
		color: #aaa;
		font-size: 24rpx;
	}
</style>
