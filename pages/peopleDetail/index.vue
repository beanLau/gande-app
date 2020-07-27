<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="户档案详情"></uni-nav-bar>
		</view>
		<view class="householder-wrap">
			<view class="group-title">
				个人信息
			</view>
			<view class="family-item" style="margin-bottom: 20rpx;">
				<view class="family-top">
					<view class="top-left">
						<image :src="detailData.HeadImg || '../../static/default-pic.png'" mode="" class="family-pic"></image>
						<view class="family-info">
							<view class="info-top">
								<text class="family-name">{{detailData.Name}}</text>
								<text class="family-sex">{{detailData.Sex}}</text>
								<text class="family-age">{{detailData.Age}}</text>
							</view>
							<view class="info-bottom">
								<text class="family-area">{{detailData.XiangName}} {{detailData.CunName}} </text>
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
					<text class="group-label">残疾</text>
					<text class="group-value">{{detailData.CanjiName}}</text>
				</view>
				<view class="group">
					<text class="group-label">教育程度</text>
					<text class="group-value">{{detailData.JiaoyuName}}</text>
				</view>
				<view class="group">
					<text class="group-label">孤儿及困境儿童</text>
					<text class="group-value">{{detailData.Guer ? '是':'否'}}</text>
				</view>
				<view class="group">
					<text class="group-label">养老、高龄</text>
					<text class="group-value">{{detailData.Gaoling ? '是':'否'}}</text>
				</view>
				<view class="group">
					<text class="group-label">参保</text>
					<text class="group-value">{{detailData.Canbao ? '是':'否'}}</text>
				</view>
				<view class="group">
					<text class="group-label">村干部</text>
					<text class="group-value">{{detailData.Ganbu ? '是':'否'}}</text>
				</view>
				<view class="group">
					<text class="group-label">党员</text>
					<text class="group-value">{{detailData.Dangyuan ? '是':'否'}}</text>
				</view>
				<view class="group">
					<text class="group-label">公益性岗位</text>
					<text class="group-value">{{detailData.Gongyigang ? '是':'否'}}</text>
				</view>
				<view class="group">
					<text class="group-label">重点人员</text>
					<text class="group-value">{{detailData.Zhongdian ? '是':'否'}}</text>
				</view>
				<view class="group">
					<text class="group-label">四大疾病</text>
					<text class="group-value">{{detailData.JibingName || '无'}}</text>
				</view>
				<view class="group">
					<text class="group-label">僧侣</text>
					<text class="group-value">{{detailData.Senglv ? '是':'否'}}</text>
				</view>
				<view class="group">
					<text class="group-label">管护员</text>
					<text class="group-value">{{detailData.GuanhuyuanName ? '是':'否'}}</text>
				</view>
				<view class="group">
					<text class="group-label">雨露计划</text>
					<text class="group-value">{{detailData.YuluJihua ? '是':'否'}}</text>
				</view>
				<view class="group">
					<text class="group-label">技能培训</text>
					<text class="group-value">{{detailData.JinengPeixun ? '是':'否'}}</text>
				</view>
			</view>
			<view class="group-title" style="margin-top: 40rpx;">
				证件信息
			</view>
			<view class="report-content">
				<view class="group">
					<text class="group-label">身份证正面</text>
					<view class="group-value img-list">
						<image :src="detailData.CardImg1" mode="" class="img-item"></image>
					</view>
				</view>
				<view class="group">
					<text class="group-label">身份证反面</text>
					<view class="group-value img-list">
						<image :src="detailData.CardImg2" mode="" class="img-item"></image>
					</view>
				</view>
				<view class="group">
					<text class="group-label">户口本</text>
					<view class="group-value img-list">
						<image :src="detailData.HukouImg" mode="" class="img-item"></image>
					</view>
				</view>
				<view class="group">
					<text class="group-label">残疾证</text>
					<view class="group-value img-list">
						<image :src="detailData.CanjiImg" mode="" class="img-item"></image>
					</view>
				</view>
				
				<view class="group">
					<text class="group-label">低保证</text>
					<view class="group-value img-list">
						<image :src="detailData.DibaoImg" mode="" class="img-item"></image>
					</view>
				</view>
				
				<view class="group">
					<text class="group-label">其他证件</text>
					<view class="group-value img-list">
						<image :src="detailData.QitaImg" mode="" class="img-item"></image>
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
				detailData: {}
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
				console.log(this.id)
				let _this = this;
				this.tui.request("Siji/AFP_HuRenkou/GetFormJson?keyValue=1fabcf7c-d5d1-4d86-9202-cf8de7bb49b0"+this.id,"get",{
					keyValue: this.id
				}).then((res)=>{
					if(res.IDCard){
						res.IDCard = Decrypt(res.IDCard)
					}
					if(res.Tel){
						res.Tel = Decrypt(res.Tel)
					}
					if(res.HeadImg){
						res.HeadImg = '' + res.HeadImg
					}
					if(res.CardImg1){
						res.CardImg1 = '' + res.CardImg1
					}
					if(res.CardImg2){
						res.CardImg2 = '' + res.CardImg2
					}
					if(res.HukouImg){
						res.HukouImg = '' + res.HukouImg
					}
					if(res.CanjiImg){
						res.CanjiImg = '' + res.CanjiImg
					}
					if(res.DibaoImg){
						res.DibaoImg = '' + res.DibaoImg
					}
					if(res.QitaImg){
						res.QitaImg = '' + res.QitaImg
					}
					this.detailData = res || {}
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
.img-list{
	display: flex;
	flex-direction: column;
}
.img-item{
	width: 320rpx;
	height: 180rpx;
	margin-bottom: 30rpx;
}
.light-hight{
	color: #DE1727;
}
</style>
