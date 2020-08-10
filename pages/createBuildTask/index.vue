<template>
	<view class="container">
		<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="创建党建任务"></uni-nav-bar>
		
		<form @submit="formSubmit" @reset="formReset">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务标题</view>
					<input placeholder-class="tui-phcolor" @input="changeTitle" :value="title" class="tui-input" name="title" placeholder="请输入任务标题" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务期限（天）</view>
					<input placeholder-class="tui-phcolor" type="number" min="0" @input="changeQixian" :value="qixian" class="tui-input" name="title" placeholder="请输入任务期限天数"/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务执行党支部</view>
					<u-checkbox-group @change="bindPickerChange" class="checkbox-group">
						<u-checkbox 
							active-color="#DE1727"
							v-model="item.checked" 
							v-for="(item, index) in xiangList" :key="index" 
							:name="item.DangzhibuName"
						><text class="checkbox-item">{{item.DangzhibuName}}</text></u-checkbox>
					</u-checkbox-group>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务内容</view>
				</view>
				
			</tui-list-cell>
			<view class="textarea-wrap">
				<textarea placeholder-style="color:#999" placeholder="请输入任务内容" @input="changeContent" :value="content"/>
			</view>
			<view class="tui-btn-box flex">
				<button class="tui-button-primary cancel-btn" hover-class="tui-button-hover" @click="cacelCb">取消</button>
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
				isLoading: false
			}
		},
		mounted() {
			let userinfo = uni.getStorageSync("userinfo")
			if(userinfo){
				userinfo = JSON.parse(userinfo)
				this.userinfo = userinfo
			}
			let dataItem = uni.getStorageSync('dataItem');
			this.classifyList = dataItem.renwufenlei || [];
			this.degreeList = dataItem.jinjichengdu || [];
			console.log(this.classifyList)
			console.log(this.degreeList)
			this.getXiangList();
		},
		methods: {
			cacelCb(){
				uni.navigateBack()
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
					return arr.includes(item.DangzhibuName)
				})
				selectArr.map(item=>{
					selectNames.push(item.DangzhibuName)
					selectIds.push(item.ID)
				})
				selectNames = selectNames.join(",")
				selectIds = selectIds.join(",")
				this.selectNames = selectNames;
				this.selectIds = selectIds;
			},
			getXiangList(){
				let _this = this;
				let resData = {
					"queryJson": decodeURIComponent(JSON.stringify({
						XiangCode: _this.userinfo.XiangCode || ''
					}))
				}
				this.tui.request('/Siji/AFP_Dangzhibu/GetListJson',"GET", resData).then((res)=>{
					console.log(res)
					this.xiangList = res || []
				})
			},
			formSubmit: function(e) {
				if(this.isLoading){
					return
				}
				let _this = this;
				if(!_this.title){
					_this.$refs.uToast.show({
						title: '请输入党建任务标题',
					})
					return
				}
				if(!_this.qixian){
					_this.$refs.uToast.show({
						title: '请输入任务期限',
					})
					return
				}
				if(!_this.selectIds){
					_this.$refs.uToast.show({
						title: '请选择执行党支部',
					})
					return
				}
				if(!_this.content){
					_this.$refs.uToast.show({
						title: '请输入下发内容',
					})
					return
				}
				let reqData = {
					"entity":{
						XiangCode: _this.userinfo.XiangCode || '',
						XiangName: _this.userinfo.XiangName || '',
						"Title": _this.title,
						"Qixian": parseInt(_this.qixian),
						"Renwu": _this.content,
						"DzbNames": _this.selectNames,
						"DzbIDs": _this.selectIds,
						"DzbCount": _this.selectIds.split(',').length
					}
				}
				console.log(reqData)
				_this.isLoading = true
				_this.tui.request("Siji/AFP_DangjianRenwu/SaveForm",'POST',reqData).then((res)=>{
					console.log(res)
					_this.isLoading = false;
					if(res.type == 1){
						_this.$refs.uToast.show({
							title: '任务创建成功~',
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
