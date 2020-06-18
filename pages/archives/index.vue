<template>
	<view class="page-content">
		<image src="../../static/top-bg.png" mode="scaleToFill" class="top-bg"></image>
		<view class="bg-white padding">
			<view class="filter-list">
				<view class="filter-item">
					<view class="cu-form-group">
						<picker @change="PickerChange" :range="picker">
							<view class="picker">
								全部乡镇
							</view>
						</picker>
					</view>
				</view>
				<view class="filter-item">
					<view class="cu-form-group">
						<picker @change="PickerChange" :range="picker2">
							<view class="picker">
								全部村
							</view>
						</picker>
					</view>
				</view>
				<view class="filter-item">
					<text>户高级检索</text>
				</view>
				<view class="filter-item">
					<text>人高级检索</text>
				</view>
			</view>
		</view>
		<view class="list-title">
			人员列表
		</view>
		<view class="people-list">
			<view class="people-item flex">
				<image class="people-pic" src="../../static/swiper3.jpg" mode="aspectFill"></image>
				<view class="people-right">
					<view class="people-top">
						<text>刘德华</text>
						<text>柯曲镇</text>
						<text>达协村</text>
						<text>户主</text>
						<text>男</text>
					</view>
					<view class="people-middle">
						<text>家庭成员 2</text>
						<text>手机号码 18222882288</text>
					</view>
					<view class="people-bottom">
						身份证号 130666990999099909
					</view>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="people-item flex">
				<image class="people-pic" src="../../static/swiper3.jpg" mode="aspectFill"></image>
				<view class="people-right">
					<view class="people-top">
						<text>刘德华</text>
						<text>柯曲镇</text>
						<text>达协村</text>
						<text>户主</text>
						<text>男</text>
					</view>
					<view class="people-middle">
						<text>家庭成员 2</text>
						<text>手机号码 18222882288</text>
					</view>
					<view class="people-bottom">
						身份证号 130666990999099909
					</view>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="people-item flex">
				<image class="people-pic" src="../../static/swiper3.jpg" mode="aspectFill"></image>
				<view class="people-right">
					<view class="people-top">
						<text>刘德华</text>
						<text>柯曲镇</text>
						<text>达协村</text>
						<text>户主</text>
						<text>男</text>
					</view>
					<view class="people-middle">
						<text>家庭成员 2</text>
						<text>手机号码 18222882288</text>
					</view>
					<view class="people-bottom">
						身份证号 130666990999099909
					</view>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="people-item flex">
				<image class="people-pic" src="../../static/swiper3.jpg" mode="aspectFill"></image>
				<view class="people-right">
					<view class="people-top">
						<text>刘德华</text>
						<text>柯曲镇</text>
						<text>达协村</text>
						<text>户主</text>
						<text>男</text>
					</view>
					<view class="people-middle">
						<text>家庭成员 2</text>
						<text>手机号码 18222882288</text>
					</view>
					<view class="people-bottom">
						身份证号 130666990999099909
					</view>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="people-item flex">
				<image class="people-pic" src="../../static/swiper3.jpg" mode="aspectFill"></image>
				<view class="people-right">
					<view class="people-top">
						<text>刘德华</text>
						<text>柯曲镇</text>
						<text>达协村</text>
						<text>户主</text>
						<text>男</text>
					</view>
					<view class="people-middle">
						<text>家庭成员 2</text>
						<text>手机号码 18222882288</text>
					</view>
					<view class="people-bottom">
						身份证号 130666990999099909
					</view>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="people-item flex">
				<image class="people-pic" src="../../static/swiper3.jpg" mode="aspectFill"></image>
				<view class="people-right">
					<view class="people-top">
						<text>刘德华</text>
						<text>柯曲镇</text>
						<text>达协村</text>
						<text>户主</text>
						<text>男</text>
					</view>
					<view class="people-middle">
						<text>家庭成员 2</text>
						<text>手机号码 18222882288</text>
					</view>
					<view class="people-bottom">
						身份证号 130666990999099909
					</view>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="people-item flex">
				<image class="people-pic" src="../../static/swiper3.jpg" mode="aspectFill"></image>
				<view class="people-right">
					<view class="people-top">
						<text>刘德华</text>
						<text>柯曲镇</text>
						<text>达协村</text>
						<text>户主</text>
						<text>男</text>
					</view>
					<view class="people-middle">
						<text>家庭成员 2</text>
						<text>手机号码 18222882288</text>
					</view>
					<view class="people-bottom">
						身份证号 130666990999099909
					</view>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="people-item flex">
				<image class="people-pic" src="../../static/swiper3.jpg" mode="aspectFill"></image>
				<view class="people-right">
					<view class="people-top">
						<text>刘德华</text>
						<text>柯曲镇</text>
						<text>达协村</text>
						<text>户主</text>
						<text>男</text>
					</view>
					<view class="people-middle">
						<text>家庭成员 2</text>
						<text>手机号码 18222882288</text>
					</view>
					<view class="people-bottom">
						身份证号 130666990999099909
					</view>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="people-item flex">
				<image class="people-pic" src="../../static/swiper3.jpg" mode="aspectFill"></image>
				<view class="people-right">
					<view class="people-top">
						<text>刘德华</text>
						<text>柯曲镇</text>
						<text>达协村</text>
						<text>户主</text>
						<text>男</text>
					</view>
					<view class="people-middle">
						<text>家庭成员 2</text>
						<text>手机号码 18222882288</text>
					</view>
					<view class="people-bottom">
						身份证号 130666990999099909
					</view>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="people-item flex">
				<image class="people-pic" src="../../static/swiper3.jpg" mode="aspectFill"></image>
				<view class="people-right">
					<view class="people-top">
						<text>刘德华</text>
						<text>柯曲镇</text>
						<text>达协村</text>
						<text>户主</text>
						<text>男</text>
					</view>
					<view class="people-middle">
						<text>家庭成员 2</text>
						<text>手机号码 18222882288</text>
					</view>
					<view class="people-bottom">
						身份证号 130666990999099909
					</view>
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picker: ['柯曲镇', '上贡麻乡', '下贡麻乡', '岗龙乡', '江千乡', '下藏科乡', '青珍乡'],
				picker2: ['达协', '曲纳合', '德肉', '德里尖', '当成', '目日', '阿隆'],
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: ''
			};
		},
		onLoad() {
			this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
		}
	}
