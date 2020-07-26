<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="户档案详情"></uni-nav-bar>
		</view>
		<view class="householder-wrap">
			<view class="group-title">
				户主信息
			</view>
			<view class="family-item" style="margin-bottom: 20rpx;">
				<view class="family-top">
					<view class="top-left">
						<image src="../../static/default-pic.png" mode="" class="family-pic"></image>
						<view class="family-info">
							<view class="info-top">
								<text class="family-name">{{detailData.Name}}</text>
								<text class="family-sex">{{detailData.Sex || ''}}</text>
								<text class="family-age">{{detailData.Age || ''}}</text>
							</view>
							<view class="info-bottom">
								<text class="family-area">{{detailData.XiangName}} {{detailData.CunName}} 家庭成员  </text>
							</view>
						</view>
					</view>
				</view>
				<view class="family-bottom">
					<view class="bottom-group">
						<text class="bottom-label">手机号码</text>
						<text class="bottom-value">{{detailData.Tel}}</text>
					</view>
					<view class="bottom-group">
						<text class="bottom-label">身份证号</text>
						<text class="bottom-value">{{detailData.IDCard}}</text>
					</view>
				</view>
			</view>
			<view class="group-title" style="margin-top: 40rpx;">
				户信息
			</view>
			<view class="report-content">
				<view class="group">
					<text class="group-label">低保</text>
					<text class="group-value">{{hudata.DibaoName}}</text>
				</view>
				<view class="group">
					<text class="group-label">房屋</text>
					<text class="group-value">{{hudata.FangziName}}</text>
				</view>
				<view class="group">
					<text class="group-label">特困</text>
					<text class="group-value">{{hudata.Tekun ? '是':'否'}}</text>
				</view>
				<view class="group">
					<text class="group-label">草补</text>
					<text class="group-value">{{hudata.Caobu ? '有':'无'}}</text>
				</view>
				<view class="group">
					<text class="group-label">林补</text>
					<text class="group-value">{{hudata.Linbu ? '有':'无'}}</text>
				</view>
				<view class="group">
					<text class="group-label">保险</text>
					<text class="group-value">{{hudata.BaoxianName}}</text>
				</view>
				<view class="group">
					<text class="group-label">饮水</text>
					<text class="group-value">{{hudata.YinshuiName}}</text>
				</view>
				<view class="group">
					<text class="group-label">用电</text>
					<text class="group-value">{{hudata.YongdianName}}</text>
				</view>
				<view class="group">
					<text class="group-label">户厕</text>
					<text class="group-value">{{hudata.Cesuo}}</text>
				</view>
				<view class="group">
					<text class="group-label">路</text>
					<text class="group-value">{{hudata.Lu}}</text>
				</view>
				<view class="group">
					<text class="group-label">就业</text>
					<text class="group-value">{{hudata.JiuyeName}}</text>
				</view>
				<view class="group">
					<text class="group-label">信贷</text>
					<text class="group-value">{{hudata.XindaiName}}</text>
				</view>
				<view class="group">
					<text class="group-label">信号</text>
					<text class="group-value">{{hudata.Xinhao}}</text>
				</view>
				<view class="group">
					<text class="group-label">牲畜</text>
					<text class="group-value">{{hudata.Shengchu}}</text>
				</view>
				<view class="group">
					<text class="group-label">五星级文明户</text>
					<text class="group-value">{{hudata.Wuxing}}</text>
				</view>
				<view class="group">
					<text class="group-label">扶贫产业</text>
					<text class="group-value">{{hudata.Chanye}}</text>
				</view>
				<view class="group">
					<text class="group-label">村集体经济</text>
					<text class="group-value">{{hudata.Cunjinji}}</text>
				</view>
				<view class="group">
					<text class="group-label">合作社</text>
					<text class="group-value">{{hudata.Hezuoshe}}</text>
				</view>
			</view>
		</view>
		<view class="family-list">
			<view class="group-title">
				家庭成员信息
			</view>
			<view class="family-item" v-for="item in familyList" @click="detail">
				<view class="family-top">
					<view class="top-left">
						<image src="../../static/default-pic.png" mode="" class="family-pic"></image>
						<view class="family-info">
							<view class="info-top">
								<text class="family-name">张伟民</text>
							</view>
							<view class="info-bottom">
								<text class="family-area">上贡麻乡 田共村 </text>
							</view>
						</view>
					</view>
					<view class="top-right">
						<uni-icons type="arrowright" :size="16" color="#aaa"></uni-icons>
					</view>
				</view>
				<view class="family-bottom">
					<view class="bottom-group">
						<text class="bottom-label">手机号码</text>
						<text class="bottom-value">18800000000</text>
					</view>
					<view class="bottom-group">
						<text class="bottom-label">身份证号</text>
						<text class="bottom-value">110506197804230381</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Decrypt from '@/common/decript.js'
	export default {
		data() {
			return {
				pageIndex: 1,
				familyList: [1,2,3,4,5],
				id:'',
				detailData: {},
				hudata: {}
			}
		},
		onLoad(opt){
			this.id = opt.id
		},
		mounted(){
			this.getDetail();
		},
		methods: {
			getDetail(){
				let _this = this;
				this.tui.request("Siji/AFP_Hu/GetAppFormJson?keyValue=1fabcf7c-d5d1-4d86-9202-cf8de7bb49b0"+this.id,"get",{
					keyValue: this.id
				}).then((res)=>{
					if(res.huzhudata.IDCard){
						res.huzhudata.IDCard = Decrypt(res.huzhudata.IDCard)
					}
					if(res.huzhudata.Tel){
						res.huzhudata.Tel = Decrypt(res.huzhudata.Tel)
					}
					this.detailData = res.huzhudata || {}
					this.hudata = res.hudata || {}
					console.log(res)
				})
			},
			pageBack(){
				uni.navigateBack()
			},
			detail(){
				uni.navigateTo({
					url: '../peopleDetail/index'
				})
			}
		}
	}
</script>

<style>
.page-content{
}
.householder-wrap{
	padding: 32rpx 32rpx 0;
}
.group-title{
	padding: 4upx 0;
	color: #2E2E2E;
	font-size: 32upx;
	font-weight: bold;
	line-height: 1;
	position: relative;
	padding-left: 22upx;
	margin-bottom: 30rpx;
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
.family-list{
	padding: 30rpx;
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
.family-sex{
	color: #4E4E4E;
	font-size: 24rpx;
	margin-left: 46rpx;
}
.family-age{
	color: #4E4E4E;
	font-size: 24rpx;
	margin-left: 35rpx;
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
	color: #aaa;
	font-size: 24rpx;
}
.bottom-value{
	color: #4E4E4E;
	font-size: 24rpx;
}



.report-content{
	background: #fff;
	margin: 0;
	border-top: 1px solid #eee;
	padding: 30upx;
}
.report-title{
	color: #2E2E2E;
	font-size: 38upx;
	font-weight: bold;
	margin-bottom: 45upx;
}
.group{
	display: flex;
	align-items: flex-start;
	margin-bottom: 42upx;
}
.group-label{
	color: #bbb;
	font-size: 28upx;
	width: 180upx;
	flex-shrink: 0;
}
.group-value{
	font-size: 28upx;
	color: #4E4E4E;
	padding-left: 50upx;
	flex-grow: 1;
}
.light-hight{
	color: #DE1727;
}
</style>
