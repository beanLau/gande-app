<template>
	<view class="container">
		<uni-nav-bar status-bar right-text="新建任务" @clickLeft="pageBack" left-icon="back" left-text="返回" @clickRight="toCreateTask"	color="#fff" fixed background-color="#DE1727" title="党建任务"></uni-nav-bar>
		<view class="title-wrap">
			<view class="group-title">
				党建任务
			</view>
		</view>
		<view class="task-list">
			<view class="task-item" v-for="item in list" @click="detail">
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
		<!--加载loadding-->
		<tui-loadmore v-if="loadding"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>
<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {uniNavBar},
		data() {
			return {
				pageIndex: 1,
				list: [1,2,3,4,1,1,1],
				loadData: [1,1,1,1],
				loadding: false,
				pullUpOn: true
			}
		},
		methods: {
			pageBack(){
				uni.navigateBack()
			},
			toCreateTask(){
				uni.navigateTo({
					url: '../createBuildTask/index'
				})
			},
			detail(){
				uni.navigateTo({
					url: '../buildDetail/index'
				})
			}
		},
		//页面相关事件处理函数--监听用户下拉动作
		onPullDownRefresh: function() {
			//延时为了看效果
			setTimeout(() => {
				this.list = this.loadData;
				this.pageIndex = 1;
				this.pullUpOn = true;
				this.loadding = false;
				uni.stopPullDownRefresh();
				// uni.showToast({
				// 	icon: 'none',
				//     title: '刷新成功'
				// });
			}, 200)
		},

		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.pageIndex == 3) {
				this.loadding = false;
				this.pullUpOn = false;
			} else {
				this.list = this.list.concat(this.loadData);
				this.pageIndex = this.pageIndex + 1;
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
