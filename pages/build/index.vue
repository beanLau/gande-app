<template>
	<view class="container">
		<uni-nav-bar status-bar color="#fff" fixed background-color="#DE1727" title="党建"></uni-nav-bar>
		<view class="title-wrap">
			<view class="group-title">
				党建任务
			</view>
			<view class="title-right" @click="moreBuild">
				<text>更多</text>
				<uni-icons type="arrowright" :size="16" color="#aaa"></uni-icons>
			</view>
		</view>
		<view class="task-list" v-if="jibie == 2">
			<view class="task-item" v-for="item in productList" @click="buildDetail2(item)">
				<view class="task-right">
					<view class="task-title">
						{{item.Title}}
					</view>
					<view class="task-desc" v-html="item.Renwu">
					</view>
					<view class="task-time">
						{{item.RenwuQixianDate}}
					</view>
				</view>
			</view>
		</view>
		<view class="task-list" v-if="jibie == 3">
			<view class="task-item" v-for="item in productList" @click="buildDetail(item)">
				<view class="task-right">
					<view class="task-title">
						{{item.RenwuTitle}}
					</view>
					<view class="task-desc" v-html="item.Huibao">
					</view>
					<view class="task-time">
						{{item.RenwuQixianDate}}
					</view>
				</view>
			</view>
		</view>
		<view v-if="list && productList.length == 0" class="nodata-wrap flex">
			<image src="../../static/nodata.png" mode="" class="nodata-pic"></image>
			<text class="nodata-tip">暂无数据</text>
		</view>
		<view class="title-wrap">
			<view class="group-title">
				党支部会议
			</view>
			<view class="title-right" @click="moreZhibu">
				<text>更多</text>
				<uni-icons type="arrowright" :size="16" color="#aaa"></uni-icons>
			</view>
		</view>
		<view class="task-list" v-for="item in zhibuList">
			<view class="task-item">
				<image :src="item.img" mode="" class="task-pic"></image>
				<view class="task-right">
					<view class="task-title">
						{{item.Title}}
					</view>
					<view class="task-desc" v-html="item.Neirong"></view>
					<view class="task-time">
						{{item.CreateDate}}
					</view>
				</view>
			</view>
		</view>
		<view v-if="list && zhibuList.length == 0" class="nodata-wrap flex">
			<image src="../../static/nodata.png" mode="" class="nodata-pic"></image>
			<text class="nodata-tip">暂无数据</text>
		</view>
		<view class="title-wrap">
			<view class="group-title">
				党员会议
			</view>
			<view class="title-right" @click="moreDangyuan">
				<text>更多</text>
				<uni-icons type="arrowright" :size="16" color="#aaa"></uni-icons>
			</view>
		</view>
		<view class="task-list" v-for="item in dangyuanList">
			<view class="task-item">
				<image :src="item.img" mode="" class="task-pic"></image>
				<view class="task-right">
					<view class="task-title">
						{{item.Title}}
					</view>
					<view class="task-desc" v-html="item.Neirong"></view>
					<view class="task-time">
						{{item.CreateDate}}
					</view>
				</view>
			</view>
		</view>
		<view v-if="list && dangyuanList.length == 0" class="nodata-wrap flex">
			<image src="../../static/nodata.png" mode="" class="nodata-pic"></image>
			<text class="nodata-tip">暂无数据</text>
		</view>
		<view class="title-wrap">
			<view class="group-title">
				党课
			</view>
			<view class="title-right" @click="moreDangke">
				<text>更多</text>
				<uni-icons type="arrowright" :size="16" color="#aaa"></uni-icons>
			</view>
		</view>
		<view class="task-list" v-for="item in dangkeList">
			<view class="task-item">
				<image :src="item.img" mode="" class="task-pic"></image>
				<view class="task-right">
					<view class="task-title">
						{{item.Title}}
					</view>
					<view class="task-desc" v-html="item.Neirong"></view>
					<view class="task-time">
						{{item.CreateDate}}
					</view>
				</view>
			</view>
		</view>
		<view v-if="list && dangkeList.length == 0" class="nodata-wrap flex">
			<image src="../../static/nodata.png" mode="" class="nodata-pic"></image>
			<text class="nodata-tip">暂无数据</text>
		</view>
	</view>
