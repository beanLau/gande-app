<template>
	<view class="container">
		<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" right-text="" color="#fff" fixed background-color="#DE1727" title="AI档案库"></uni-nav-bar>
		
		<view class="form-wrap">
			<form @submit="formSubmit" @reset="formReset">
				
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">选择乡镇</view>
						<picker @change="bindXiangChange" :value="index" rangeKey="FullName" :range="xiangList" class="form-right">
							<view class="uni-input">{{xiangName || '请选择乡镇'}}</view>
							<uni-icons type="arrowright" :size="18"></uni-icons>
						</picker>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">选择村庄</view>
						<picker @change="bindCunChange" :value="index" rangeKey="FullName" :range="cunList" class="form-right">
							<view class="uni-input">{{cunName || '请选择村'}}</view>
							<uni-icons type="arrowright" :size="18"></uni-icons>
						</picker>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">关键字</view>
						<input placeholder-class="tui-phcolor" @input="changeKeyword" :value="keyword" class="tui-input" name="title" placeholder="输入关键字搜索" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">搜索类型</view>
						<radio-group class="radio-group" name="chengdu" @change="radioChange">
							<label class="tui-radio">
								<radio value="1" color="#D4091C" :checked="true"/>户
							</label>
							<label class="tui-radio">
								<radio value="2" color="#D4091C" />人
							</label>
						</radio-group>
					</view>
				</tui-list-cell>
				<view class="tui-btn-box flex">
					<button class="tui-button-primary submit-btn" hover-class="tui-button-gray_hover" formType="submit">开始搜索</button>
				</view>
			</form>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		components: {uniNavBar},
		data() {
			return {
				array: ['所有', '美国', '巴西', '日本'],
				index: 0,
				searchType: 1,
				xiangList: [],
				cunList: [],
				xiangId: '',
				xiangName: '',
				cunId: '',
				cunName: '',
				userinfo: {},
				keyword: '',
				isLoading: false
			}
		},
		
		mounted(){
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
				}else if(userinfo.Nature == 7 && !userinfo.IsWarner){ //村
					this.listUrl = 'Siji/AFP_RenwuCun/GetPageListJson'
					this.jibie = 3
				}else{ //联户员
					this.listUrl = 'Siji/AFP_RenWuLianHuYuan/GetPageListJson'
					this.jibie = 4
				}
			}
			console.log(userinfo)
			this.getXiangList();
		},
		methods: {
			changeKeyword(e){
				this.keyword = e.detail.value
			},
			bindXiangChange(e){
				let index = e.target.value;
				this.xiangId = this.xiangList[index].OrganizeId
				this.xiangName = this.xiangList[index].FullName
				this.cunId = ''
				this.cunName = ''
				this.getCunList();
			},
			bindCunChange(e){
				let index = e.target.value;
				this.cunId = this.cunList[index].OrganizeId
				this.cunName = this.cunList[index].FullName
			},
			getCunList(){
				if(!this.xiangId){
					return
				}
				let _this = this;
				this.tui.request('/BaseManage/Organize/GetOrgAreaList',"GET",{
					parentId: this.xiangId,
					nature: 7
				}).then((res)=>{
					console.log(res)
					this.cunList = res || []
				})
			},
			getXiangList(){
				let _this = this;
				this.tui.request('/BaseManage/Organize/GetOrgAreaList',"GET",{
					parentId: _this.userinfo.XianCode,
					nature: 6
				}).then((res)=>{
					console.log(res)
					this.xiangList = res || []
				})
			},
			bindPickerChange(e){
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			radioChange(e){
				this.searchType = e.detail.value;
			},
			formSubmit: function(e) {
				let _this = this;
				let url = ''
				if(this.searchType == 1){ //户搜索
					url = `../familyList/index?XiangCode=${this.xiangId}&CunCode=${this.cunId}&Keyword=${this.keyword}`
				}else{
					url = `../peopleList/index?XiangCode=${this.xiangId}&CunCode=${this.cunId}&Keyword=${this.keyword}`
				}
				uni.navigateTo({
					url: url
				})
			},
			formReset: function(e) {
				console.log("清空数据")
			},
			pageBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	.container {
		height: 100vh;
		background: #fff;
	}
	.navbar-wrap{
		border-top: 50upx solid #DE1727;
		position: relative;
		background: #DE1727;
	}
	.radio-group{
		display: flex;
	}
	.uni-radio-input{
		width: 18px;
		height: 18px;
		margin-right: 4px;
	}
	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		line-height: 32rpx;
		min-width: 120rpx;
		flex-shrink: 0;
	}

	.tui-input {
		text-align: right;
		font-size: 32rpx;
		color: #333;
		padding-left: 20rpx;
		flex: 1;
		overflow: visible;
	}

	.radio-group {
		margin-left: auto;
		transform: scale(0.8);
		transform-origin: 100% center;
		flex-shrink: 0;
	}

	.tui-radio {
		display: flex;
		font-size: 19px;
		vertical-align: middle;
		align-items: center;
		margin-right: 30upx;
	}
	uni-radio .wx-radio-input, uni-checkbox .wx-checkbox-input, uni-radio .uni-radio-input, uni-checkbox .uni-checkbox-input {
		margin: 0;
		width: 36upx;
		height: 36upx;
		margin-right: 8upx;
	}

	.tui-btn-box {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40rpx 50rpx;
		box-sizing: border-box;
		margin-top: 60upx;
	}
	uni-button{
		margin: 0 10px;
	}
	.tui-tips {
		padding: 30rpx;
		color: #999;
		font-size: 24rpx;
	}
	.form-right{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-grow: 1;
		text-align: right;
	}
	.radio-group{
		display: flex;
		align-items: center;
	}
	.textarea-wrap{
		background: #fff;
		padding: 0 20upx;
	}
	.textarea-wrap textarea{
		padding: 10upx 20upx;
		width: 100%;
		border: 1px solid #ccc;
		color: #666;
	}
	.cancel-btn{
		background: #eee;
		color: #999;
	}
	.submit-btn{
		width: 400rpx;
		background: #D4091C;
		color: #fff;
	}
	.uni-radio-input-checked {
		background-color: rgb(222, 23, 39) !important;
		border-color: rgb(222, 23, 39) !important;
	}
	.form-wrap{
		width: 650rpx;
		margin: 44rpx auto;
		box-shadow:0px 0px 18px 2px rgba(170,170,170,0.2);
		border-radius:10px;
	}
</style>
