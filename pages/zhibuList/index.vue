<template>
	<view class="container">
		<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" color="#fff" fixed background-color="#DE1727" title="党建任务"></uni-nav-bar>
		<view class="title-wrap">
			<view class="group-title">
				党建任务
			</view>
		</view>
		<view class="search-wrap">
			<view class="group-item">
				<uni-icons type="search" color="#ccc" :size="24"></uni-icons>
				<input class="search-input" type="text" value="" @input="keywordChange" placeholder="输入关键字搜索"/>
			</view>
			<view class="group-item">
				<view class="begin-time" :class="{'has-value': beginTime != ''}" @click="showBeginTime">
					{{beginTime ? beginTime : '选择开始时间'}}
				</view>
				<tui-datetime ref="beginTime" :type="3" :cancelColor="cancelColor" :color="color"
				 :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="changeBeginTime"></tui-datetime>
				<view class="end-time" :class="{'has-value': endTime != ''}" @click="showEndTime">
					{{endTime ? endTime : '选择截止时间'}}
				</view>
				<tui-datetime ref="endTime" :type="3" :cancelColor="cancelColor" :color="color"
				 :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="changeEndTime"></tui-datetime>
			</view>
			
			<view class="tui-btn-box flex">
				<button class="tui-button-primary cancel-btn" hover-class="tui-button-hover" @click="resetCb">重置</button>
				<button class="tui-button-primary submit-btn" hover-class="tui-button-gray_hover" @click="toSearch">搜索</button>
			</view>
		</view>
		<view class="task-list">
			<view class="towns-title">
				全部会议
			</view>
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
				cancelColor: '#888',
				color: '#5677fc',
				setDateTime: '',
				result: '',
				unitTop: false,
				radius: false, //日期相关参数
				
				pageIndex: 1,
				list: [1,2,3,4,1,1,1],
				loadData: [1,1,1,1],
				loadding: false,
				pullUpOn: true,
				beginTime: '',
				endTime: '',
				keyword: ''
			}
		},
		methods: {
			pageBack(){
				uni.navigateBack()
			},
			detail(){
				uni.navigateTo({
					url: '../buildDetail/index'
				})
			},
			keywordChange(e){
				this.keyword = e.target.value
			},
			resetCb(){
				
			},
			toSearch(){
				
			},
			showBeginTime(){
				this.$refs.beginTime.show();
			},
			
			showEndTime(){
				this.$refs.endTime.show();
			},
			changeBeginTime(e){
				this.beginTime = e.result;
			},
			changeEndTime(e){
				this.endTime = e.result;
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
	
	.tui-btn-box{
		margin-top: 40rpx;
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
	.towns-title{
		padding: 4upx 0;
		color: #2E2E2E;
		font-size: 32upx;
		font-weight: bold;
		line-height: 1;
		position: relative;
		padding-left: 22upx;
		margin: 20upx 0;
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
	.search-wrap{
		padding: 50rpx 28rpx;
	}
	.group-item{
		display: flex;
		align-items: center;
		height: 86rpx;
	}
	.search-input{
		flex: 1;
		color: #aaa;
	}
	.begin-time{
		flex: 1;
		text-align: center;
		color: #aaa;
		font-size: 30rpx;
	}
	.end-time{
		flex: 1;
		text-align: center;
		color: #aaa;
		font-size: 30rpx;
	}
	.has-value{
		color: #4E4E4E;
	}
</style>
