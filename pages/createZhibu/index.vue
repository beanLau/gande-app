<template>
	<view class="container">
		<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="创建支部会议"></uni-nav-bar>
		
		<form @submit="formSubmit" @reset="formReset">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">会议标题</view>
					<input placeholder-class="tui-phcolor" @input="changeTitle" :value="title" class="tui-input" name="title" placeholder="请输入会议标题" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">会议日期</view>
					<view class="begin-time" @click="showBeginTime" style="text-align: right;">
						{{beginTime ? beginTime : '选择会议日期'}}
					</view>
					<tui-datetime ref="beginTime" :type="2" :cancelColor="cancelColor" :color="color"
					 :setDateTime="setDateTime" :unitTop="unitTop" :radius="radius" @confirm="changeBeginTime"></tui-datetime>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">会议地点</view>
					<input placeholder-class="tui-phcolor" @input="changeAddress" :value="address" class="tui-input" name="title" placeholder="请输入会议地点" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">参会人员</view>
					<u-checkbox-group @change="bindPickerChange" class="checkbox-group">
						<u-checkbox 
							active-color="#DE1727"
							v-model="item.checked" 
							v-for="(item, index) in xiangList" :key="index" 
							:name="item.name"
						><text class="checkbox-item">{{item.name}}</text></u-checkbox>
					</u-checkbox-group>
				</view>
			</tui-list-cell>
			<u-upload :action="action" :file-list="fileList" :auto-upload="true" :header="header" @on-remove="removeCb" @on-success="uploadCb" @on-change="uploadChange"></u-upload>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">会议内容</view>
				</view>
				
			</tui-list-cell>
			<view class="textarea-wrap">
				<textarea placeholder-style="color:#999" placeholder="请输入会议内容" @input="changeContent" :value="content"/>
			</view>
			
			<view class="tui-btn-box flex">
				<button class="tui-button-primary cancel-btn" hover-class="tui-button-hover">取消</button>
				<button class="tui-button-primary submit-btn" hover-class="tui-button-gray_hover" formType="submit">提交</button>
			</view>
		</form>
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
				action: 'http://110.166.84.163:8001/PublicInfoManage/ResourceFile/UploadFolderFile',
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
				cancelColor: '#888',
				color: '#5677fc',
				setDateTime: '',
				result: '',
				beginTime: '',
				unitTop: false,
				radius: false, //日期相关参数
				address: '',
				fileList: [],
				imgs: [],
				header: {
					"token": uni.getStorageSync("token")
				}
			}
		},
		mounted() {
			let userinfo = uni.getStorageSync("userinfo")
			if(userinfo){
				userinfo = JSON.parse(userinfo)
				this.userinfo = userinfo
			}
			this.getXiangList();
		},
		methods: {
			uploadChange(res){
				// try{
				// 	let data = JSON.parse(res.data)
				// 	if(data.type == 1){
				// 		data.resultdata = data.resultdata.replace(";","")
				// 		this.imgs.push(data.resultdata)
				// 	}
				// }catch(e){
				// 	console.log(e)
				// 	//TODO handle the exception
				// }
			},
			uploadCb(data, index, lists){
				try{
					if(data.type == 1){
						data.resultdata = data.resultdata.replace(";","")
						if(data.resultdata.indexOf('http') == -1){
							data.resultdata = 'http://110.166.84.163:8001/' + data.resultdata
						}
						this.imgs.push(data.resultdata)
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
			showBeginTime(){
				this.$refs.beginTime.show();
			},
			changeBeginTime(e){
				this.beginTime = e.result;
			},
			changeQixian(e){
				this.qixian = e.detail.value
			},
			changeTitle(e){
				this.title = e.detail.value
			},
			changeAddress(e){
				this.address = e.detail.value
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
					return arr.includes(item.name)
				})
				selectArr.map(item=>{
					selectNames.push(item.name)
					selectIds.push(item.name)
				})
				selectNames = selectNames.join(",")
				selectIds = selectIds.join(",")
				this.selectNames = selectNames;
				this.selectIds = selectIds;
			},
			getXiangList(){
				let _this = this;
				this.tui.request('Siji/AFP_Dangzhibu/GetDzbBy',"GET",{
					cunCode: this.userinfo.CunCode
				}).then((res)=>{
					let list = res.UserNames.split(',')
					let xiangList = []
					list.map(item=>{
						xiangList.push({
							name: item
						})
					})
					console.log(xiangList)
					this.xiangList = xiangList
				})
			},
			formSubmit: function(e) {
				console.log(this.imgs)
				if(this.isLoading){
					return
				}
				let _this = this;
				if(!_this.title){
					_this.$refs.uToast.show({
						title: '请输入会议标题',
					})
					return
				}
				if(!_this.beginTime){
					_this.$refs.uToast.show({
						title: '请选择会议时间',
					})
					return
				}
				if(!_this.address){
					_this.$refs.uToast.show({
						title: '请输入会议地点',
					})
					return
				}
				if(!_this.selectIds){
					_this.$refs.uToast.show({
						title: '请选择参会人员',
					})
					return
				}
				if(!_this.content){
					_this.$refs.uToast.show({
						title: '请输入会议内容',
					})
					return
				}
				let imgs = []
				
				let reqData = {
					"entity":{
						"XiangCode": _this.userinfo.XiangCode,
						"XiangName": _this.userinfo.XiangName,
						"CunCode": _this.userinfo.CunCode,
						"CunName": _this.userinfo.CunName, 
						"ConType": 0,
						"Title": _this.title,
						"Riqi": _this.beginTime,
						"Didian": _this.address,
						"Neirong": _this.content,
						"Renyuan": _this.selectNames,
						"Renshu": _this.selectNames.split(',').length,
						Imgs: _this.imgs.join(';')
					}
				}
				console.log(reqData)
				_this.isLoading = true
				_this.tui.request("/Siji/AFP_Dangjian/SaveForm?keyValue=",'POST',reqData).then((res)=>{
					console.log(res)
					_this.isLoading = false;
					if(res.type == 1){
						_this.$refs.uToast.show({
							title: '会议创建成功~',
							back: true
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
	
	.begin-time{
		flex: 1;
		text-align: right;
		color: #aaa;
		font-size: 30rpx;
	}
	.checkbox-group{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		justify-content: flex-end;
		padding-left: 20rpx;
	}
	.checkbox-item{
		display: inline-block;
		min-width: 200rpx;
	}
</style>
