<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<archives v-if="PageCur=='archives'"></archives>
		<updown ref="updown" v-if="PageCur=='updown'"></updown>
		<build ref="build" v-if="PageCur=='build'"></build>
		<my ref="my" v-if="PageCur=='my'"></my>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home" v-if="(jibie == 1 || jibie == 2) && authorizeMenu.dashujufenxi">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/home' + [PageCur=='home'?'-cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-red':'text-gray'">大数据分析</view>
			</view>
			<view class="action" @click="NavChange" data-cur="archives" v-if="jibie == 2 && authorizeMenu.aizhinengdanganku">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/archives' + [PageCur == 'archives'?'-cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='archives'?'text-red':'text-gray'">AI档案库</view>
			</view>
			<view class="action" @click="NavChange" data-cur="updown" v-if="authorizeMenu.shangchuanxiada">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/updown' + [PageCur == 'updown'?'-cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='updown'?'text-red':'text-gray'">上传下达</view>
			</view>
			<view class="action" @click="NavChange" data-cur="build" v-if="(jibie == 2 || jibie == 3) && authorizeMenu.dangjian">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/build' + [PageCur == 'build'?'-cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='build'?'text-red':'text-gray'">党建</view>
			</view>
			<view class="action" @click="NavChange" data-cur="my" v-if="authorizeMenu.wode">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/my' + [PageCur == 'my'?'-cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='my'?'text-red':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'home',
				userinfo: {},
				jibie: 0,
				authorizeMenu: {}
			}
		},
		onShow() {
			if(this.PageCur == 'build'){
				this.$refs.build.update()
			}else if(this.PageCur == 'my'){
				this.$refs.my.update()
			}
		},
		mounted() {
			let userinfo = uni.getStorageSync("userinfo")
			let authorizeMenu = uni.getStorageSync("authorizeMenu");
			console.log(authorizeMenu)
			this.authorizeMenu = authorizeMenu
			if(userinfo){
				userinfo = JSON.parse(userinfo)
				this.userinfo = userinfo
				console.log(this.userinfo)
				if(userinfo.Nature == 3){ //县
					this.jibie = 1
				}else if(userinfo.Nature == 6){ //乡
					this.jibie = 2
				}else if(userinfo.Nature == 7 && userinfo.IsWarner == 0){ //村
					this.jibie = 3
					this.PageCur = 'updown'
				}else{ //联户员
					this.jibie = 4
					this.PageCur = 'updown'
				}
				if((this.jibie == 1 || this.jibie == 2) && this.authorizeMenu.dashujufenxi){
					this.PageCur = 'home'
				}else if(this.jibie == 2 && this.authorizeMenu.aizhinengdanganku){
					this.PageCur = 'archives'
				}else if((this.jibie == 1 || this.jibie == 2) && this.authorizeMenu.shangchuanxiada){
					this.PageCur = 'updown'
				}else if(this.jibie == 2 && this.authorizeMenu.dangjian){
					this.PageCur = 'build'
				}else if(this.authorizeMenu.wode){
					this.PageCur = 'my'
				}
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		},
		onReachBottom: function() {
			if(this.PageCur == 'updown'){
				this.$refs.updown.loadMore()
			}
		},
		//页面相关事件处理函数--监听用户下拉动作
		onPullDownRefresh: function() {
			if(this.PageCur == 'updown'){
				this.$refs.updown.refresh()
			}
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},1500)
		}
	}
</script>

<style>

</style>
