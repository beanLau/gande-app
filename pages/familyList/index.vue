<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="搜索结果"></uni-nav-bar>
		</view>
		<view class="family-list">
			<view class="family-item" v-for="item in familyList" @click="detail(item)">
				<view class="family-top">
					<view class="top-left">
						<image src="../../static/default-pic.png" mode="" class="family-pic"></image>
						<view class="family-info">
							<view class="info-top">
								<text class="family-name">{{item.Huzhu}}</text>
								<text class="family-tag">户主</text>
							</view>
							<view class="info-bottom">
								<text class="family-area">{{item.XiangName}} {{item.CunName}} </text>
							</view>
						</view>
					</view>
					<view class="top-right">
						<text class="people-count">家庭成员 {{item.Renkou}}</text>
						<uni-icons type="arrowright" :size="16" color="#aaa"></uni-icons>
					</view>
				</view>
				<view class="family-bottom">
					<view class="bottom-group">
						<text class="bottom-label">手机号码</text>
						<text class="bottom-value">{{item.Tel || '暂无'}}</text>
					</view>
					<view class="bottom-group">
						<text class="bottom-label">身份证号</text>
						<text class="bottom-value">{{item.IDCard}}</text>
					</view>
				</view>
			</view>
			
			<view v-if="familyList && familyList.length == 0" class="nodata-wrap flex">
				<image src="../../static/nodata.png" mode="" class="nodata-pic"></image>
				<text class="nodata-tip">暂无数据</text>
			</view>
		</view>
		
		<u-toast ref="uToast" />
		<!--加载loadding-->
		<tui-loadmore v-if="loadding"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn && familyList.length != 0"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
	import Decrypt from '@/common/decript.js'
	export default {
		data() {
			return {
				pageIndex: 1,
				familyList: [],
				loadData: [6,7,8,1,1,1,1],
				loadding: false,
				pullUpOn: true,
				pageIndex: 1,
				pageSize: 5,
				XiangCode: '',
				CunCode: '',
				Keyword: ''
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
						XiangCode: _this.XiangCode || '',
						CunCode: _this.CunCode || '',
						Keyword: _this.Keyword || '',
					})),
					"rows": _this.pageSize,
					"page": _this.pageIndex,
					"sidx": "XiangCode asc,CunCode",
					"sord": "asc"
				}
				console.log(resData)
				this.tui.request('Siji/AFP_Hu/GetAppHuPageListJson',"GET",resData).then((res)=>{
					console.log(res)
					if(res.type  && res.type != 1){
						_this.$refs.uToast.show({
							title: res.message
						})
						return
					}
					res.rows.map(item=>{
						if(item.IDCard){
							item.IDCard = Decrypt(item.IDCard)
						}
						if(item.Tel){
							item.Tel = Decrypt(item.Tel)
						}
					})
					if(_this.pageIndex == 1){
						_this.familyList = res.rows;
					}else{
						_this.familyList = [..._this.familyList,...res.rows]
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
					url: '../familyDetail/index?id=' + item.ID
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
.page-content{
	padding-bottom: 100rpx;
}
.family-list{
	padding: 30rpx 30rpx 0;
}
.family-item{
	margin-bottom: 28rpx;
	border:1px solid rgba(246,246,246,1);
	box-shadow:0px 0px 10px 0px rgba(170,170,170,0.1);
	border-radius: 10px;
	padding: 30rpx;
	background: #fff;
}
.family-item:last-of-type{
	margin-bottom: 0;
}
.family-top{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 26rpx;
}
.top-left{
	display: flex;
	align-items: center;
}
.family-pic{
	width: 80rpx;
	height: 80rpx;
	border-radius:50%;
}
.family-info{
	display: flex;
	flex-direction: column;
	padding-left: 20rpx;
}
.info-top{
	display: flex;
	align-items: center;
}
.family-name{
	color: #4E4E4E;
	font-size: 32rpx;
	font-weight:bold;
}
.family-tag{
	display: inline-block;
	width: 60rpx;
	text-align: center;
	height: 30rpx;
	font-size: 22rpx;
	line-height: 30rpx;
	color: #DE1727;
	border:1px solid rgba(222,23,39,1);
	border-radius:5px;
	margin-left: 16rpx;
}
.info-bottom{
}
.family-area{
	color: #aaa;
	font-size: 24rpx;
}
.top-right{
	color: #aaa;
	font-size: 24rpx;
}
.people-count{
	color: #aaa;
	font-size: 24rpx;
}
.family-bottom{
	border-top: 1px solid #eee;
	padding-top: 4rpx;
}
.bottom-group{
	margin-top: 22rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.bottom-label{
	flex-shrink: 0;
	color: #aaa;
	font-size: 24rpx;
}
.bottom-value{
	color: #4E4E4E;
	font-size: 24rpx;
}
</style>
