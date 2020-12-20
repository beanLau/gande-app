<template>
	<view class="page-content">
		<uni-nav-bar status-bar color="#fff" :border="false" background-color="#DE1727" title="我的"></uni-nav-bar>
		<view class="top-bg" :class="{ 'top-bg-show': hideQuick }"></view>
		<view class="info-wrap" :class="{ 'info-wrap-show': hideQuick }">
			<view class="info-top"  :class="{ 'info-top-border': hideQuick }" @click="toInfo">
				<view class="top-left">
					<image :src="img" mode="" class="user-pic"></image>
					<view class="user-info">
						<text class="user-name">{{userinfo.RealName}}</text>
						<!-- <text class="user-phone">{{userinfo.UserName}}</text> -->
					</view>
				</view>
				<uni-icons type="arrowright" :size="18"></uni-icons>
			</view>
			<!-- <view class="quick-btns" v-if="!hideQuick">
				<view class="quick-item">
					<image src="../../static/tabbar/build-cur.png" mode="" class="quick-icon"></image>
					<text class="quick-name">我的问题</text>
				</view>
				<view class="quick-item">
					<image src="../../static/tabbar/build-cur.png" mode="" class="quick-icon"></image>
					<text class="quick-name">我的任务</text>
				</view>
				<view class="quick-item" v-if="jibie == 2 || jibie == 3">
					<image src="../../static/tabbar/build-cur.png" mode="" class="quick-icon"></image>
					<text class="quick-name">我的党建</text>
				</view>
			</view> -->
		</view>
		
		<view class="menu-wrap">
			<tui-list-view>
				<tui-list-cell @click="toInfo" :arrow="true">
					<view class="tui-item-box">
						<tui-icon name="people" :size="24" color="#2E2E2E"></tui-icon>
						<text class="tui-list-cell_name">我的信息</text>
					</view>
				</tui-list-cell>
				<tui-list-cell @click="toTask" :arrow="true" v-if="authorizeMenu.wode && authorizeMenu.wode.woderenwu">
					<view class="tui-item-box">
						<tui-icon name="edit" :size="24" color="#2E2E2E"></tui-icon>
						<view class="tui-list-cell_name">我的任务</view>
					</view>
				</tui-list-cell>
				<tui-list-cell @click="toDangjian" :arrow="true" v-if="(jibie == 2 || jibie == 3) && authorizeMenu.wode && authorizeMenu.wode.wodedangjian">
					<view class="tui-item-box">
						<tui-icon name="edit" :size="24" color="#2E2E2E"></tui-icon>
						<view class="tui-list-cell_name">我的党建</view>
					</view>
				</tui-list-cell>
				<tui-list-cell @click="toQuestion" :arrow="true" v-if="authorizeMenu.wode && authorizeMenu.wode.wodewenti">
					<view class="tui-item-box">
						<tui-icon name="edit" :size="24" color="#2E2E2E"></tui-icon>
						<view class="tui-list-cell_name">我的问题</view>
					</view>
				</tui-list-cell>
				<tui-list-cell @click="toEditPassword" :arrow="true">
					<view class="tui-item-box">
						<tui-icon name="edit" :size="24" color="#2E2E2E"></tui-icon>
						<view class="tui-list-cell_name">修改密码</view>
					</view>
				</tui-list-cell>
				<tui-list-cell @click="checkUpdate" :arrow="true">
					<view class="tui-item-box">
						<tui-icon name="search" :size="24" color="#2E2E2E"></tui-icon>
						<view class="tui-list-cell_name">检测更新</view>
					</view>
				</tui-list-cell>
				<tui-list-cell @click="loginout" :arrow="true">
					<view class="tui-item-box">
						<tui-icon name="shut" :size="24" color="#2E2E2E"></tui-icon>
						<view class="tui-list-cell_name">退出登录</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
		<u-modal v-model="showModule" :show-cancel-button="true" content="确认退出登录吗?" cancel-text="取消" @confirm="confirm"></u-modal>
		<u-modal v-model="showUpdate" :show-cancel-button="true" content="检测到新版本是否下载?" cancel-text="取消" @confirm="toUpdate"></u-modal>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hideQuick: true,
				userinfo: {
					
				},
				img: '',
				jibie: 0,
				showModule: false,
				showUpdate: false,
				authorizeMenu: {},
				apkUrl: ''
			};
		},
		onLoad() {
			
		},
		mounted() {
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
			let authorizeMenu = uni.getStorageSync("authorizeMenu");
			console.log(authorizeMenu)
			this.authorizeMenu = authorizeMenu
			this.getUserInfo();
		},
		methods: {
			update(){
				this.getUserInfo();
			},
			getUserInfo(){
				let _this = this;
				this.tui.request('/BaseManage/User/GetFormJson',"GET",{
					keyValue: this.userinfo.UserId
				}).then((res)=>{
					if(res.HeadIcon){
						res.HeadIcon = 'http://110.166.84.163:8001/' + res.HeadIcon
					}else{
						res.HeadIcon = '../../static/default-pic.png'
					}
					_this.userinfo.RealName = res.RealName
					_this.img = `${res.HeadIcon}?time=${new Date().getTime()}`
				})
			},
			checkUpdate(){
				let _this = this;
				this.tui.request('/Login/CheckVersion',"GET",{
					version: '1.0.10'
				}).then((res)=>{
					console.log(res)
					if(res.resultdata.status == 1){
						_this.apkUrl = res.resultdata.url
						_this.showUpdate = true
						return
					}
					_this.$refs.uToast.show({
						title: '当前已是最新版本！'
					})
				})
			},
			toUpdate(){
				plus.runtime.openURL(this.apkUrl);
			},
			toInfo(){
				uni.navigateTo({
					url: '../myinfo/index'
				})
			},
			toTask(){
				uni.navigateTo({
					url: '../mytask/index'
				})
			},
			toDangjian(){
				uni.navigateTo({
					url: '../mydangjian/index'
				})
			},
			toQuestion(){
				uni.navigateTo({
					url: '../myquestion/index'
				})
			},
			toEditPassword(){
				uni.navigateTo({
					url: '../editpassword/index'
				})
			},
			detail(){
				
			},
			confirm(){
				uni.removeStorageSync("dataItem")
				uni.removeStorageSync("authorizeMenu")
				uni.removeStorageSync("userinfo")
				uni.removeStorageSync("token")
				this.$refs.uToast.show({
					title: '已退出登录！',
					callback : ()=>{
						uni.reLaunch({
							url: '../login/index'
						})
					}
				})
			},
			loginout(){
				let _this = this;
				this.showModule = true
			}
		}
	}
