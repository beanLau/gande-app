<template>
	<view class="container">
		<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="修改密码"></uni-nav-bar>
		
		<form @submit="formSubmit" @reset="formReset">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">原密码</view>
					<input placeholder-class="tui-phcolor" @input="changeOld" :value="old" class="tui-input" name="title" placeholder="请输入原密码" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">新密码</view>
					<input placeholder-class="tui-phcolor" @input="changeNew" :value="news" class="tui-input" name="title" placeholder="请输入新密码" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">确认密码</view>
					<input placeholder-class="tui-phcolor" @input="changeConfirm" :value="confirm" class="tui-input" name="title" placeholder="请再次输入新密码" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			
			<view class="tui-btn-box flex">
				<button class="tui-button-primary cancel-btn" hover-class="tui-button-hover" @click="cancelCb">取消</button>
				<button class="tui-button-primary submit-btn" hover-class="tui-button-gray_hover" formType="submit">提交</button>
			</view>
		</form>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import md5 from '../../static/md5.js'
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		components: {uniNavBar},
		data() {
			return {
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
				xiangList: [],
				classifyList: [],
				classifyId: '',
				classifyName: '',
				degreeList: [],
				degreeId: '',
				degreeName: '',
				selectNames: '',
				selectIds: '',
				title: '',
				content: "",
				qixian: '',
				isLoading: false,
				old: '',
				news: '',
				confirm: ''
			}
		},
		mounted() {
			let userinfo = uni.getStorageSync("userinfo")
			if(userinfo){
				userinfo = JSON.parse(userinfo)
				this.userinfo = userinfo
			}
		},
		methods: {
			cancelCb(){
				uni.navigateBack()
			},
			changeOld(e){
				this.old = e.detail.value
			},
			changeNew(e){
				this.news = e.detail.value
			},
			changeConfirm(e){
				this.confirm = e.detail.value
			},
			formSubmit: function(e) {
				if(this.isLoading){
					return
				}
				let _this = this;
				if(!_this.old){
					_this.$refs.uToast.show({
						title: '请输入原密码',
					})
					return
				}
				if(!_this.news){
					_this.$refs.uToast.show({
						title: '请输入新密码',
					})
					return
				}
				if(!_this.confirm){
					_this.$refs.uToast.show({
						title: '请再次输入新密码',
					})
					return
				}
				if(_this.confirm != _this.news){
					_this.$refs.uToast.show({
						title: '新密码和确认密码不一样！',
					})
					return
				}
				
				_this.isLoading = true
				//验证旧密码
				_this.tui.request("/PersonCenter/ValidationOldPassword",'POST',{
					OldPassword: md5(_this.old)
				}).then((res)=>{
					if(res.type == 1){
						_this.tui.request("/BaseManage/User/SaveRevisePassword",'POST',{
							keyValue: _this.userinfo.UserId,
							Password: md5(_this.confirm)
						}).then((res)=>{
							_this.$refs.uToast.show({
								title: '密码修改成功~',
								back: true
							})
						})
					}else{
						_this.$refs.uToast.show({
							title: '原密码错误~'
						})
					}
					
				}).catch(e=>{
					console.log(e)
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
		background: #D4091C;
		color: #fff;
	}
	.uni-radio-input-checked {
		background-color: rgb(222, 23, 39) !important;
		border-color: rgb(222, 23, 39) !important;
	}
	.form-right{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-grow: 1;
		text-align: right;
	}
	input{
		text-align: right;
	}
	.checkbox-group{
		justify-content: flex-end;
		padding-left: 20rpx;
	}
</style>