</template>
<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {uniNavBar},
		data() {
			return {
				list: [1,2,3,4],
				productList: [],
				zhibuList: [],
				dangyuanList: [],
				dangkeList: [],
				jibie: 0,
				url: ''
			}
		},
		mounted: function(options) {
			let userinfo = uni.getStorageSync("userinfo")
			if(userinfo){
				userinfo = JSON.parse(userinfo)
				this.userinfo = userinfo
				if(userinfo.Nature == 3){ //县
					this.jibie = 1
				}else if(userinfo.Nature == 6){ //乡
					this.jibie = 2
					this.url = 'Siji/AFP_DangjianRenwu/GetPageListJson'
				}else if(userinfo.Nature == 7 && userinfo.IsWarner == 0){ //村
					this.jibie = 3
					this.url = 'Siji/AFP_DangjianRenwuHuibao/GetPageListJson'
				}else{ //联户员
					this.jibie = 4
				}
			}
			this.getDangjianList();
			this.getZhibuList();
			this.getDangyuanList();
			this.getDangkeList();
		},
		methods: {
			update(){
				console.log('更新呢')
				this.getDangjianList();
				this.getZhibuList();
				this.getDangyuanList();
				this.getDangkeList();
			},
			getDangjianList(){
				let _this = this;
				let queryJson = {
					XiangCode: _this.userinfo.XiangCode || '',
					Keyword: '',
					StatusCode: '',
					beginTime: '',
					endTime: ''
				}
				if(_this.jibie == 3){
					queryJson.CunCode = _this.userinfo.CunCode || ''
				}
				let resData = {
					"queryJson": decodeURIComponent(JSON.stringify(queryJson)),
					"rows": '5',
					"page": '1',
					"sidx": "CreateDate",
					"sord": "desc"
				}
				console.log(resData)
				this.tui.request(_this.url,"GET",resData).then((res)=>{
					console.log(res)
					_this.productList = res.rows;
				}).catch(e=>{
					console.log(e)
				})
			},
			getZhibuList(){
				let _this = this;
				let resData = {
					"queryJson": decodeURIComponent(JSON.stringify({
						XiangCode: _this.userinfo.XiangCode || '',
						CunCode: _this.userinfo.CunCode || '',
						Keyword: '',
						beginTime: '',
						endTime: '',
						ConType: '0'
					})),
					"rows": '5',
					"page": '1',
					"sidx": "CreateDate",
					"sord": "desc"
				}
				console.log(resData)
				this.tui.request('Siji/AFP_Dangjian/GetPageListJson',"GET",resData).then((res)=>{
					console.log(res)
					if(res.rows && Array.isArray(res.rows)){
						res.rows.map(item=>{
							let srcs = item.Imgs || ''
							srcs = srcs.split(";")
							srcs.map(src=>{
								if(src.indexOf('http') == -1){
									src = 'http://110.166.84.163:8002/' + src
								}
							})
							item.Imgs = srcs
							if(srcs.length > 0){
								item.img = srcs[0]
							}else{
								item.img = '../../static/task_defult.png'
							}
						})
					}
					_this.zhibuList = res.rows;
				}).catch(e=>{
					console.log(e)
				})
			},
			getDangyuanList(){
				let _this = this;
				let resData = {
					"queryJson": decodeURIComponent(JSON.stringify({
						XiangCode: _this.userinfo.XiangCode || '',
						CunCode: _this.userinfo.CunCode || '',
						Keyword: '',
						beginTime: '',
						endTime: '',
						ConType: '1'
					})),
					"rows": '5',
					"page": '1',
					"sidx": "CreateDate",
					"sord": "desc"
				}
				console.log(resData)
				this.tui.request('Siji/AFP_Dangjian/GetPageListJson',"GET",resData).then((res)=>{
					if(res.rows && Array.isArray(res.rows)){
						res.rows.map(item=>{
							let srcs = item.Imgs || ''
							srcs = srcs.split(";")
							srcs.map(src=>{
								if(src.indexOf('http') == -1){
									src = 'http://110.166.84.163:8002/' + src
								}
							})
							item.Imgs = srcs
							if(srcs.length > 0){
								item.img = srcs[0]
							}else{
								item.img = '../../static/task_defult.png'
							}
						})
					}
					_this.dangyuanList = res.rows;
				}).catch(e=>{
					console.log(e)
				})
			},
			getDangkeList(){
				let _this = this;
				let resData = {
					
						"queryJson": decodeURIComponent(JSON.stringify({
							XiangCode: _this.userinfo.XiangCode || '',
							CunCode: _this.userinfo.CunCode || '',
							Keyword: '',
							beginTime: '',
							endTime: '',
							ConType: '2'
						})),
						"rows": '5',
						"page": '1',
						"sidx": "CreateDate",
						"sord": "desc"
				}
				console.log(resData)
				this.tui.request('Siji/AFP_Dangjian/GetPageListJson',"GET",resData).then((res)=>{
					console.log(res)
					if(res.rows && Array.isArray(res.rows)){
						res.rows.map(item=>{
							let srcs = item.Imgs || ''
							srcs = srcs.split(";")
							srcs.map(src=>{
								if(src.indexOf('http') == -1){
									src = 'http://110.166.84.163:8002/' + src
								}
							})
							item.Imgs = srcs
							if(srcs.length > 0){
								item.img = srcs[0]
							}else{
								item.img = '../../static/task_defult.png'
							}
						})
					}
					_this.dangkeList = res.rows;
				}).catch(e=>{
					console.log(e)
				})
			},
			moreBuild(){
				uni.navigateTo({
					url: '../buildList/index'
				})
			},
			moreZhibu(){
				uni.navigateTo({
					url: '../zhibuList/index'
				})
			},
			moreDangyuan(){
				uni.navigateTo({
					url: '../dangyuanList/index'
				})
			},
			moreDangke(){
				uni.navigateTo({
					url: '../dangkeList/index'
				})
			},
			buildDetail(item){
				uni.navigateTo({
					url: '../buildDetail/index?id=' + item.ID + '&RenwuID='+ item.RenwuID
				})
			},
			buildDetail2(item){
				uni.navigateTo({
					url: '../buildDetail/index?RenwuID=' + item.ID
				})
			}
		}
	}
</script>

<style>
	.container {
		padding-bottom: 120upx;
		background: #fff;
	}
	.title-wrap{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 22rpx 30rpx;
		margin-top: 20rpx;
		border-bottom: 1px solid #eee;
	}
	.group-title{
		position: relative;
		color: #2E2E2E;
		font-size: 32rpx;
		font-weight:bold;
		line-height:34rpx;
		padding-left: 20rpx;
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
	.title-right{
		font-size: 26rpx;
		color: #9A9A9A;
	}
	.task-list{
		padding: 25rpx 30rpx;
	}
	.task-item{
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;
	}
	.task-item:last-of-type{
		margin-bottom: 0;
	}
	.task-pic{
		width: 160rpx;
		height: 160rpx;
		flex-shrink: 0;
	}
	.task-right{
		height: 160rpx;
		padding-left: 25rpx;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
		white-space: pre-wrap;
	}
	.task-title{
		color: #4E4E4E;
		font-size: 32rpx;
	}
	.task-desc{
		color: #aaa;
		font-size: 24rpx;
	}
	.task-time{
		color: #aaa;
		font-size: 24rpx;
	}
</style>