</script>

<style>
	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.tui-list-cell_name {
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tui-ml-auto {
		margin-left: auto;
	}
	
	.tui-right {
		margin-left: auto;
		margin-right: 34rpx;
		font-size: 26rpx;
		color: #999;
	}
	
	.tui-logo {
		height: 52rpx;
		width: 52rpx;
		flex-shrink: 0;
	}
	
	.tui-flex {
		display: flex;
		align-items: center;
	}
	
	.tui-msg-box {
		display: flex;
		align-items: center;
	}
	
	.tui-msg-pic {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: block;
		margin-right: 24rpx;
		flex-shrink: 0;
	}
	
	.tui-msg-item {
		max-width: 500rpx;
		min-height: 80rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.tui-msg-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 34rpx;
		line-height: 1;
		color: #262b3a;
	}
	
	.tui-msg-content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 26rpx;
		line-height: 1;
		color: #9397a4;
	}
	
	.tui-msg-right {
		max-width: 120rpx;
		height: 88rpx;
		margin-left: auto;
		text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	.tui-right-dot {
		height: 76rpx !important;
		padding-bottom: 10rpx !important;
	
	}
	
	.tui-msg-time {
		width: 100%;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #9397a4;
	}
	
	
	
	.top-bg{
		z-index: 1;
		height: 280rpx;
		background: #DE1727;
	}
	.top-bg-show{
		
		height: 200rpx;
	}
	.info-wrap{
		width: 690rpx;
		margin: -260rpx auto 0;
		background: #fff;
		border-radius:10rpx;
		box-shadow:0px 0px 10px 0px rgba(170,170,170,0.1);
		padding: 38rpx 20rpx;
	}
	.info-wrap-show{
		margin: -180rpx auto 0;
	}
	.info-top{
		padding: 0 10rpx 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #eee;
	}
	.info-top-border{
		border: none;
	}
	.top-left{
		display: flex;
		align-items: center;
	}
	.user-pic{
		margin-right: 26rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
	}
	.user-info{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 22rpx;
	}
	.user-name{
		color: #222222;
		font-size: 38rpx;
		font-weight: bold;
	}
	.user-phone{
		color: #666;
		font-size: 26rpx;
	}
	.quick-btns{
		padding-top: 42rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.quick-item{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.quick-icon{
		width: 36rpx;
		height: 36rpx;
	}
	.quick-name{
		margin-top: 20rpx;
		color: #2E2E2E;
		font-size: 26rpx;
		
	}
	
	.menu-wrap{
		width: 690rpx;
		margin: 20rpx auto 0;
		background: #fff;
		border-radius:10rpx;
		box-shadow:0px 0px 10px 0px rgba(170,170,170,0.1);
	}
</style>
