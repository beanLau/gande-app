<template>
	<view class="container">
		
		<!--screen-->
		<view class="tui-header-screen">
			<uni-nav-bar status-bar right-text="发布任务" @clickRight="toCreateTask"	color="#fff" fixed background-color="#DE1727" title="上传下达"></uni-nav-bar>
			<view class="tui-screen-top">
				<view class="tui-top-item tui-icon-ml" @click="showFilterTime()">
					<view>日期</view>
					<tui-icon name="arrowdown" :size="14" color="#444"></tui-icon>
				</view>
				<tui-datetime ref="filterTime" :type="3" :cancelColor="cancelColor" :color="color"
				 :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="changeFilterTime"></tui-datetime>
				<view class="tui-top-item tui-icon-ml" :class="[degreeId ? 'tui-active tui-bold' : '']" data-index="0" @tap="showFilterDegree">
					<view>{{degreeName}}</view>
					<tui-icon :name="degreeH > 0 ? 'arrowup' : 'arrowdown'" :size="14" :color="degreeId ? '#e41f19' : '#444'"></tui-icon>
				</view>

				<!--下拉选择列表--紧急程度-->
				<view class="tui-dropdownlist" :class="[degreeH > 0 ? 'tui-dropdownlist-show' : '']" :style="{ height: degreeH + 'rpx' }">
					<view
						class="tui-dropdownlist-item tui-icon-middle"
						:class="[item.selected ? 'tui-bold' : '']"
						v-for="(item, index) in degreeList"
						:key="index"
						@tap.stop="selectDegree"
						:data-index="index"
					>
						<text class="tui-ml tui-middle">{{ item.name }}</text>
						<tui-icon name="check" :size="16" color="#e41f19" :bold="true" v-if="item.selected"></tui-icon>
					</view>
				</view>
				<view class="tui-dropdownlist-mask" :class="[degreeH > 0 ? 'tui-mask-show' : '']" @tap.stop="hideFilterDegree"></view>
				<!--下拉选择列表--紧急程度-->
				
				
				<view class="tui-top-item tui-icon-ml" :class="[typeId ? 'tui-active tui-bold' : '']" data-index="0" @tap="showFilterType">
					<view>{{typeName}}</view>
					<tui-icon :name="typeH > 0 ? 'arrowup' : 'arrowdown'" :size="14" :color="typeId ? '#e41f19' : '#444'"></tui-icon>
				</view>
				
				<!--下拉选择列表--类型-->
				<view class="tui-dropdownlist" :class="[typeH > 0 ? 'tui-dropdownlist-show' : '']" :style="{ height: typeH + 'rpx' }">
					<view
						class="tui-dropdownlist-item tui-icon-middle"
						:class="[item.selected ? 'tui-bold' : '']"
						v-for="(item, index) in typeList"
						:key="index"
						@tap.stop="selectType"
						:data-index="index"
					>
						<text class="tui-ml tui-middle">{{ item.name }}</text>
						<tui-icon name="check" :size="16" color="#e41f19" :bold="true" v-if="item.selected"></tui-icon>
					</view>
				</view>
				<view class="tui-dropdownlist-mask" :class="[typeH > 0 ? 'tui-mask-show' : '']" @tap.stop="hideFilterType"></view>
				<!--下拉选择列表--类型-->

				<view class="tui-top-item tui-icon-ml" :class="[statusId ? 'tui-active tui-bold' : '']" data-index="0" @tap="showFilterStatus">
					<view>{{statusName}}</view>
					<tui-icon :name="statusH > 0 ? 'arrowup' : 'arrowdown'" :size="14" :color="statusId ? '#e41f19' : '#444'"></tui-icon>
				</view>
				
				<!--下拉选择列表--分类-->
				<view class="tui-dropdownlist" :class="[statusH > 0 ? 'tui-dropdownlist-show' : '']" :style="{ height: statusH + 'rpx' }">
					<view
						class="tui-dropdownlist-item tui-icon-middle"
						:class="[item.selected ? 'tui-bold' : '']"
						v-for="(item, index) in statusList"
						:key="index"
						@tap.stop="selectStatus"
						:data-index="index"
					>
						<text class="tui-ml tui-middle">{{ item.name }}</text>
						<tui-icon name="check" :size="16" color="#e41f19" :bold="true" v-if="item.selected"></tui-icon>
					</view>
				</view>
				<view class="tui-dropdownlist-mask" :class="[statusH > 0 ? 'tui-mask-show' : '']" @tap.stop="hideFilterStatus"></view>
				<!--下拉选择列表--分类-->
				
			</view>
		</view>
		<!--screen-->

		<!--list-->
		<view class="tui-product-list">
			<view class="tui-product-container">
				<block v-for="(item, index) in productList" :key="index">
					<!-- <template is="productItem" data="{{item,index:index,isList:isList}}" /> -->
					<!--商品列表-->
					<view class="tui-pro-item tui-flex-list" hover-class="hover" :hover-start-time="150" @tap="detail">
						<view class="item-top">
							<tui-tag margin="0 15upx 0 0" padding="8rpx" type="danger" size="24rpx">任务</tui-tag>
							<view>甘德县政府工作报告准时发布</view>
						</view>
						<view class="item-desc">
							具体工作内容：甘德县政府报告准时发布甘德县政府报告准时发布甘德县政府报告准时发布
						</view>
						<view class="bottom-wrap">
							<view class="bottom-left">
								<tui-tag padding="8rpx" size="24rpx" type="light-blue">
									<tui-icon name="about" :size="10" color="#4B8AFC"></tui-icon>
									<text>紧急</text>
								</tui-tag>
								<tui-tag margin="0 15upx" padding="8rpx" type="light-orange" size="24rpx">扶贫</tui-tag>
								<view class="bottom-time">
									县政府  2020-06-01
								</view>
							</view>
							<view class="item-status">
								待处理
							</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</view>
		</view>

		<!--list-->

		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn && isList" backgroundColor="#f7f7f7"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
