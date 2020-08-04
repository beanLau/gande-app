<template>
	<view class="container">
		<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" color="#fff" fixed background-color="#DE1727" title="我的党建"></uni-nav-bar>
		
		<view class="task-list">
			<view class="towns-title">
				党建列表
			</view>
			<view class="task-list">
				<view class="task-list" v-if="jibie == 2">
					<view class="task-item" v-for="item in list" @click="buildDetail2(item)">
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
				</view>
				<view class="task-list" v-if="jibie == 3">
					<view class="task-item" v-for="item in list" @click="detail(item)">
						<view class="task-right">
							<view class="task-title">
								{{item.RenwuTitle}}
							</view>
							<view class="task-desc" v-html="item.Huibao">
							</view>
							<view class="task-time">
								{{item.RenwuQixianDate}}
							</view>
						</view>
					</view>
				</view>
				<view v-if="list && list.length == 0" class="nodata-wrap flex">
					<image src="../../static/nodata.png" mode="" class="nodata-pic"></image>
					<text class="nodata-tip">暂无数据</text>
				</view>
			</view>
		</view>
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
				cancelColor: '#888',
				color: '#5677fc',
				setDateTime: '',
				result: '',
				unitTop: false,
				radius: false, //日期相关参数
				list: [],
				loadData: [],
				loadding: false,
				pullUpOn: true,
				beginTime: '',
				endTime: '',
				keyword: '',
				
				pageIndex: 1,
				pageSize: 5,
				userinfo: {},
				jibie: 0
			}
		},
		
		onLoad(opt) {
			this.XiangCode = opt.XiangCode
			this.CunCode = opt.CunCode
			this.Keyword = opt.Keyword
			let userinfo = uni.getStorageSync("userinfo")
			if(userinfo){
				userinfo = JSON.parse(userinfo)
				this.userinfo = userinfo
				if(userinfo.Nature == 3){ //县
					this.jibie = 1
				}else if(userinfo.Nature == 6){ //乡
					this.jibie = 2
					this.url = 'Siji/AFP_DangjianRenwu/GetPageListJson'
				}else if(userinfo.Nature == 7 && userinfo.IsWarner == 0){ //村
					this.jibie = 3
					this.url = 'Siji/AFP_DangjianRenwuHuibao/GetPageListJson'
				}else{ //联户员
					this.jibie = 4
				}
			}
			console.log(userinfo)
		},
		mounted(){
			
		},
		
		onShow(){
			this.pageIndex = 1;
			this.pullUpOn = true;
			this.getListData();
		},
		methods: {
			
			detail(item){
				uni.navigateTo({
					url: '../buildDetail/index?id=' + item.ID + '&RenwuID='+ item.RenwuID
				})
			},
			buildDetail2(item){
				uni.navigateTo({
					url: '../buildDetail/index?RenwuID=' + item.ID
				})
			},
			toCreateTask(){
				uni.navigateTo({
					url: '../createZhibu/index'
				});
			},
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
					"page": _this.pageIndex,
					"sidx": "CreateDate",
					"sord": "desc"
				}
				this.tui.request(_this.url,"GET",resData).then((res)=>{
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
			keywordChange(e){
				this.keyword = e.target.value
			},
			resetCb(){
				this.keyword = '';
				this.beginTime = ''
				this.endTime = ''
			},
			toSearch(){
				this.pageIndex = 1;
				this.pullUpOn = true;
				this.getListData()
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
	
	tui-product-list {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 270upx 30upx 30upx 30upx;
		background: #FBFAFA;
	}
	
	.tui-product-container {
		flex: 1;
		margin-right: 10rpx;
	}
	
	.tui-product-container:last-child {
		margin-right: 0;
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
		padding: 38upx 20upx;
	}
	.item-top{
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
		max-height: 100rpx;
		color: #aaa;
		font-size: 24upx;
		line-height: 36upx;
		overflow: hidden;
	}
	.bottom-wrap{
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
