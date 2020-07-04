<template>
	<view class="page-content">
		<image src="../../static/top-bg.png" mode="scaleToFill" class="top-bg"></image>
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		
		<view class="qiun-columns">
			<view class="group-wrap">
				<view class="group-title">任务完成率</view>
				<view class="select-month" @click="show(3)">
					<text>{{taskMonth}}</text>
					<tui-icon name="turningdown" color="#ccc" :size="18"></tui-icon>
				</view>
			</view>
			<tui-datetime ref="dateTime" :type="type" :cancelColor="cancelColor" :color="color"
			 :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="change"></tui-datetime>
			<view class="qiun-charts" >
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="canvasColumnStack" id="canvasColumnStack" class="charts"  @touchstart="touchColumn"></canvas>
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
				<view class="group-title">问题解决率</view>
				<view class="select-month" @click="show(3)">
					<text>{{taskMonth}}</text>
					<tui-icon name="turningdown" color="#ccc" :size="18"></tui-icon>
				</view>
			</view>
			<view class="qiun-charts" >
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="canvasColumnStack2" id="canvasColumnStack2" class="charts"  @touchstart="touchColumn"></canvas>
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
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
				<view class="qiun-title-dot-light">党建任务完成进度</view>
			</view>
		</view>
		<view class="bg-white padding bottom-border">
			<view class="cu-list grid col-5">
				<view class="cu-item table-title">乡镇</view>
				<view class="cu-item table-title">支部会议</view>
				<view class="cu-item table-title">党员会议</view>
				<view class="cu-item table-title">党课</view>
				<view class="cu-item table-title">完成情况</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item text-red">3</view>
				<view class="cu-item text-blue">4</view>
				<view class="cu-item">4</view>
				<view class="cu-item text-red">未完成</view>
				
				<view class="cu-item">柯庄镇</view>
				<view class="cu-item">3</view>
				<view class="cu-item">4</view>
				<view class="cu-item text-red">4</view>
				<view class="cu-item">未完成</view>
			</view>
		</view>
		<view class="bg-white padding">
			<view class="grid margin-bottom text-center col-5 border">
				<view class="padding table-title">乡镇</view>
				<view class="padding table-title">支部会议</view>
				<view class="padding table-title">党员会议</view>
				<view class="padding table-title">党课</view>
				<view class="padding table-title">完成情况</view>
				
				<view class="padding">柯庄镇</view>
				<view class="padding">3</view>
				<view class="padding text-red">4</view>
				<view class="padding">4</view>
				<view class="padding text-red">未完成</view>
				
				<view class="padding">柯庄镇</view>
				<view class="padding">3</view>
				<view class="padding">4</view>
				<view class="padding text-red">4</view>
				<view class="padding">已未完成</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import  { isJSON } from '@/common/checker.js';
	var _self;
	var canvaColumn=null;
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
				taskMonth: "6月",
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
			this.getServerData();
		},
		methods: {
			show(){
				this.$refs.dateTime.show();
			},
			change() {
				console.log(e);
				this.result = e.result;
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
						_self.textarea = JSON.stringify(ColumnStack);
						_self.showColumnStack("canvasColumnStack",ColumnStack);
						_self.showColumnStack("canvasColumnStack2",ColumnStack);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			showColumnStack(canvasId,chartData){
				canvaColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
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
			touchColumn(e){
				canvaColumn.touchLegend(e);
				canvaColumn.showToolTip(e, {
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
	.top-bg{
		width: 100%;
		height: 140upx;
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
</style>
