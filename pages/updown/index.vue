<template>
	<view class="container">
		
		<!--screen-->
		<view class="tui-header-screen">
			<uni-nav-bar v-if="jibie == 1" status-bar right-text="发布任务" @clickRight="toCreateTask"	color="#fff" fixed background-color="#DE1727" title="上传下达"></uni-nav-bar>
			<uni-nav-bar v-else status-bar color="#fff" fixed background-color="#DE1727" title="上传下达"></uni-nav-bar>
			
			<view class="tui-screen-top">
				<view class="tui-top-item tui-icon-ml" @click="showFilterTime()">
					<view>日期</view>
					<tui-icon name="arrowdown" :size="14" color="#444"></tui-icon>
				</view>
				<rangeDatePick 
					:show="isShow"
					@showchange="showchange"
					:start="startDate"
					:end="endDate"
					:value="rangeDate"
					@change="bindChange"
					@cancel="bindCancel"
					themeColor="#4C83D6"
					fields="month"
				></rangeDatePick>
				
				<!-- <tui-datetime ref="filterTime" :type="3" :cancelColor="cancelColor" :color="color"
				 :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="changeFilterTime"></tui-datetime> -->
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
						<text class="tui-ml tui-middle">{{ item.ItemName }}</text>
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
						<text class="tui-ml tui-middle">{{ item.ItemName }}</text>
						<tui-icon name="check" :size="16" color="#e41f19" :bold="true" v-if="item.selected"></tui-icon>
					</view>
				</view>
				<view class="tui-dropdownlist-mask" :class="[typeH > 0 ? 'tui-mask-show' : '']" @tap.stop="hideFilterType"></view>
				<!--下拉选择列表--类型-->
				
				
				
				<view class="tui-top-item tui-icon-ml" :class="[statusId ? 'tui-active tui-bold' : '']" data-index="0" @tap="showFilterClassify">
					<view>{{classifyName}}</view>
					<tui-icon :name="statusH > 0 ? 'arrowup' : 'arrowdown'" :size="14" :color="statusId ? '#e41f19' : '#444'"></tui-icon>
				</view>
				
				<!--下拉选择列表--分类-->
				<view class="tui-dropdownlist" :class="[classifyH > 0 ? 'tui-dropdownlist-show' : '']" :style="{ height: classifyH + 'rpx' }">
					<view
						class="tui-dropdownlist-item tui-icon-middle"
						:class="[item.selected ? 'tui-bold' : '']"
						v-for="(item, index) in classifyList"
						:key="index"
						@tap.stop="selectClassify"
						:data-index="index"
					>
						<text class="tui-ml tui-middle">{{ item.ItemName }}</text>
						<tui-icon name="check" :size="16" color="#e41f19" :bold="true" v-if="item.selected"></tui-icon>
					</view>
				</view>
				<view class="tui-dropdownlist-mask" :class="[classifyH > 0 ? 'tui-mask-show' : '']" @tap.stop="hideFilterClassify"></view>
				<!--下拉选择列表--分类-->
				
				
				
				
				<view class="tui-top-item tui-icon-ml" :class="[statusId ? 'tui-active tui-bold' : '']" data-index="0" @tap="showFilterStatus">
					<view>{{statusName}}</view>
					<tui-icon :name="statusH > 0 ? 'arrowup' : 'arrowdown'" :size="14" :color="statusId ? '#e41f19' : '#444'"></tui-icon>
				</view>
				
				<!--下拉选择列表--状态-->
				<view class="tui-dropdownlist" :class="[statusH > 0 ? 'tui-dropdownlist-show' : '']" :style="{ height: statusH + 'rpx' }">
					<view
						class="tui-dropdownlist-item tui-icon-middle"
						:class="[item.selected ? 'tui-bold' : '']"
						v-for="(item, index) in statusList"
						:key="index"
						@tap.stop="selectStatus"
						:data-index="index"
					>
						<text class="tui-ml tui-middle">{{ item.ItemName }}</text>
						<tui-icon name="check" :size="16" color="#e41f19" :bold="true" v-if="item.selected"></tui-icon>
					</view>
				</view>
				<view class="tui-dropdownlist-mask" :class="[statusH > 0 ? 'tui-mask-show' : '']" @tap.stop="hideFilterStatus"></view>
				<!--下拉选择列表--状态-->
				
			</view>
		</view>
		<!--screen-->

		<!--list-->
		<view class="tui-product-list">
			<view class="tui-product-container">
				<block v-for="(item, index) in productList" :key="index">
					<!-- <template is="productItem" data="{{item,index:index,isList:isList}}" /> -->
					<!--商品列表-->
					<view class="tui-pro-item tui-flex-list" date-type="1" hover-class="hover" :hover-start-time="150" @click="detail(item)">
						<view class="item-top">
							<tui-tag margin="0 15upx 0 0" padding="8rpx" :type="item.leixingType" size="24rpx">{{item.leixingName}}</tui-tag>
							<view>{{item.title}}</view>
						</view>
						<view class="item-desc">
							具体工作内容：{{item.neirong}}
						</view>
						<view class="bottom-wrap">
							<view class="bottom-left">
								<tui-tag padding="8rpx" size="24rpx" :type="item.jinjiClass" v-if="item.jinjiname">
									<!-- <tui-icon name="about" :size="10" color="#4B8AFC"></tui-icon> -->
									<text>{{item.jinjiname}}</text>
								</tui-tag>
								<tui-tag v-if="item.typename" margin="0 15upx" padding="8rpx" type="light-orange" size="24rpx">{{item.typename}}</tui-tag>
								<view class="bottom-time">
									{{item.createusername + '  '}}  {{item.createdate}}
								</view>
							</view>
							<view class="item-status">
								{{item.statusname}}
							</view>
						</view>
					</view>
					<!--商品列表-->
				</block>
			</view>
			
		</view>
		<view class="load-wrap">
			<!--加载loadding-->
			<tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
			<tui-nomore v-if="!pullUpOn" backgroundColor="#f7f7f7"></tui-nomore>
			<!--加载loadding-->
		</view>
		<!--list-->

	</view>
