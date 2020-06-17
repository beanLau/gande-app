<template>
	<view>
		<image src="../../static/top-bg.png" mode="scaleToFill" class="top-bg"></image>
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<view class="qiun-columns">
			<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
				<view class="qiun-title-dot-light">任务完成率</view>
			</view>
			<view class="qiun-charts" >
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="canvasColumnStack" id="canvasColumnStack" class="charts"  @touchstart="touchColumn"></canvas>
				<!--#endif-->
			</view>
			<view class="bg-white padding">
				<view class="grid margin-bottom text-center col-4">
					<view class="padding" :class="indexs%2==0?'bg-cyan':'bg-blue'" v-for="(item,indexs) in (index+1)*2" :key="indexs">{{indexs+1}}</view>
				</view>
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
				direction: ''
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
			getServerData(){
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						let ColumnStack={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						ColumnStack.categories=res.data.data.ColumnStack.categories;
						ColumnStack.series=res.data.data.ColumnStack.series;
						_self.textarea = JSON.stringify(res.data.data.ColumnStack);
						_self.showColumnStack("canvasColumnStack",ColumnStack);
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
</style>
