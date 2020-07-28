<template>
	<view class="container">
		<uni-nav-bar status-bar right-text="新建任务" @clickLeft="pageBack" left-icon="back" left-text="返回" @clickRight="toCreateTask"	color="#fff" fixed background-color="#DE1727" title="党建任务"></uni-nav-bar>
		<view class="title-wrap">
			<view class="group-title">
				党建任务
			</view>
		</view>
		<view class="task-list">
			<view class="task-item" v-for="item in list" @click="detail(item)">
				<view class="task-right">
					<view class="task-title">
						{{item.Title}}
					</view>
					<view class="task-desc" v-html="item.Renwu">
					</view>
					<view class="task-time">
						{{item.RenwuQixianDate}}
					</view>
				</view>
			</view>
			<view v-if="list && list.length == 0" class="nodata-wrap flex">
				<image src="../../static/nodata.png" mode="" class="nodata-pic"></image>
				<text class="nodata-tip">暂无数据</text>
			</view>
		</view>
		
		<u-toast ref="uToast" />
		<!--加载loadding-->
		<tui-loadmore v-if="loadding"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn && list.length != 0"></tui-nomore>
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
				list: [],
				loadData: [],
				loadding: false,
				pullUpOn: true,
				pageIndex: 1,
				pageSize: 5,
				userinfo: {}
			}
		},
		onLoad(opt) {
			this.XiangCode = opt.XiangCode
			this.CunCode = opt.CunCode
			this.Keyword = opt.Keyword
			let userinfo = uni.getStorageSync("userinfo")
			if(userinfo){
				userinfo = JSON.parse(userinfo)
				console.log(userinfo)
			}
		},
		mounted(){
			this.getListData();
		},
		methods: {
			getListData(){
				let _this = this;
				let resData = {
					"queryJson": decodeURIComponent(JSON.stringify({
						XiangCode: _this.userinfo.XiangCode || '',
						Keyword: '',
						StatusCode: '',
						beginTime: '',
						endTime: ''
					})),
					"rows": '5',
					"page": '1',
					"sidx": "CreateDate",
					"sord": "desc"
				}
				this.tui.request('Siji/AFP_DangjianRenwu/GetPageListJson',"GET",resData).then((res)=>{
					console.log(res)
					if(_this.pageIndex == 1){
						_this.list = res.rows;
					}else{
						_this.list = [..._this.list,...res.rows]
					}
					console.log('总共：' + res.records)
					if(_this.pageIndex * _this.pageSize >= res.records){
						_this.pullUpOn = false
					}else{
						_this.pullUpOn = true;
					}
					_this.loadding = false;
				}).catch(e=>{
					console.log(e)
				})
			},
			pageBack(){
				uni.navigateBack()
			},
			toCreateTask(){
				uni.navigateTo({
					url: '../createBuildTask/index'
				})
			},
			detail(item){
				uni.navigateTo({
					url: '../buildDetail/index?id=' + item.ID
				})
			}
		},
		//页面相关事件处理函数--监听用户下拉动作
		onPullDownRefresh: function() {
			//延时为了看效果
			this.pageIndex = 1;
			this.pullUpOn = true;
			this.getListData()
			setTimeout(() => {
				// this.familyList = this.loadData;
				// this.pageIndex = 1;
				// this.pullUpOn = true;
				// this.loadding = false;
				uni.stopPullDownRefresh();
				// uni.showToast({
				// 	icon: 'none',
				//     title: '刷新成功'
				// });
			}, 1000)
		},

		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			this.pageIndex = this.pageIndex + 1;
			this.getListData();
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
