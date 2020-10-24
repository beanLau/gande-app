<template>
	<view class="page-content">
		<view class="navbar-wrap">
			<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="人员详情"></uni-nav-bar>
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
				其他信息
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
					<text class="group-value">{{detailData.Guer}}</text>
				</view>
				<view class="group">
					<text class="group-label">养老、高龄</text>
					<text class="group-value">{{detailData.Gaoling}}</text>
				</view>
				<view class="group">
					<text class="group-label">参保</text>
					<text class="group-value">{{detailData.Canbao}}</text>
				</view>
				<view class="group">
					<text class="group-label">村干部</text>
					<text class="group-value">{{detailData.Ganbu}}</text>
				</view>
				<view class="group">
					<text class="group-label">党员</text>
					<text class="group-value">{{detailData.Dangyuan}}</text>
				</view>
				<view class="group">
					<text class="group-label">公益性岗位</text>
					<text class="group-value">{{detailData.Gongyigang}}</text>
				</view>
				<view class="group">
					<text class="group-label">重点人员</text>
					<text class="group-value">{{detailData.Zhongdian}}</text>
				</view>
				<view class="group">
					<text class="group-label">四大疾病</text>
					<text class="group-value">{{detailData.JibingName || '无'}}</text>
				</view>
				<view class="group">
					<text class="group-label">僧侣</text>
					<text class="group-value">{{detailData.Senglv}}</text>
				</view>
				<view class="group">
					<text class="group-label">管护员</text>
					<text class="group-value">{{detailData.GuanhuyuanName || ''}}</text>
				</view>
				<view class="group">
					<text class="group-label">雨露计划</text>
					<text class="group-value">{{detailData.YuluJihua}}</text>
				</view>
				<view class="group">
					<text class="group-label">技能培训</text>
					<text class="group-value">{{detailData.JinengPeixun}}</text>
				</view>
			</view>
			<view class="group-title" style="margin-top: 40rpx;">
				证件信息
			</view>
			<view class="report-content">
				<view class="group">
					<text class="group-label">身份证正面</text>
					<view class="group-value img-list">
						<image :src="detailData.CardImg1" mode="" class="img-item" @click="previewImg(detailData.CardImg1)"></image>
					</view>
				</view>
				<view class="group">
					<text class="group-label">身份证反面</text>
					<view class="group-value img-list">
						<image :src="detailData.CardImg2" mode="" class="img-item" @click="previewImg(detailData.CardImg2)"></image>
					</view>
				</view>
				<view class="group">
					<text class="group-label">户口本</text>
					<view class="group-value img-list">
						<image v-for="(item,index) in detailData.HukouImg" :src="item" mode="" class="img-item" @click="previewImg(detailData.HukouImg,index)"></image>
					</view>
				</view>
				<view class="group">
					<text class="group-label">残疾证</text>
					<view class="group-value img-list">
						<image v-for="(item,index) in detailData.CanjiImg" :src="item" mode="" class="img-item" @click="previewImg(detailData.CanjiImg,index)"></image>
					</view>
				</view>
				
				<view class="group">
					<text class="group-label">低保证</text>
					<view class="group-value img-list">
						<image v-for="(item,index) in detailData.DibaoImg" :src="item" mode="" class="img-item" @click="previewImg(detailData.DibaoImg,index)"></image>
					</view>
				</view>
				
				<view class="group">
					<text class="group-label">其他证件</text>
					<view class="group-value img-list">
						<image v-for="(item,index) in detailData.QitaImg" :src="item" mode="" class="img-item" @click="previewImg(detailData.QitaImg,index)"></image>
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
			previewImg(imgs,index = 0){
				if(!Array.isArray(imgs)){
					imgs = [imgs]
				}
				uni.previewImage({
					current: imgs[index],
					urls: imgs
				});
				
			},
			getDetail(){
				console.log(this.id)
				let _this = this;
				this.tui.request("Siji/AFP_HuRenkou/GetFormJson?keyValue=" + this.id,"get",{
					keyValue: this.id
				}).then((res)=>{
					console.log(res)
					// if(res.IDCard){
					// 	res.IDCard = Decrypt(res.IDCard)
					// }
					// if(res.Tel){
					// 	res.Tel = Decrypt(res.Tel)
					// }
					if(res.HeadImg){
						let HeadImg = res.HeadImg.split(";")
						HeadImg = HeadImg.map(item=>{
							if(item){
								return 'http://110.166.84.163:8001/' + item
							}
						})
						res.HeadImg = HeadImg.filter(item=>{
							return !!item
						})
					}
					if(res.CardImg1){
						res.CardImg1 = 'http://110.166.84.163:8001/' + res.CardImg1
						res.CardImg1 = res.CardImg1.replace(';','')
					}
					if(res.CardImg2){
						res.CardImg2 = 'http://110.166.84.163:8001/' + res.CardImg2
						res.CardImg2 = res.CardImg2.replace(';','')
					}
					if(res.HukouImg){
						let HukouImg = res.HukouImg.split(";")
						HukouImg = HukouImg.map(item=>{
							if(item){
								return 'http://110.166.84.163:8001/' + item
							}
						})
						res.HukouImg = HukouImg.filter(item=>{
							return !!item
						})
					}
					if(res.CanjiImg){
						let CanjiImg = res.CanjiImg.split(";")
						CanjiImg = CanjiImg.map(item=>{
							if(item){
								return 'http://110.166.84.163:8001/' + item
							}
						})
						res.CanjiImg = CanjiImg.filter(item=>{
							return !!item
						})
					}
					if(res.DibaoImg){
						let DibaoImg = res.DibaoImg.split(";")
						DibaoImg = DibaoImg.map(item=>{
							if(item){
								return 'http://110.166.84.163:8001/' + item
							}
						})
						res.DibaoImg = DibaoImg.filter(item=>{
							return !!item
						})
					}
					if(res.QitaImg){
						let QitaImg = res.QitaImg.split(";")
						QitaImg = QitaImg.map(item=>{
							if(item){
								return 'http://110.166.84.163:8001/' + item
							}
						})
						res.QitaImg = QitaImg.filter(item=>{
							return !!item
						})
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
