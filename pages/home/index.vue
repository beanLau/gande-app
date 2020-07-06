<template>
	<view class="page-content">
		<view class="status_bar"></view>
		<view class="top-wrap">
			<image src="../../static/home-top.png" mode="scaleToFill" class="top-bg"></image>
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
		</view>
		<view class="qiun-columns">
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
				<canvas canvas-id="taskCanva" id="taskCanva" class="charts"  @touchstart="touchTaskCanva"></canvas>
				<!--#endif-->
			</view>
		</view>
		<view class="bg-white padding bottom-border">
			<view class="cu-list grid col-4">
				<view class="cu-item table-title">乡镇</view>
				<view class="cu-item table-title">已完成</view>
				<view class="cu-item table-title">未完成</view>
				<view class="cu-item table-title">总数</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item text-red">2</view>
				<view class="cu-item">5</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item">-</view>
				<view class="cu-item">5</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item text-red">2</view>
				<view class="cu-item">5</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item">-</view>
				<view class="cu-item">5</view>
			</view>
		</view>
		
		<view class="qiun-columns">
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
				<canvas canvas-id="workCanva" id="workCanva" class="charts"  @touchstart="touchWorkCanva"></canvas>
				<!--#endif-->
			</view>
		</view>
		<view class="bg-white padding bottom-border">
			<view class="cu-list grid col-4">
				<view class="cu-item table-title">乡镇</view>
				<view class="cu-item table-title">已完成</view>
				<view class="cu-item table-title">未完成</view>
				<view class="cu-item table-title">总数</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item text-red">2</view>
				<view class="cu-item">5</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item">-</view>
				<view class="cu-item">5</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item text-red">2</view>
				<view class="cu-item">5</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item">-</view>
				<view class="cu-item">5</view>
			</view>
		</view>
		<view class="qiun-columns">
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
				<canvas canvas-id="progressCanva" id="progressCanva" class="charts"  @touchstart="touchProgressCanva"></canvas>
				<!--#endif-->
			</view>
		</view>
		<view class="bg-white padding bottom-border">
			<view class="cu-list grid col-5">
				<view class="cu-item table-title font-24">乡镇</view>
				<view class="cu-item table-title font-24">党支部会议</view>
				<view class="cu-item table-title font-24">党员会议</view>
				<view class="cu-item table-title font-24">党课</view>
				<view class="cu-item table-title font-24">状态</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item text-red">2</view>
				<view class="cu-item">5</view>
				<view class="cu-item">5</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item">-</view>
				<view class="cu-item">5</view>
				<view class="cu-item">5</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item text-red">2</view>
				<view class="cu-item">5</view>
				<view class="cu-item">5</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item">-</view>
				<view class="cu-item">5</view>
				<view class="cu-item">5</view>
			</view>
		</view>
		<view class="qiun-columns">
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
				<canvas canvas-id="buildCanva" id="buildCanva" class="charts"  @touchstart="touchBuildCanva"></canvas>
				<!--#endif-->
			</view>
		</view>
		<view class="bg-white padding bottom-border">
			<view class="cu-list grid col-4">
				<view class="cu-item table-title">乡镇</view>
				<view class="cu-item table-title">已完成</view>
				<view class="cu-item table-title">未完成</view>
				<view class="cu-item table-title">总数</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item text-red">2</view>
				<view class="cu-item">5</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item">-</view>
				<view class="cu-item">5</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item text-red">2</view>
				<view class="cu-item">5</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item">-</view>
				<view class="cu-item">5</view>
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
				radius: false
			}
		},
		mounted() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			//初始化当前年月
			let currentMonth = new Date().getFullYear() + '-' + (new Date().getMonth() + 1);
			this.taskMonth = currentMonth;
			this.workMonth = currentMonth;
			this.progressMonth = currentMonth;
			this.buildMonth = currentMonth;
			this.getServerData();
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
				//获取数据，更新任务完成了图表
				taskCanva.updateData({
					"categories": ["任城镇", "新店镇", "邢湾镇"],
					"series": [{
						"name": "已完成",
						"data": [20, 30, 50],
						"color": "#EE9FA5",
						format:(val)=>{return val.toFixed(0)+'%'}
					}, {
						"name": "未完成",
						"data": [80,70, 50],
						"color": '#FAFAFA',
						format:(val)=>{return val.toFixed(0)+'%'}
					}]
				});
			},
			changeWorkMonth(e){
				this.workMonth = e.result;
				//获取数据，更新任务完成了图表
				workCanva.updateData({
					"categories": ["任城镇", "新店镇", "邢湾镇"],
					"series": [{
						"name": "已完成",
						"data": [20, 30, 50],
						"color": "#EE9FA5",
						format:(val)=>{return val.toFixed(0)+'%'}
					}, {
						"name": "未完成",
						"data": [80,70, 50],
						"color": '#FAFAFA',
						format:(val)=>{return val.toFixed(0)+'%'}
					}]
				});
			},
			changeProgressMonth(e){
				this.progressMonth = e.result;
				//获取数据，更新任务完成了图表
				progressCanva.updateData({
					"categories": ["任城镇", "新店镇", "邢湾镇"],
					"series": [{
						"name": "已完成",
						"data": [20, 30, 50],
						"color": "#EE9FA5",
						format:(val)=>{return val.toFixed(0)+'%'}
					}, {
						"name": "未完成",
						"data": [80,70, 50],
						"color": '#FAFAFA',
						format:(val)=>{return val.toFixed(0)+'%'}
					}]
				});
			},
			changeBuildMonth(e){
				this.buildMonth = e.result;
				//获取数据，更新任务完成了图表
				buildCanva.updateData({
					"categories": ["任城镇", "新店镇", "邢湾镇"],
					"series": [{
						"name": "已完成",
						"data": [20, 30, 50],
						"color": "#EE9FA5",
						format:(val)=>{return val.toFixed(0)+'%'}
					}, {
						"name": "未完成",
						"data": [80,70, 50],
						"color": '#FAFAFA',
						format:(val)=>{return val.toFixed(0)+'%'}
					}]
				});
			},
			getServerData(){
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						let ColumnStack={
							"categories": ["任城镇", "新店镇", "邢湾镇"],
							"series": [{
								"name": "已完成",
								"data": [50, 20, 70],
								"color": "#EE9FA5",
								format:(val)=>{return val.toFixed(0)+'%'}
							}, {
								"name": "未完成",
								"data": [50, 80, 30],
								"color": '#FAFAFA',
								format:(val)=>{return val.toFixed(0)+'%'}
							}]
						};
						_self.showTaskCanva(ColumnStack);
						_self.showWorkCanva(ColumnStack);
						_self.showProgressCanva({
							"categories": ["柯曲镇", "上贡麻乡", "下贡麻乡", "岗龙乡", "青珍乡", "江千乡", "下藏科乡"],
							      "series": [{
							        "name": "党支部会议",
							        "data": [35, 36, 31, 33, 13, 34, 30],
									"color": '#FCC5C5'
							      }, {
							        "name": "党员会议",
							        "data": [18, 27, 21, 24, 6, 28, 30],
									"color": '#FD6A76'
							      }, {
							        "name": "党课",
							        "data": [18, 27, 21, 24, 6, 28, 30],
									"color": '#DE1727'
							      }]
						});
						_self.showBuildCanva(ColumnStack)
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
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
					xAxis: {
						disableGrid:true,
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
					xAxis: {
						disableGrid:true,
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
					xAxis: {
						disableGrid:true,
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
					xAxis: {
						disableGrid:true,
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
				taskCanva.touchLegend(e);
				taskCanva.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchWorkCanva(e){
				workCanva.touchLegend(e);
				workCanva.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchProgressCanva(e){
				progressCanva.touchLegend(e);
				progressCanva.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchBuildCanva(e){
				buildCanva.touchLegend(e);
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