export default {
	data() {
		return {
			cancelColor: '#888',
			color: '#5677fc',
			setDateTime: '',
			result: '',
			unitTop: false,
			radius: false, //日期相关参数
			
			degreeH: 0,
			degreeName: '紧急程度',
			degreeId: '',
			degreeList: [{
				id: '1',
				name: '一般',
				selected: false
			},{
				id: '2',
				name: '紧急',
				selected: false
			},{
				id: '3',
				name: '特急',
				selected: false
			}], //紧急程度相关参数
			
			typeH: 0,
			typeName: '类型',
			typeId: '',
			typeList: [{
				id: '1',
				name: '问题',
				selected: false
			},{
				id: '2',
				name: '任务',
				selected: false
			}], //类型相关参数
			
			statusH: 0,
			statusName: '状态',
			statusId: '',
			statusList: [{
				id: '1',
				name: '进行中',
				selected: false
			},{
				id: '2',
				name: '待处理',
				selected: false
			},{
				id: '3',
				name: '已完成',
				selected: false
			}],//类型筛选相关参数
			
			dropScreenH: 200, //下拉筛选框距顶部距离
			attrData: [],
			attrIndex: -1,
			dropScreenShow: true,
			scrollTop: 0,
			tabIndex: 0, //顶部筛选索引
			isList: true, //是否以列表展示  | 列表或大图
			drawer: false,
			drawerH: 0, //抽屉内部scrollview高度
			selectedName: '综合',
			selectH: 0,
			dropdownList: [
				{
					name: '综合',
					selected: true
				},
				{
					name: '价格升序',
					selected: false
				},
				{
					name: '价格降序',
					selected: false
				}
			],
			productList: [
				{
					img: 1,
					name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）',
					sale: 599,
					factory: 899,
					payNum: 2342
				},
				{
					img: 2,
					name: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
					sale: 29,
					factory: 69,
					payNum: 999
				},
				{
					img: 3,
					name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
					sale: 299,
					factory: 699,
					payNum: 666
				},
				{
					img: 4,
					name: '百雀羚套装女补水保湿护肤品',
					sale: 1599,
					factory: 2899,
					payNum: 236
				},
				{
					img: 5,
					name: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',
					sale: 599,
					factory: 899,
					payNum: 2399
				},
				{
					img: 6,
					name: '短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤',
					sale: 599,
					factory: 899,
					payNum: 2399
				},
				{
					img: 1,
					name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜',
					sale: 599,
					factory: 899,
					payNum: 2342
				},
				{
					img: 2,
					name: '德国DMK进口牛奶',
					sale: 29,
					factory: 69,
					payNum: 999
				},
				{
					img: 3,
					name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
					sale: 299,
					factory: 699,
					payNum: 666
				},
				{
					img: 4,
					name: '百雀羚套装女补水保湿护肤品',
					sale: 1599,
					factory: 2899,
					payNum: 236
				}
			],
			pageIndex: 1,
			loadding: false,
			pullUpOn: true
		};
	},
	onLoad: function(options) {
		let obj = {};
		// #ifdef MP-WEIXIN
		obj = wx.getMenuButtonBoundingClientRect();
		// #endif
		// #ifdef MP-BAIDU
		obj = swan.getMenuButtonBoundingClientRect();
		// #endif
		// #ifdef MP-ALIPAY
		my.hideAddToDesktopMenu();
		// #endif
		uni.getSystemInfo({
			success: res => {
				this.width = obj.left || res.windowWidth;
				this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
				this.inputTop = obj.top ? obj.top + (obj.height - 30) / 2 : res.statusBarHeight + 7;
				this.arrowTop = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
				//略小，避免误差带来的影响
				this.dropScreenH = (this.height * 750) / res.windowWidth + 20;
				this.drawerH = res.windowHeight - uni.upx2px(150) - this.height;
			}
		});
	},
	methods: {
		showFilterTime(){
			this.$refs.filterTime.show();
		},
		changeFilterTime(e){
			this.taskMonth = e.result;
			//获取到日期后，更新当前日期，调用获取列表数据方法
		},
		px(num) {
			return uni.upx2px(num) + 'px';
		},

		//显示紧急程度筛选相关事件begin
		showFilterDegree(){
			this.degreeH = 246;
			this.tabIndex = 0;
		},
		selectDegree(e){
			let eindex = e.currentTarget.dataset.index;
			if(this.degreeList[eindex].selected){
				this.degreeList[eindex].selected = false
				this.degreeName = "紧急程度"
				this.degreeId = ''
			}else{
				this.degreeList.map((item,index)=>{
					if (eindex === index) {
						item.selected = true;
						this.degreeName = item.name
						this.degreeId = item.id
					} else {
						item.selected = false;
					}
				})
			}
			this.degreeH = 0;
		},
		hideFilterDegree(){
			this.degreeH = 0;
		},
		//显示紧急程度筛选相关事件end

		//显示类别筛选相关事件begin
		showFilterType(){
			this.typeH = 246;
			this.tabIndex = 1;
		},
		selectType(e){
			let eindex = e.currentTarget.dataset.index;
			if(this.typeList[eindex].selected){
				this.typeList[eindex].selected = false
				this.typeName = "类型"
				this.typeId = ''
			}else{
				this.typeList.map((item,index)=>{
					if (eindex === index) {
						item.selected = true;
						this.typeName = item.name
						this.typeId = item.id
					} else {
						item.selected = false;
					}
				})
			}
			this.typeH = 0;
		},
		hideFilterType(){
			this.typeH = 0;
		},
		//显示类别筛选相关事件end

		//显示分类筛选相关事件begin
		showFilterStatus(){
			this.statusH = 246;
			this.tabIndex = 1;
		},
		selectStatus(e){
			let eindex = e.currentTarget.dataset.index;
			if(this.statusList[eindex].selected){
				this.statusList[eindex].selected = false
				this.statusName = "类型"
				this.statusId = ''
			}else{
				this.statusList.map((item,index)=>{
					if (eindex === index) {
						item.selected = true;
						this.statusName = item.name
						this.statusId = item.id
					} else {
						item.selected = false;
					}
				})
			}
			this.statusH = 0;
		},
		hideFilterStatus(){
			this.statusH = 0;
		},
		//显示分类筛选相关事件end
		
		showDropdownList: function() {
			this.selectH = 246;
			this.tabIndex = 0;
		},
		hideDropdownList: function() {
			this.selectH = 0;
		},
		screen: function(e) {
			let index = e.currentTarget.dataset.index;
			this.hideDropdownList();
			this.btnCloseDrop();
			if (index == 0) {
				this.showDropdownList();
			} else if (index == 1) {
				this.tabIndex = 1;
			} else if (index == 2) {
				this.isList = !this.isList;
			} else if (index == 3) {
				this.drawer = true;
			}
		},
		closeDrawer: function() {
			this.drawer = false;
		},
		back: function() {
			if (this.drawer) {
				this.closeDrawer();
			} else {
				uni.navigateBack();
			}
		},
		detail: function() {
			uni.navigateTo({
				url: '../taskDetail/index'
			});
		},
		toCreateTask(){
			uni.navigateTo({
				url: '../createTask/index'
			});
		}
	},
	onReachBottom: function() {
		if (!this.pullUpOn) return;
		this.loadding = true;
		if (this.pageIndex == 4) {
			this.loadding = false;
			this.pullUpOn = false;
		} else {
			let loadData = JSON.parse(JSON.stringify(this.productList));
			loadData = loadData.splice(0, 10);
			if (this.pageIndex == 1) {
				loadData = loadData.reverse();
			}
			this.productList = this.productList.concat(loadData);
			this.pageIndex = this.pageIndex + 1;
			this.loadding = false;
		}
	}
};
</script>