</template>

<script>
import rangeDatePick from '@/components/range-dtpicker/index.vue';
export default {
	components: {rangeDatePick},
	data() {
		return {
			isShow: false,
			rangeDate: [],
			startDate: '',
			endDate: '',
			endTime: '',
			beginTime: '',
			
			
			cancelColor: '#888',
			color: '#5677fc',
			setDateTime: '',
			result: '',
			unitTop: false,
			radius: false, //日期相关参数
			
			degreeH: 0,
			degreeName: '紧急程度',
			degreeId: '',
			degreeList: [], //紧急程度相关参数
			
			typeH: 0,
			typeName: '类型',
			typeId: '',
			typeList: [{
				ItemName: "任务",
				ItemValue: 'renwu'
			},{
				ItemName: "问题",
				ItemValue: 'wenti'
			}], //类型相关参数

			classifyH: 0,
			classifyName: '分类',
			classifyId: '',
			classifyList: [], //分类相关参数
			
			statusH: 0,
			statusName: '状态',
			statusId: '',
			statusList: [],//类型筛选相关参数
			
			dropScreenH: 200, //下拉筛选框距顶部距离
			attrData: [],
			attrIndex: -1,
			dropScreenShow: true,
			scrollTop: 0,
			tabIndex: 0, //顶部筛选索引
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
			productList: [],
			pageIndex: 1,
			pageSize: 5,
			loadding: false,
			pullUpOn: true,
			listUrl: '',
			jibie: ''
		};
	},
	mounted: function(options) {
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
		let userinfo = uni.getStorageSync("userinfo")
		if(userinfo){
			userinfo = JSON.parse(userinfo)
			this.userinfo = userinfo
			if(userinfo.Nature == 3){ //县
				this.listUrl = 'Siji/AFP_RenwuXian/GetPageListJson'
				this.jibie = 1
			}else if(userinfo.Nature == 6){ //乡
				this.listUrl = 'Siji/AFP_RenwuXiang/GetPageListJson'
				this.jibie = 2
			}else if(userinfo.Nature == 7 && !userinfo.Nature){ //村
				this.listUrl = 'Siji/AFP_RenwuCun/GetPageListJson'
				this.jibie = 3
			}else{ //联户员
				this.listUrl = 'Siji/AFP_RenWuLianHuYuan/GetPageListJson'
				this.jibie = 4
			}
		}
		let date = new Date()
		let month = date.getMonth() + 1
		if(month < 10){
			month = '0' + month
		}
		this.startDate = '2020-01'
		this.endDate = date.getFullYear() + '-' + month
		let dataItem = uni.getStorageSync('dataItem');
		this.statusList = dataItem.renwuzhuangtai || [];
		this.classifyList = dataItem.renwufenlei || [];
		this.degreeList = dataItem.jinjichengdu || [];
		// this.getStatusData();
		// this.getTypeData();
		// this.getDegreeList();
		this.getListData();
	},
	methods: {
		showchange(){
			if(this.isShow){
				this.refresh()
			}
			this.isShow=!this.isShow; 
		},
		bindChange(list){
			if(list.length > 1){
				this.beginTime = list[0]
				this.endTime = list[1]
			}
		},
		bindCancel(){
			this.isShow = false
		},
		// getStatusData(){
		// 	let _this = this;
		// 	this.tui.request("/SystemManage/DataItemDetail/GetDataItemListJson","GET",{
		// 		EnCode: 'renwuzhuangtai'
		// 	}).then((res)=>{
		// 		if(Array.isArray(res)){
		// 			_this.statusList = res || []
		// 		}
		// 	})
		// },
		// getTypeData(){
		// 	let _this = this;
		// 	this.tui.request("/SystemManage/DataItemDetail/GetDataItemListJson","GET",{
		// 		EnCode: 'renwufenlei'
		// 	}).then((res)=>{
		// 		if(Array.isArray(res)){
		// 			_this.typeList = res || []
		// 		}
		// 	})
		// },
		// getDegreeList(){
		// 	let _this = this;
		// 	this.tui.request("/SystemManage/DataItemDetail/GetDataItemListJson","GET",{
		// 		EnCode: 'jinjichengdu'
		// 	}).then((res)=>{
		// 		if(Array.isArray(res)){
		// 			_this.degreeList = res || []
		// 		}
		// 	})
		// },
		showFilterTime(){
			//this.$refs.filterTime.show();
			this.isShow = true;
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
			this.typeH = 0;
			this.statusH = 0;
			this.classifyH = 0;
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
						this.degreeName = item.ItemName
						this.degreeId = item.ItemValue
					} else {
						item.selected = false;
					}
				})
			}
			this.degreeH = 0;
			this.refresh()
		},
		hideFilterDegree(){
			this.degreeH = 0;
		},
		//显示紧急程度筛选相关事件end

		//显示类别筛选相关事件begin
		showFilterType(){
			this.typeH = 246;
			this.degreeH = 0;
			this.statusH = 0;
			this.classifyH = 0;
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
						this.typeName = item.ItemName
						this.typeId = item.ItemValue
					} else {
						item.selected = false;
					}
				})
			}
			this.typeH = 0;
			this.refresh()
		},
		hideFilterType(){
			this.typeH = 0;
		},
		//显示类别筛选相关事件end

		//显示分类筛选相关事件begin
		showFilterStatus(){
			this.typeH = 0;
			this.degreeH = 0;
			this.classifyH = 0;
			this.statusH = 246;
			this.tabIndex = 1;
		},
		showFilterClassify(){
			this.typeH = 0;
			this.degreeH = 0;
			this.statusH = 0;
			this.classifyH = 246;
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
						this.statusName = item.ItemName
						this.statusId = item.ItemValue
					} else {
						item.selected = false;
					}
				})
			}
			this.statusH = 0;
			this.refresh()
		},
		selectClassify(e){
			let eindex = e.currentTarget.dataset.index;
			if(this.classifyList[eindex].selected){
				this.classifyList[eindex].selected = false
				this.classifyName = "分类"
				this.classifyId = ''
			}else{
				this.classifyList.map((item,index)=>{
					if (eindex === index) {
						item.selected = true;
						this.classifyName = item.ItemName
						this.classifyId = item.ItemValue
					} else {
						item.selected = false;
					}
				})
			}
			this.classifyH = 0;
			this.refresh()
		},
		hideFilterStatus(){
			this.statusH = 0;
		},
		hideFilterClassify(){
			this.classifyH = 0;
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
		detail: function(item) {
			let url = item.id + '&jibie=' + item.jibie
			if(item.leixing == 'wenti'){
				uni.navigateTo({
					url: '../questionDetail/index?id=' + url
				});
			}else{
				if(item.jibie == 1){
					uni.navigateTo({
						url: '../taskDetail/index?id=' + url
					});
				}else if(item.jibie == 2){
					uni.navigateTo({
						url: '../taskDetail2/index?id=' + url
					});
				}else{
					uni.navigateTo({
						url: '../taskDetail3/index?id=' + url
					});
				}
			}
		},
		toCreateTask(){
			uni.navigateTo({
				url: '../createTask/index'
			});
		},
		getListData(){
			let _this = this;
			let resData = {
				"queryJson": decodeURIComponent(JSON.stringify({
					XiangCode: _this.userinfo.XiangCode || '',
					CunCode: _this.userinfo.CunCode || '',
					LianHuYuanID: _this.userinfo.LianHuYuanID || '',
					beginTime: _this.beginTime,
					endTime: _this.endTime,
					Title: "",
					JinjiCode: _this.degreeId,
					TypeCode: _this.classifyId,
					StatusCode: _this.statusId,
					leixing: _this.typeId,
					jibie: _this.jibie
				})),
				"rows": _this.pageSize,
				"page": _this.pageIndex,
				"sidx": "CreateDate",
				"sord": "desc"
			}
			this.tui.request('Siji/AFP_WenTi/GetUpDownList',"GET",resData).then((res)=>{
				res.resultdata.rows.map(item=>{
					if(item.leixing == 'wenti'){
						item.leixingName = "问题"
						item.leixingType = 'danger'
					}else{
						item.leixingType = 'warning'
						item.leixingName = '任务'
					}
					if(item.jinjicode == 1){
						item.jinjiClass = 'green'
					}else if(item.jinjicode == 2){
						item.jinjiClass = 'warning'
					}else  if(item.jinjicode == 3){
						item.jinjiClass = 'danger'
					}
				})
				
				if(_this.pageIndex == 1){
					_this.productList = res.resultdata.rows;
				}else{
					_this.productList = [..._this.productList,...res.resultdata.rows]
				}
				console.log('总共：' + res.resultdata.records)
				if(_this.pageIndex * _this.pageSize >= res.resultdata.records){
					_this.pullUpOn = false
				}else{
					_this.pullUpOn = true;
				}
				_this.loadding = false;
			}).catch(e=>{
				console.log(e)
			})
		},
		loadMore(){
			console.log(`pull${this.pullUpOn}`)
			if (!this.pullUpOn) return;
			this.loadding = true;
			this.pageIndex = this.pageIndex + 1;
			this.getListData();
		},
		refresh(){
			this.pageIndex = 1;
			this.pullUpOn = true;
			this.getListData()
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
	overflow: auto;
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
.load-wrap{
	padding-bottom: 100upx;
}
.tui-product-list {
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
/* 商品列表*/
</style>
