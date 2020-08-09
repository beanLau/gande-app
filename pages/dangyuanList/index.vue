<template>
	<view class="container">
		<uni-nav-bar v-if="jibie == 3 && authorizeMenu.dangjian.xinjiandangyuanhuiyi" status-bar @clickLeft="pageBack" right-text="创建会议" @clickRight="toCreateTask" left-icon="back" left-text="返回" color="#fff" fixed background-color="#DE1727" title="党员会议"></uni-nav-bar>
		<uni-nav-bar v-else status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" color="#fff" fixed background-color="#DE1727" title="党员会议"></uni-nav-bar>
	
		<view class="title-wrap">
			<view class="group-title">
				党员会议
			</view>
		</view>
		<view class="search-wrap">
			<view class="group-item">
				<uni-icons type="search" color="#ccc" :size="24"></uni-icons>
				<input class="search-input" type="text" :value="keyword" @input="keywordChange" placeholder="输入关键字搜索"/>
			</view>
			<view class="group-item">
				<view class="begin-time" :class="{'has-value': beginTime != ''}" @click="showBeginTime">
					{{beginTime ? beginTime : '选择开始时间'}}
				</view>
				<tui-datetime ref="beginTime" :type="2" :cancelColor="cancelColor" :color="color"
				 :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="changeBeginTime"></tui-datetime>
				<view class="end-time" :class="{'has-value': endTime != ''}" @click="showEndTime">
					{{endTime ? endTime : '选择截止时间'}}
				</view>
				<tui-datetime ref="endTime" :type="2" :cancelColor="cancelColor" :color="color"
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
			<view class="task-item" v-for="item in list" @click="detail(item)">
				<image :src="item.img" mode="" class="task-pic"></image>
				<view class="task-right">
					<view class="task-title">
						{{item.Title}}
					</view>
					<view class="task-desc" v-html="item.Neirong"></view>
					<view class="task-time">
						{{item.CreateDate}}
					</view>
				</view>
			</view>
			
			<view v-if="list && list.length == 0" class="nodata-wrap flex">
				<image src="../../static/nodata.png" mode="" class="nodata-pic"></image>
				<text class="nodata-tip">暂无数据</text>
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
				jibie: 0,
				authorizeMenu: {}
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
		mounted(){
			
		},
		
		onShow(){
			this.pageIndex = 1;
			this.pullUpOn = true;
			this.getListData();
		},
		methods: {
			
			toCreateTask(){
				uni.navigateTo({
					url: '../createDangyuan/index'
				});
			},
			getListData(){
				let _this = this;
				let resData = {
					"queryJson": decodeURIComponent(JSON.stringify({
						XiangCode: _this.userinfo.XiangCode || '',
						CunCode: _this.userinfo.CunCode || '',
						Keyword: _this.keyword,
						beginTime: _this.beginTime,
						endTime: _this.endTime,
						ConType: '1'
					})),
					"rows": '5',
					"page": _this.pageIndex,
					"sidx": "CreateDate",
					"sord": "desc"
				}
				console.log(resData)
				this.tui.request('Siji/AFP_Dangjian/GetPageListJson',"GET",resData).then((res)=>{
					console.log(res)
					if(res.rows && Array.isArray(res.rows)){
						res.rows.map(item=>{
							let srcs = item.Imgs || ''
							srcs = srcs.split(";")
							srcs.map(src=>{
								if(src.indexOf('http') == -1){
									src = 'http://110.166.84.163:8001/' + src
								}
							})
							item.Imgs = srcs
							if(srcs.length > 0){
								item.img = srcs[0]
							}else{
								item.img = '../../static/task_defult.png'
							}
						})
					}
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
			detail(item){
				uni.navigateTo({
					url: '../meeting/index?id='+item.ID + '&pageTitle=党员'
				})
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
		padding: 20rpx 0;
		border-bottom: 1px solid #eee;
	}
	.task-list .task-item:last-of-type{
		border-bottom: 1px solid #eee;
		border-bottom: none;
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