<style>
page {
	background-color: #f7f7f7;
}

.container {
	padding-bottom: env(safe-area-inset-bottom);
}

/* 隐藏scroll-view滚动条*/

::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
}

.title-content{
	position: relative;
	border-top: 60upx solid #851A1C;
	position: relative;
	height: 150upx;
	background: #DE1727;
	font-size: 45upx;
	color: #fff;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}
.top-title{
	line-height: 1;
}
.send-btn{
	position: absolute;
	bottom: 20upx;
	right: 30upx;
	font-size: 30upx;
}
/*screen*/

.tui-header-screen {
	width: 100%;
	box-sizing: border-box;
	background: #fff;
	position: fixed;
	z-index: 1000;
}

.tui-screen-top,
.tui-screen-bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 28rpx;
	color: #333;
}

.tui-screen-top {
	height: 88rpx;
	position: relative;
	background: #fff;
}

.tui-top-item {
	height: 28rpx;
	line-height: 28rpx;
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tui-topitem-active {
	color: #e41f19;
}

.tui-screen-bottom {
	height: 100rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	font-size: 24rpx;
	align-items: center;
	overflow: hidden;
}

.tui-bottom-text {
	line-height: 26rpx;
	max-width: 82%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.tui-bottom-item {
	flex: 1;
	width: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 12rpx;
	box-sizing: border-box;
	background-color: #f7f7f7;
	margin-right: 20rpx;
	white-space: nowrap;
	height: 60rpx;
	border-radius: 40rpx;
}

.tui-bottom-item:last-child {
	margin-right: 0;
}

.tui-btmItem-active {
	background-color: #fcedea !important;
	color: #e41f19;
	font-weight: bold;
	position: relative;
}

.tui-btmItem-active::after {
	content: '';
	position: absolute;
	border: 1rpx solid #e41f19;
	width: 100%;
	height: 100%;
	border-radius: 40rpx;
	left: 0;
	top: 0;
}

.tui-btmItem-tap {
	position: relative;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

.tui-btmItem-tap::after {
	content: '';
	position: absolute;
	width: 100%;
	height: 22rpx;
	background: #f7f7f7;
	left: 0;
	top: 58rpx;
}

.tui-bold {
	font-weight: bold;
}

.tui-active {
	color: #e41f19;
}

.tui-addr-left {
	padding-left: 6rpx;
}

.tui-seizeaseat-20 {
	height: 20rpx;
}

.tui-seizeaseat-30 {
	height: 30rpx;
}

/*screen*/

/*顶部下拉选择 属性*/

.tui-scroll-box {
	width: 100%;
	height: 480rpx;
	box-sizing: border-box;
	position: relative;
	z-index: 99;
	color: #fff;
	font-size: 30rpx;
	word-break: break-all;
}

.tui-drop-item {
	color: #333;
	height: 80rpx;
	font-size: 28rpx;
	padding: 20rpx 40rpx 20rpx 40rpx;
	box-sizing: border-box;
	display: inline-block;
	width: 50%;
}

.tui-drop-btnbox {
	width: 100%;
	height: 100rpx;
	position: absolute;
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	display: flex;
}

.tui-drop-btn {
	width: 50%;
	font-size: 32rpx;
	text-align: center;
	height: 100rpx;
	line-height: 100rpx;
	border: 0;
}

.tui-btn-red {
	background: #e41f19;
	color: #fff;
}

.tui-red-hover {
	background: #c51a15 !important;
	color: #e5e5e5;
}

.tui-btn-white {
	background: #fff;
	color: #333;
}

.tui-white-hover {
	background: #e5e5e5;
	color: #2e2e2e;
}

/*顶部下拉选择 属性*/

/*顶部下拉选择 综合*/

.tui-dropdownlist {
	width: 100%;
	position: absolute;
	background-color: #fff;
	border-bottom-left-radius: 24rpx;
	border-bottom-right-radius: 24rpx;
	overflow: hidden;
	box-sizing: border-box;
	padding-top: 10rpx;
	padding-bottom: 26rpx;
	left: 0;
	top: 88rpx;
	visibility: hidden;
	transition: all 0.2s ease-in-out;
	z-index: 999;
}

.tui-dropdownlist-show {
	visibility: visible;
}

.tui-dropdownlist-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: -1;
	transition: all 0.2s ease-in-out;
	opacity: 0;
	visibility: hidden;
}

.tui-mask-show {
	opacity: 1;
	visibility: visible;
}

.tui-dropdownlist-item {
	color: #333;
	height: 70rpx;
	font-size: 28rpx;
	padding: 0 40rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

/*顶部下拉选择 综合*/

.tui-drawer-box {
	width: 686rpx;
	font-size: 24rpx;
	overflow: hidden;
	position: relative;
	padding-bottom: 100rpx;
}

.tui-drawer-title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 30rpx;
	box-sizing: border-box;
	height: 80rpx;
}

.tui-title-bold {
	font-size: 26rpx;
	font-weight: bold;
	flex-shrink: 0;
}

.tui-location {
	margin-right: 6rpx;
}

.tui-attr-right {
	width: 70%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: right;
}

.tui-all-box {
	width: 90%;
	white-space: nowrap;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.tui-drawer-content {
	padding: 16rpx 30rpx 30rpx 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
}

.tui-input {
	border: 0;
	height: 64rpx;
	border-radius: 32rpx;
	width: 45%;
	background-color: #f7f7f7;
	text-align: center;
	font-size: 24rpx;
	color: #333;
}

.tui-phcolor {
	text-align: center;
	color: #b2b2b2;
	font-size: 24rpx;
}

.tui-flex-attr {
	flex-wrap: wrap;
	justify-content: flex-start;
}

.tui-attr-item {
	width: 30%;
	height: 64rpx;
	background-color: #f7f7f7;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 4rpx;
	box-sizing: border-box;
	border-radius: 32rpx;
	margin-right: 5%;
	margin-bottom: 5%;
}

.tui-attr-ellipsis {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	width: 96%;
	text-align: center;
}

.tui-attr-item:nth-of-type(3n) {
	margin-right: 0%;
}

.tui-attr-btnbox {
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	padding: 0 30rpx;
	background: #fff;
}

.tui-attr-safearea {
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: env(safe-area-inset-bottom);
}

.tui-safearea-bottom {
	width: 100%;
	height: env(safe-area-inset-bottom);
}

.tui-attr-btnbox::before {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	border-top: 1px solid #eaeef1;
	transform: scaleY(0.5) translateZ(0);
	transform-origin: 0 0;
}

.tui-drawer-btn {
	width: 47%;
	text-align: center;
	height: 60rpx;
	border-radius: 30rpx;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

.tui-drawerbtn-black {
	border: 1rpx solid #555;
}

.tui-drawerbtn-primary {
	background: #e41f19;
	color: #fff;
}

/* 商品列表*/

.tui-product-list {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	flex-wrap: wrap;
	box-sizing: border-box;
	padding: 270upx 30upx 100upx 30upx;
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
	color: #aaa;
	font-size: 24upx;
	line-height: 36upx;
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
/* 商品列表*/
</style>
