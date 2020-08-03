<template>
	<view class="page-content">
		<view class="status_bar"></view>
		<view class="top-wrap" v-if="swiperList.length > 0">
			<image src="../../static/home-top.png" mode="scaleToFill" class="top-bg"></image>
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="toNewsDetail(item)">
					<image :src="item.CoverImg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="qiun-columns" v-if="showTask">
			<view class="group-wrap">
				<view class="group-title">任务完成率</view>
				<view class="select-month" @click="showTaskMonth()">
					<text>{{taskMonth}}</text>
					<tui-icon name="turningdown" color="#ccc" :size="18"></tui-icon>
				</view>
			</view>
			<tui-datetime ref="taskMonth" :type="3" :cancelColor="cancelColor" :color="color"
			 :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="changeTaskMonth"></tui-datetime>
			<view class="qiun-charts" >
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="taskCanva" id="taskCanva" class="charts" :width="cWidth" :height="cHeight" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchTaskCanva" @touchmove="moveTaskColumn" @touchend="touchEndTaskColumn"></canvas>
				<!--#endif-->
			</view>
		</view>
		<view class="bg-white padding bottom-border" v-if="showTask">
			<view class="cu-list grid col-4">
				<view v-if="jibie == 1" class="cu-item table-title">乡镇</view>
				<view v-else-if="jibie == 2" class="cu-item table-title">村庄</view>
				<view v-else-if="jibie == 3" class="cu-item table-title">联户员</view>
				<view class="cu-item table-title">已完成</view>
				<view class="cu-item table-title">未完成</view>
				<view class="cu-item table-title">总数</view>
				
				<block v-for="(item,index) in taskList" :key="index">
					<view class="cu-item">{{item.fullname}}</view>
					<view class="cu-item">{{item.yiwancheng}}</view>
					<view class="cu-item" :class="{'text-red': item.weiwancheng > 0}">{{item.weiwancheng}}</view>
					<view class="cu-item">{{item.zongshu}}</view>
				</block>
				
				
			</view>
		</view>
		
		<view class="qiun-columns" v-if="showWork">
			<view class="group-wrap">
				<view class="group-title">170工作解决机制</view>
				<view class="select-month" @click="showWorkMonth()">
					<text>{{workMonth}}</text>
					<tui-icon name="turningdown" color="#ccc" :size="18"></tui-icon>
				</view>
			</view>
			<tui-datetime ref="workMonth" :type="3" :cancelColor="cancelColor" :color="color"
			 :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="changeWorkMonth"></tui-datetime>
			<view class="qiun-charts" >
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="workCanva" id="workCanva" class="charts" :width="cWidth" :height="cHeight" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchWorkCanva" @touchmove="moveWorkColumn" @touchend="touchEndWorkColumn"></canvas>
				<!--#endif-->
			</view>
		</view>
		<view class="bg-white padding bottom-border" v-if="showWork">
			<view class="cu-list grid col-4">
				<view v-if="jibie == 1" class="cu-item table-title">乡镇</view>
				<view v-else-if="jibie == 2" class="cu-item table-title">类别</view>
				<view v-else-if="jibie == 3" class="cu-item table-title">类别</view>
				<view class="cu-item table-title">已完成</view>
				<view class="cu-item table-title">未完成</view>
				<view class="cu-item table-title">总数</view>
				<template v-if="jibie == 1">
					<block v-for="(item,index) in wrokList">
						<view class="cu-item">{{item.fullname}}</view>
						<view class="cu-item">{{item.jiejuezhanbi}}</view>
						<view class="cu-item" :class="{'text-red': item.weijiejuezhanbi > 0}">{{item.weijiejuezhanbi}}</view>
						<view class="cu-item">{{item.zongshu}}</view>
					</block>
				</template>
				<template v-if="jibie == 2">
					<block v-for="(item,index) in wrokList">
						<view class="cu-item">{{item.itemname}}</view>
						<view class="cu-item">{{item.yijiejue}}</view>
						<view class="cu-item" :class="{'text-red': item.weijiejue > 0}">{{item.weijiejue}}</view>
						<view class="cu-item">{{item.zongshu}}</view>
					</block>
				</template>
				
			</view>
		</view>
		<view class="qiun-columns" v-if="showHuiyi">
			<view class="group-wrap">
				<view class="group-title">党建任务完成进度</view>
				<view class="select-month" @click="showProgressMonth()">
					<text>{{progressMonth}}</text>
					<tui-icon name="turningdown" color="#ccc" :size="18"></tui-icon>
				</view>
			</view>
			<tui-datetime ref="progressMonth" :type="3" :cancelColor="cancelColor" :color="color"
			 :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="changeProgressMonth"></tui-datetime>
			<view class="qiun-charts" >
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="progressCanva" id="progressCanva" class="charts" :width="cWidth" :height="cHeight" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchProgressCanva" @touchmove="moveProgressColumn" @touchend="touchEndProgressColumn"></canvas>
				<!--#endif-->
			</view>
		</view>
		<view class="bg-white padding bottom-border" v-if="showHuiyi">
			<view class="cu-list grid col-5">
				<view class="cu-item table-title font-24">乡镇</view>
				<view class="cu-item table-title font-24">党支部会议</view>
				<view class="cu-item table-title font-24">党员会议</view>
				<view class="cu-item table-title font-24">党课</view>
				<view class="cu-item table-title font-24">状态</view>
				
				<block v-for="(item,index) in huiyiList">
					<view class="cu-item">{{item.name}}</view>
					<view class="cu-item" :class="{'text-red': item.dzb < item.dzbnum}">{{item.dzb}}</view>
					<view class="cu-item" :class="{'text-red': item.dy < item.dynum}">{{item.dy}}</view>
					<view class="cu-item" :class="{'text-red': item.dk < item.dknum}">{{item.dk}}</view>
					<view class="cu-item">{{item.stateName}}</view>
				</block>
			</view>
		</view>
		<view class="qiun-columns" v-if="showBuild">
			<view class="group-wrap">
				<view class="group-title">党建任务完成率</view>
				<view class="select-month" @click="showBuildMonth()">
					<text>{{buildMonth}}</text>
					<tui-icon name="turningdown" color="#ccc" :size="18"></tui-icon>
				</view>
			</view>
			<tui-datetime ref="buildMonth" :type="3" :cancelColor="cancelColor" :color="color"
			 :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="changeBuildMonth"></tui-datetime>
			<view class="qiun-charts" >
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="buildCanva" id="buildCanva" class="charts"  :width="cWidth" :height="cHeight" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true @touchstart="touchBuildCanva" @touchmove="moveBuildColumn" @touchend="touchEndBuildColumn"></canvas>
				<!--#endif-->
			</view>
		</view>
		<view class="bg-white padding bottom-border" v-if="showBuild">
			<view class="cu-list grid col-4">
				<view v-if="jibie == 1" class="cu-item table-title">乡镇</view>
				<view v-else-if="jibie == 2" class="cu-item table-title">村庄</view>
				<view v-else-if="jibie == 3" class="cu-item table-title">联户员</view>
				<view class="cu-item table-title">已完成</view>
				<view class="cu-item table-title">未完成</view>
				<view class="cu-item table-title">总数</view>
				
				<block v-for="(item,index) in buildList" :key="index">
					<view class="cu-item">{{item.name}}</view>
					<view class="cu-item">{{item.wc}}</view>
					<view class="cu-item" :class="{'text-red': item.wwc > 0}">{{item.wwc}}</view>
					<view class="cu-item">{{item.zs}}</view>
				</block>
				
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import  { isJSON } from '@/common/checker.js';
	var _self;
	var taskCanva = null; //任务完成了图表
	var workCanva = null; //170工作机制图表
	var progressCanva = null; //党建任务完成进度图表
	var buildCanva = null; //党建任务完成率
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:'',
				
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: '../../static/swiper1.jpg'
				}, {
					id: 1,
					type: 'image',
					url: '../../static/swiper2.jpg'
				}, {
					id: 2,
					type: 'image',
					url: '../../static/swiper3.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				taskMonth: "",
				workMonth: "",
				progressMonth: "",
				buildMonth: "",
				type: 3,
				cancelColor: '#888',
				color: '#5677fc',
				setDateTime: '',
				result: '',
				unitTop: false,
				radius: false,
				taskUrl: 'Siji/AFP_RenwuXiang/GetCunRenWuTongJi',
				taskList: [],
				questionUrl: 'Siji/AFP_WenTi/GetXiangWenTiTongJi',
				wrokList: [],
				buildUrl: '',
				buildList: [],
				huiyiUrl: 'Siji/AFP_DangjianNum/GetXiangData',
				huiyiList: [],
				jibie: 0,
				showTask: false,
				showWork: false,
				showBuild: false,
				showHuiyi: false
			}
		},
		
		mounted() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			let userinfo = uni.getStorageSync("userinfo")
			if(userinfo){
				userinfo = JSON.parse(userinfo)
				this.userinfo = userinfo
				console.log(this.userinfo)
				if(userinfo.Nature == 3){ //县
					this.jibie = 1
					this.taskUrl = 'Siji/AFP_RenwuXian/GetXiangRenWuTongJi'
					this.questionUrl = 'Siji/AFP_WenTi/GetXiangWenTiTongJi'
					this.buildUrl = 'Siji/AFP_DangjianNum/GetXiangRenwuData'
					this.huiyiUrl = 'Siji/AFP_DangjianNum/GetXiangData'
					this.showTask = true
					this.showWork = true
					this.showBuild = true
					this.showHuiyi = true
				}else if(userinfo.Nature == 6){ //乡
					this.jibie = 2
					this.taskUrl = 'Siji/AFP_RenwuXiang/GetCunRenWuTongJi'
					this.questionUrl = 'Siji/AFP_WenTi/GetCunWenTiTongJi'
					this.buildUrl = 'Siji/AFP_DangjianNum/GetCunRenwuData'
					this.huiyiUrl = 'Siji/AFP_DangjianNum/GetCunData'
					this.showTask = true
					this.showWork = true
					this.showBuild = true
					this.showHuiyi = true
				}else if(userinfo.Nature == 7 && userinfo.IsWarner == 0){ //村
					this.jibie = 3
					this.taskUrl = 'Siji/AFP_RenwuCun/GetLianHuYuanRenWuTongJi'
					this.questionUrl = 'Siji/AFP_WenTi/GetCunWenTiTongJi'
					this.showTask = true
					this.showWork = true
				}else{ //联户员
					this.jibie = 4
				}
				console.log(this.jibie)
			}
			//初始化当前年月
			let currentMonth = new Date().getFullYear() + '-' + (new Date().getMonth() + 1);
			let date = new Date();
			let prevMonth = date.setMonth(date.getMonth() - 1);
			this.taskMonth = currentMonth;
			this.workMonth = date.getFullYear() + '-' + (date.getMonth() + 1);
			this.progressMonth = currentMonth;
			this.buildMonth = currentMonth;
			this.getSwiperData();
			this.getTaskData();
			this.getQuestionData();
			this.getBuildProgress();
			this.getBuildData();
		},
		methods: {
			showTaskMonth(){
				this.$refs.taskMonth.show();
			},
			showWorkMonth(){
				this.$refs.workMonth.show();
			},
			showProgressMonth(){
				this.$refs.progressMonth.show();
			},
			showBuildMonth(){
				this.$refs.buildMonth.show();
			},
			change() {
				console.log(e);
				this.result = e.result;
			},
			changeTaskMonth(e){
				this.taskMonth = e.result;
				this.getTaskData();
			},
			changeWorkMonth(e){
				this.workMonth = e.result;
				//获取数据，更新任务完成了图表
				this.getQuestionData();
			},
			changeProgressMonth(e){
				this.progressMonth = e.result;
				
				this.getBuildProgress();
			},
			changeBuildMonth(e){
				this.buildMonth = e.result;
				//获取数据，更新任务完成了图表
				
				this.getBuildData();
			},
			getTaskData(){
				let _this = this;
				let reqData = {
					yuefen: _this.taskMonth
				}
				if(_this.jibie == 2){
					reqData.XiangCode = _this.userinfo.XiangCode
				}else if(_this.jibie == 3){
					reqData.XiangCode = _this.userinfo.XiangCode
					reqData.CunCode = _this.userinfo.CunCode
				}
				if(!_this.taskUrl){
					return
				}
				console.log(_this.taskUrl)
				this.tui.request(_this.taskUrl,"GET",reqData).then((list)=>{
					console.log(list)
					this.taskList = list;
					let categories = [];
					let complete = []
					let uncomplete = []
					if(Array.isArray(list)){
						list.map(item=>{
							categories.push(item.fullname);
							complete.push(item.wanchengzhanbi)
							uncomplete.push(item.weiwanchengzhanbi)
						})
					}
					_self.showTaskCanva({
						"categories": categories,
						enableScroll: true,//开启图表拖拽功能
						xAxis: {
							disableGrid: true,
							itemCount: 4,
							scrollShow: true
						},
						"series": [{
							"name": "已完成",
							"data": complete,
							"color": "#EE9FA5",
							format:(val)=>{return val.toFixed(0)+'%'}
						}, {
							"name": "未完成",
							"data": uncomplete,
							"color": '#FAFAFA',
							format:(val)=>{return val.toFixed(0)+'%'}
						}]
					});
				}).catch(e=>{
					console.log(e)
				})
			},
			getQuestionData(){
				let _this = this;
				let reqData = {
					yuefen: _this.taskMonth
				}
				if(_this.jibie == 2){
					reqData.XiangCode = _this.userinfo.XiangCode
				}else if(_this.jibie == 3){
					reqData.XiangCode = _this.userinfo.XiangCode
					reqData.CunCode = _this.userinfo.CunCode
				}
				if(!_this.questionUrl){
					return
				}
				console.log(_this.questionUrl)
				this.tui.request(_this.questionUrl,"GET",reqData).then((list)=>{
					this.wrokList = list;
					let categories = [];
					let complete = []
					let uncomplete = []
					if(Array.isArray(list)){
						list.map(item=>{
							if(_this.jibie == 1){
								categories.push(item.fullname);
								complete.push(item.jiejuezhanbi)
								uncomplete.push(item.weijiejuezhanbi)
							}else{
								categories.push(item.itemname);
								complete.push(item.jiejuelv)
								uncomplete.push(item.weijiejuelv)
							}
							
							
						})
					}
				
					_self.showWorkCanva({
						"categories": categories,
						enableScroll: true,//开启图表拖拽功能
						xAxis: {
							disableGrid: true,
							itemCount: 4,
							scrollShow: true
						},
						"series": [{
							"name": "已完成",
							"data": complete,
							"color": "#EE9FA5",
							format:(val)=>{return val.toFixed(0)+'%'}
						}, {
							"name": "未完成",
							"data": uncomplete,
							"color": '#FAFAFA',
							format:(val)=>{return val.toFixed(0)+'%'}
						}]
					});
				}).catch(e=>{
					console.log(e)
				})
			},
			getBuildData(){
				let _this = this;
				let reqData = {
					yuefen: _this.taskMonth
				}
				if(_this.jibie == 2){
					reqData.XiangCode = _this.userinfo.XiangCode
				}else if(_this.jibie == 3){
					reqData.XiangCode = _this.userinfo.XiangCode
					reqData.CunCode = _this.userinfo.CunCode
				}
				if(!_this.buildUrl){
					return
				}
				console.log(_this.buildUrl)
				this.tui.request(_this.buildUrl,"GET",reqData).then((list)=>{
					console.log(list)
					this.buildList = list;
					let categories = [];
					let complete = []
					let uncomplete = []
					if(Array.isArray(list)){
						list.map(item=>{
							categories.push(item.name);
							complete.push(item.wc)
							uncomplete.push(item.wwc)
						})
					}
				
					_self.showBuildCanva({
						"categories": categories,
						enableScroll: true,//开启图表拖拽功能
						xAxis: {
							disableGrid: true,
							itemCount: 4,
							scrollShow: true
						},
						"series": [{
							"name": "已完成",
							"data": complete,
							"color": "#EE9FA5",
							format:(val)=>{return val.toFixed(0)+'%'}
						}, {
							"name": "未完成",
							"data": uncomplete,
							"color": '#FAFAFA',
							format:(val)=>{return val.toFixed(0)+'%'}
						}]
					});
					
					
					
				}).catch(e=>{
					console.log(e)
				})
			},
			getBuildProgress(){
				let _this = this;
				let reqData = {
					yuefen: _this.progressMonth
				}
				if(_this.jibie == 2){
					reqData.XiangCode = _this.userinfo.XiangCode
				}
				if(!_this.huiyiUrl){
					return
				}
				console.log(_this.huiyiUrl)
				this.tui.request(_this.huiyiUrl,"GET",reqData).then((list)=>{
					let categories = [];
					let zhibu = []
					let dangyuan = []
					let dangke = []
					if(Array.isArray(list)){
						list.map(item=>{
							if(item.dzb >= item.dzbnum && item.dy >= item.dynum && item.dk >= item.dknum){
								item.stateName = '已完成'
							}else{
								item.stateName = '未完成'
							}
							categories.push(item.name)
							zhibu.push(item.dzb)
							dangyuan.push(item.dy)
							dangke.push(item.dk)
						})
						this.huiyiList = list;
					}
					_self.showProgressCanva({
						"categories": categories,
						      "series": [{
						        "name": "党支部会议",
						        "data": zhibu,
								"color": '#FCC5C5'
						      }, {
						        "name": "党员会议",
						        "data": dangyuan,
								"color": '#FD6A76'
						      }, {
						        "name": "党课",
						        "data": dangke,
								"color": '#DE1727'
						      }]
					});
					
					
					
				}).catch(e=>{
					console.log(e)
				})
			},
			getSwiperData(){
				let _this = this;
				this.tui.request('PublicInfoManage/News/GetNewsListJson',"GET",{
					"pagination":{
						"rows": "30",
						"page": "1",
						"sidx": "CreateDate",
						"sord": "desc"
					   }
				}).then((res)=>{
					if(Array.isArray(res.rows)){
						res.rows.map(item=>{
							item.CoverImg = item.CoverImg.replace(';','')
							item.CoverImg = 'http://110.166.84.163:8002/' + item.CoverImg
							console.log(item.CoverImg)
						})
					}
					_this.swiperList = res.rows || []
					console.log(res)
					
				}).catch(e=>{
					console.log(e)
				})
			},
			// getServerData(){
			// 	uni.request({
			// 		url: 'https://www.ucharts.cn/data.json',
			// 		data:{
			// 		},
			// 		success: function(res) {
			// 			let ColumnStack={
			// 				"categories": ["任城镇", "新店镇", "邢湾镇"],
			// 				"series": [{
			// 					"name": "已完成",
			// 					"data": [50, 20, 70],
			// 					"color": "#EE9FA5",
			// 					format:(val)=>{return val.toFixed(0)+'%'}
			// 				}, {
			// 					"name": "未完成",
			// 					"data": [50, 80, 30],
			// 					"color": '#FAFAFA',
			// 					format:(val)=>{return val.toFixed(0)+'%'}
			// 				}]
			// 			};
			// 			_self.showProgressCanva({
			// 				"categories": ["柯曲镇", "上贡麻乡", "下贡麻乡", "岗龙乡", "青珍乡", "江千乡", "下藏科乡"],
			// 				      "series": [{
			// 				        "name": "党支部会议",
			// 				        "data": [35, 36, 31, 33, 13, 34, 30],
			// 						"color": '#FCC5C5'
			// 				      }, {
			// 				        "name": "党员会议",
			// 				        "data": [18, 27, 21, 24, 6, 28, 30],
			// 						"color": '#FD6A76'
			// 				      }, {
			// 				        "name": "党课",
			// 				        "data": [18, 27, 21, 24, 6, 28, 30],
			// 						"color": '#DE1727'
			// 				      }]
			// 			});
			// 		},
			// 		fail: () => {
			// 			_self.tips="网络错误，小程序端请检查合法域名";
			// 		},
			// 	});
			// },
			//初始化任务进度图表
			showTaskCanva(chartData){
				taskCanva = new uCharts({
					$this: _self,
					canvasId: 'taskCanva',
					type: 'column',
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					enableScroll: true,//开启图表拖拽功能
					xAxis: {
						disableGrid: true,
						itemCount: 4,
						scrollShow: true
					},
					yAxis: {
						min: 0,
						max: 10,
						format:(val)=>{return val.toFixed(0)+'%'}
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'stack',
							width: _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length
						}
					  }
				});
			},
			//初始解决机制图表
			showWorkCanva(chartData){
				workCanva = new uCharts({
					$this: _self,
					canvasId: 'workCanva',
					type: 'column',
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					enableScroll: true,//开启图表拖拽功能
					xAxis: {
						disableGrid: true,
						itemCount: 4,
						scrollShow: true
					},
					yAxis: {
						min: 0,
						max: 10,
						format:(val)=>{return val.toFixed(0)+'%'}
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'stack',
							width: _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length
						}
					  }
				});
			},
			//初始党建任务完成进度图表
			showProgressCanva(chartData){
				progressCanva = new uCharts({
					$this: _self,
					canvasId: 'progressCanva',
					type: 'column',
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					enableScroll: true,//开启图表拖拽功能
					xAxis: {
						disableGrid: true,
						itemCount: 4,
						scrollShow: true
					},
					yAxis: {
						min: 0
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							width: _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length
						}
					  }
				});
			},
			//初始党建任务完成进度图表
			showBuildCanva(chartData){
				buildCanva = new uCharts({
					$this: _self,
					canvasId: 'buildCanva',
					type: 'column',
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					enableScroll: true,//开启图表拖拽功能
					xAxis: {
						disableGrid: true,
						itemCount: 4,
						scrollShow: true
					},
					yAxis: {
						min: 0,
						max: 10,
						format:(val)=>{return val.toFixed(0)+'%'}
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'stack',
							width: _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length
						}
					  }
				});
			},
			touchTaskCanva(e){
				taskCanva.scrollStart(e);
			},
			moveTaskColumn(e) {
				taskCanva.scroll(e);
			},
			touchEndTaskColumn(e) {
				taskCanva.scrollEnd(e);
				taskCanva.touchLegend(e, {
					animation:true,
				});
				taskCanva.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			
			touchWorkCanva(e){
				workCanva.scrollStart(e);
			},
			moveWorkColumn(e) {
				workCanva.scroll(e);
			},
			touchEndWorkColumn(e) {
				workCanva.scrollEnd(e);
				workCanva.touchLegend(e, {
					animation:true,
				});
				workCanva.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			
			touchProgressCanva(e){
				progressCanva.scrollStart(e);
			},
			moveProgressColumn(e) {
				progressCanva.scroll(e);
			},
			touchEndProgressColumn(e) {
				progressCanva.scrollEnd(e);
				progressCanva.touchLegend(e, {
					animation:true,
				});
				progressCanva.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			
			touchBuildCanva(e){
				buildCanva.scrollStart(e);
			},
			moveBuildColumn(e) {
				buildCanva.scroll(e);
			},
			touchEndBuildColumn(e) {
				buildCanva.scrollEnd(e);
				buildCanva.touchLegend(e, {
					animation:true,
				});
				buildCanva.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			changeData(){
				if(isJSON(_self.textarea)){
					let newdata=JSON.parse(_self.textarea);
					canvaColumn.updateData({
						series: newdata.series,
						categories: newdata.categories
					});
				}else{
					uni.showToast({
						title:'数据格式错误',
						image:'../../../static/images/alert-warning.png'
					})
				}
			},
			toNewsDetail(item){
				uni.navigateTo({
					url: '../newsdetail/index?id='+item.NewsId
				})
			}
		}
	}
</script>

<style>
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
		  background: #DE1727;
	  }
	.page-content{
		padding-bottom: 120upx;
	}
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
		overflow: auto;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.top-wrap{
		font-size: 0; 
	}
	.top-bg{
		font-size: 0;
		width: 100%;
		height: 100upx;
	}
	.group-wrap{
		padding: 40upx 30upx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.group-title{
		padding-left: 22upx;
		font-size: 32upx;
		line-height: 1;
		color: #2E2E2E;
		border-left: 8upx solid #DE1727;
	}
	.select-month{
		line-height: 1;
	}
	.table-title{
		background-color: #F6F6F6;
		color: #2E2E2E;
	}
	.cu-item{
		line-height: 1;
	}
	.bottom-border{
		border-bottom: 20upx solid #f6f6f6;
	}
	.tablebox{
		
	}
	.header-row{
		
	}
	.cu-item{
		font-size: 26upx;
		line-height: 1;
	}
	.font-24{
		font-size: 24upx;
	}
</style>
