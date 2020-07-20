<template>
	<view class="page-content">
		<view class="tip-wrap">
			<image src="../../static/default-pic.png" mode="" class="logo"></image>
			<view class="tip-zh">甘德县四级联户工作机制平台</view>
			<view class="tip-en">Gande county work platform</view>
			
			<form @submit="formSubmit">
				<input class="form-input" name="username" @input="changeUsername" type="text" value="" placeholder="请输入账号"/>
				<input class="form-input" name="password" @input="changePassword" type="password" value="" placeholder="请输入密码"/>
				<button class="login-btn" formType="submit">提交</button>
			</form>
			<view class="agreement-wrap align-center">
				<label @click="changeCheck" class="flex align-center">
					<radio value="r1" :checked="checked" color="#E9A7A7"/>登录即代表已阅读并同意
					<text @click.stop="showAgreement" class="agreement-btn">隐私协议</text>和<text @click.stop="showAgreement" class="agreement-btn">免责声明</text>
				</label>
			</view>
		</view>
		<tui-modal :show="showModel" @cancel="hideModel" :custom="true" title="隐私协议">
			<view class="tui-modal-custom">
				<view class="tui-modal-custom-text">
					总则
					用户在接受【甘德四级联户平台】之前，请务必仔细阅读本条款并同意本声明。 　　
					为切实保护【甘德四级联户平台】用户隐私权，优化用户体验，【甘德四级联户平台】根据现行法规及政策，制定本《个人信息保护政策》。本《个人信息保护政策》将详细说明【甘德四级联户平台】在获取、管理及保护用户个人信息方面的政策及措施。本《个人信息保护政策》适用于【甘德四级联户平台】向你提供的所有服务，无论你是通过计算机设备、移动终端获得的【甘德四级联户平台】服务。
					本个人信息保护政策是你使用【甘德四级联户平台】服务及各项功能的基础性法律文件，我们希望你在使用【甘德四级联户平台】服务前仔细阅读并明确你已经充分理解、接受本政策的内容，希望你可以根据自己的理解做出合适的选择。在我们更新本个人信息保护政策后，你继续使用我们的产品与/或服务，即意味着你同意本个人信息保护政策(含更新版本)内容，并且同意我们按照本个人信息保护政策收集、使用、保存和共享你的相关信息。
				</view>
				<tui-button height="72rpx" :size="28" type="danger" shape="circle" @click="hideModel">确定</tui-button>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	import md5 from '../../static/md5.js'
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		data() {
			return {
				checked: false,
				showModel: false,
				username: '',
				password: ''
			};
		},
		onLoad() {
			
		},
		created() {
			if(uni.getStorageSync('token')){
				uni.redirectTo({
					url: '../index/index'
				})
			}
		},
		mounted() {
			
		},
		methods: {
			changeUsername(e){
				 this.username = e.target.value
			},
			changePassword(e){
				 this.password = e.target.value
			},
			changeCheck(){
				this.checked = !this.checked
			},
			hideModel(){
				this.showModel = false
			},
			showAgreement(){
				this.showModel = true
			},
			getPower(){
				this.tui.request("/ClientData/GetAppClientDataJson","POST").then((res)=>{
					//console.log(res)
					uni.setStorageSync('dataItem', res.dataItem); //字典项
					uni.setStorageSync('authorizeMenu', res.authorizeMenu); //权限信息
					uni.navigateTo({
						url: '../index/index'
					})
				})
			},
			formSubmit: function(e) {
				let _this = this;
				//表单规则
				let rules = [{
					name: "username",
					rule: ["required"], //可使用区间，此处主要测试功能
					msg: ["请输入用户名"]
				}, {
					name: "password",
					rule: ["required"],
					msg: ["请输入密码"]
				}];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if(!this.checked){
					this.tui.toast('请阅读并同意用户协议！');
					return
				}
				if (!checkRes) {
					this.tui.request("/Login/AppLogin","POST",{
						username: _this.username,
						password: md5(_this.password),
					}).then((res)=>{
						// {
						// 	"type": 1,
						// 	"errorcode": 0,
						// 	"message": "登录成功。",
						// 	"resultdata": {
						// 		"UserId": "9c41c32a-cd2f-4447-9531-f2d32e13eaa8",
						// 		"Code": null,
						// 		"UserName": "刘伟涛",
						// 		"Account": "aaa",
						// 		"Password": null,
						// 		"LogTime": "2020-07-16 23:22:47",
						// 		"Secretkey": null,
						// 		"Gender": null,
						// 		"CompanyId": "e92342fe-5819-431a-bcfc-180ba0349528",
						// 		"CompanyName": "甘德县",
						// 		"DepartmentId": null,
						// 		"ObjectId": "c24944bf-56df-4364-a0eb-85f306d6ce1a,9c41c32a-cd2f-4447-9531-f2d32e13eaa8",
						// 		"IPAddress": "124.64.38.82",
						// 		"IPAddressName": "北京市海淀区 联通",
						// 		"IsSystem": false,
						// 		"Token": "26D48D74B68751B7FC21FB9ED793ADEA4B2F0C635A0DA468845C96168506DEA542E71BB1C7749156",
						// 		"DataAuthorize": null,
						// 		"Nature": "3", //3:县 6乡 7村 7&&IsWarner 联户员
						// 		"IsWarner": null,
						// 		"XianCode": "e92342fe-5819-431a-bcfc-180ba0349528",
						// 		"XianName": null,
						// 		"XiangCode": null,
						// 		"XiangName": null,
						// 		"CunCode": null,
						// 		"CunName": null
						// 	}
						// }
						
						if (res.errorcode == 0 && res.type == 1) {
							this.tui.toast('登录成功');
							uni.setStorageSync('userinfo', JSON.stringify(res.resultdata));
							uni.setStorageSync('token', res.resultdata.Token);
							_this.getPower()
							// setTimeout(()=>{
							// 	uni.navigateTo({
							// 		url: '../index/index'
							// 	})
							// },1000)
							
						} else {
							this.tui.toast(res.message);
						}
					}).catch((res)=>{})
					
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			}
		}
	}
