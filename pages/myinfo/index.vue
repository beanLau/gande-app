<template>
	<view class="container">
		<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="个人信息"></uni-nav-bar>
		
		<form @submit="formSubmit" @reset="formReset">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell"> 
					<view class="tui-title">头像</view>
					<view class="form-right">
						<image :src="img || '../../static/default-pic.png'" class="slot-btn" mode=""></image>
						<uni-icons type="arrowright" :size="18"></uni-icons>
						<u-upload ref="upload" class="upload-wrap" :show-upload-list="false" :custom-btn="true" max-count="1" :action="action" :file-list="fileList"  :auto-upload="true" :header="header" @on-change="uploadChange">
							<view slot="addBtn" class="custom-upload">
								
							</view>
						</u-upload>
					</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">名称</view>
					<view class="right-wrap">
						<input class="search-input" type="text" :value="userinfo.RealName" @input="nameChange"/>
						<uni-icons type="arrowright" :size="18"></uni-icons>
					</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">性别</view>
					<radio-group class="right-wrap radio-group flex" @change="radioChange">
						<label class="tui-radio">
							<radio value="1" color="#D4091C" :checked="userinfo.Gender == 1"/>男
						</label>
						<label class="tui-radio">
							<radio value="2" color="#D4091C" :checked="userinfo.Gender == 2"/>女
						</label>
					</radio-group>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">手机号</view>
					<view class="right-wrap">
						<input class="search-input" type="text" :value="userinfo.Mobile" @input="mobileChange"/>
						<uni-icons type="arrowright" :size="18"></uni-icons>
					</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">邮箱</view>
					<view class="right-wrap">
						<input class="search-input" type="text" :value="userinfo.Email" @input="emailChange"/>
						<uni-icons type="arrowright" :size="18"></uni-icons>
					</view>
				</view>
			</tui-list-cell>
			<view class="tui-btn-box flex">
				<button class="tui-button-primary cancel-btn" hover-class="tui-button-hover">取消</button>
				<button class="tui-button-primary submit-btn" hover-class="tui-button-gray_hover" formType="submit">保存</button>
			</view>
		</form>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
	import md5 from '../../static/md5.js'
	import Decrypt from '@/common/decript.js'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
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
				UserId: "",
				userinfo: {
					HeadIcon: ""
				},
				action: 'http://110.166.84.163:8002/PersonCenter/UploadFile',
				fileList: [],
				img: '',
				sex: 1,
				header: {
					"token": uni.getStorageSync("token")
				}
				
			}
		},
		mounted() {
			let userinfo = uni.getStorageSync("userinfo")
			if(userinfo){
				userinfo = JSON.parse(userinfo)
				this.UserId = userinfo.UserId
			}
			this.getUserInfo();
		},
		methods: {
			nameChange(e){
				this.userinfo.RealName = e.target.value
			},
			mobileChange(e){
				this.userinfo.Mobile = e.target.value
			},
			emailChange(e){
				this.userinfo.Email = e.target.value
			},
			uploadChange(res){
				let _this = this;
				//this.updatePic()
				try{
					_this.$refs.upload.remove(0)
					_this.fileList = []
					console.log(res)
					let data = JSON.parse(res.data)
					if(data.type == 1){
						data.resultdata = data.resultdata.replace(";","")
						let img = 'http://110.166.84.163:8002/' + data.resultdata
						_this.img = `${img}?time=${new Date().getTime()}`
						console.log(_this.img)
						_this.$forceUpdate()
					}
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			},
			removeCb(index){
				this.imgs.splice(index, 1)
				console.log(this.imgs)
			},
			radioChange(e){
				this.userinfo.Gender = e.detail.value;
			},
			updatePic(){
				let _this = this;
				this.tui.request('/BaseManage/User/GetFormJson',"GET",{
					keyValue: this.UserId
				}).then((res)=>{
					if(res.HeadIcon){
						res.HeadIcon = 'http://110.166.84.163:8002/' + res.HeadIcon
					}
					_this.img = res.HeadIcon
				})
			},
			getUserInfo(){
				let _this = this;
				this.tui.request('/BaseManage/User/GetFormJson',"GET",{
					keyValue: this.UserId
				}).then((res)=>{
					console.log(res)
					_this.userinfo = res || {}
					if(_this.userinfo.HeadIcon){
						_this.img = 'http://110.166.84.163:8002/' + _this.userinfo.HeadIcon
					}
					console.log(_this.userinfo)
				})
			},
			changeQixian(e){
				this.qixian = e.detail.value
			},
			changeTitle(e){
				this.title = e.detail.value
			},
			changeContent(e){
				this.content = e.detail.value
			},
			bindDegreeChange(e){
				let index = e.target.value;
				this.degreeId = this.degreeList[index].ItemValue
				this.degreeName = this.degreeList[index].ItemName
			},
			bindClassifyChange(e){
				let index = e.target.value;
				this.classifyId = this.classifyList[index].ItemValue
				this.classifyName = this.classifyList[index].ItemName
			},
			bindPickerChange(arr){
				let xiangList = this.xiangList;
				let selectArr;
				let selectNames = [];
				let selectIds = [];
				if(arr.length == 0){
					this.selectNames = '';
					this.selectIds = '';
					return
				}
				selectArr = xiangList.filter(item=>{
					return arr.includes(item.FullName)
				})
				selectArr.map(item=>{
					selectNames.push(item.FullName)
					selectIds.push(item.OrganizeId)
				})
				selectNames = selectNames.join(",")
				selectIds = selectIds.join(",")
				this.selectNames = selectNames;
				this.selectIds = selectIds;
			},
			getXiangList(){
				let _this = this;
				this.tui.request('/BaseManage/Organize/GetOrgAreaList',"GET",{
					parentId: this.userinfo.XianCode,
					nature: 6
				}).then((res)=>{
					console.log(res)
					this.xiangList = res || []
				})
			},
			formSubmit: function(e) {
				let _this = this;
				if(this.isLoading){
					return
				}
				if(!_this.userinfo.Mobile){
					_this.$refs.uToast.show({
						title: '请输入手机号码',
					})
					return
				}
				if(!/^1\d{10}/.test(_this.userinfo.Mobile)){
					_this.$refs.uToast.show({
						title: '手机号码格式错误',
					})
					return
				}
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(_this.userinfo.Email && !reg.test(_this.userinfo.Email)){
					_this.$refs.uToast.show({
						title: '邮箱格式错误',
					})
					return
				}
				console.log(_this.userinfo.Mobile)
				let reqData = {
					"keyValue": _this.userinfo.UserId,
					"entity":{
						"RealName": _this.userinfo.RealName,
						"Mobile": _this.userinfo.Mobile,
						"Gender": _this.userinfo.Gender,
						"Email": _this.userinfo.Email
						}
				}
				_this.isLoading = true
				_this.tui.request("BaseManage/User/UpdateUserInfo",'POST',reqData).then((res)=>{
					console.log(res)
					_this.isLoading = false;
					if(res.type == 1){
						_this.$refs.uToast.show({
							title: '个人信息修改成功~'
						})
					}else{
						_this.$refs.uToast.show({
							title: res.message
						})
					}
					
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
		justify-content: flex-end;
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
		justify-content: space-between;
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
	.right-wrap{
		position: relative;
		display: flex;
		align-items: center;
		flex-grow: 1;
		text-align: right;
	}
	.slot-btn{
		z-index: 0;
		width: 100rpx;
		height: 100rpx;
	}
	.custom-upload{
		display: inline-block;
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 300rpx;
		z-index: 1;
		background: #ccc;
		opacity: 0;
	}
	.tui-radio {
		display: flex;
		font-size: 19px;
		vertical-align: middle;
		align-items: center;
		margin-right: 30upx;
	}
	.search-input{
		display: inline-block;
		flex: 1;
		text-align: right;
	}
	.u-preview-wrap{
		display: none;
	}
</style>