</script>

<style>
	.page-content{
		padding-bottom: 120upx;
	}
	
	.top-bg{
		width: 100%;
		height: 140upx;
	}
	.filter-list{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.filter-item{
		width: calc(25% - 10px);
		text-align: center;
		border: 1px solid #ccc;
		border-radius: 2upx;
	}
	.filter-item > text{
		height: 50upx;
		line-height: 50upx;
	}
	.cu-form-group{
		min-height: 30upx;
		height: 50upx;
		line-height: 50upx;
		padding: 0.5upx 5upx;
	}
	.list-title{
		position: relative;
		height: 80upx;
		font-size: 40upx;
		line-height: 80upx;
		padding-left: 40upx;
		color: #666;
		font-size: 32upx;
	}
	.list-title::after{
		position: absolute;
		content: "";
		left: 20upx;
		top: 22upx;
		width: 6upx;
		height: 30upx;
		background: red;
	}
	.people-list{
		padding: 0 32upx;
		background: #fff;
	}
	.people-item{
		border-bottom: 1upx solid #ccc;
		background: #fff;
		padding: 20upx 0;
		display: flex;
		align-items: center;
	}
	.people-item .text-gray{
		width: 20upx;
	}	.people-pic{
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
	}	.people-right{
		width: calc(100% - 100upx);
		padding-left: 20upx;
	}	.people-top{
		color: #333;
		font-size: 28upx;
	}
	.people-top text{
		margin-right: 20upx;
	}	.people-middle{
		color: #999;
		font-size: 24upx;
	}
	.people-middle text{
		margin-right: 20upx;
	}	.people-bottom{
		color: #999;
		font-size: 24upx;
	}
	.people-bottom text{
		margin-right: 20upx;
	}
</style>