</script>

<style>
	.page-content{
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
		background-image: url(../../static/login-bg.png);
		background-size: cover;
	}
	.tip-wrap{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 300rpx;
	}
	.logo{
		width: 150rpx;
		height: 150rpx;
		border-radius: 20px;
	}
	.tip-zh{
		color: #fff;
		font-size: 42rpx;
		text-align: center;
		margin-top: 42rpx;
	}
	.tip-en{
		color: #fff;
		font-size: 18rpx;
		text-align: center;
		margin-top: 12rpx;
	}
	form{
		margin-top: 266rpx;
	}
	.form-input{
		width: 500rpx;
		border:1px solid rgba(241,192,192,1);
		height: 80rpx;
		border-radius: 40rpx;
		margin-bottom: 30rpx;
		text-align: center;
		padding: 0 20rpx;
		color: #F1C0C0;
	}
	.login-btn{
		width: 500rpx;
		background: #fff;
		color: #DE1727;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		margin-bottom: 30rpx;
	}
	.agreement-wrap{
		position: fixed;
		display: flex;
		justify-content: center;
		width: 100%;
		left: 0;
		bottom: 36rpx;
		font-size: 22rpx;
		color: #E9A7A7;
		text-align: center;
	}
	uni-radio .wx-radio-input, uni-checkbox .wx-checkbox-input, uni-radio .uni-radio-input, uni-checkbox .uni-checkbox-input {
	    margin: 0;
	    width: 24rpx;
	    height: 24rpx;
	}
	uni-radio::before, uni-checkbox::before {
	    color: #fff !important;
		margin-top: -8px;
		right: 1px;
		font-size: 12px;
	}
	.agreement-btn{
		margin: 0 10rpx;
	}
</style>
