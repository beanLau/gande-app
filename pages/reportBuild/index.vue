<template>
	<view class="container">
		<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="任务汇报"></uni-nav-bar>
		
		<form @submit="formSubmit" @reset="formReset">
			<!-- <tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">完成状态</view>
					<picker @change="bindPickerChange" :value="index" rangeKey="ItemName" :range="statusList" class="form-right">
						<view class="uni-input">{{selectName || '请选择完成状态'}}</view>
						<uni-icons type="arrowright" :size="18"></uni-icons>
					</picker>
				</view>
			</tui-list-cell> -->
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">汇报内容</view>
				</view>
				
			</tui-list-cell>
			<view class="textarea-wrap">
				<textarea placeholder-style="color:#999" name="content" @input="changeContent" :value="content" placeholder="请输入汇报内容"/>
			</view>
			<view class="tui-btn-box flex">
				<button class="tui-button-primary cancel-btn" hover-class="tui-button-hover" @click="pageBack">取消</button>
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
				RenwuID: '',
				XiangCode: '',
				XiangName: '',
				content: '',
				statusList: [],
				curentItem: {},
				isLoading: false,
				selectName: '',
				selectId: ''
			}
		},
		onLoad(opt) {
			this.RenwuID = opt.RenwuID
			this.id = opt.id
		},
		methods: {
			bindPickerChange(e){
				let index = e.target.value
				this.selectName = this.statusList[index].ItemName
				this.selectId = this.statusList[index].ItemValue
			},
			changeContent(e){
				this.content = e.target.value
			},
			radioChange: function(evt) {
				let value = evt.target.value
				let curentItem = this.statusList.find(item=>{
					return item.ItemValue == value
				})
				this.curentItem = curentItem
			},
			formSubmit: function(e) {
				if(this.isLoading){
					return
				}
				let _this = this;
				// if(!_this.selectName){
				// 	this.$refs.uToast.show({
				// 		title: '请选择完成状态',
				// 	})
				// 	return
				// }
				if(!_this.content){
					this.$refs.uToast.show({
						title: '请输入汇报内容',
					})
					// plus.nativeUI.toast( "请输入汇报内容" ,{
					// 	verticalAlign: 'center',
					// 	background: 'rgba(0,0,0,.7)'
					// });
					return
				}
				let reqData = {
					"entity": {
						"RenwuID": _this.RenwuID,
						"Huibao": _this.content
					},
					"keyValue": _this.id
				}
				console.log(reqData)
				_this.isLoading = true
				_this.tui.request("Siji/AFP_DangjianRenwuHuibao/SaveForm",'POST',reqData).then((res)=>{
					console.log(res)
					_this.isLoading = false;
					if(res.type == 1){
						_this.$refs.uToast.show({
							title: '汇报成功',
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
	.uni-input{
		display: inline-block;
	}
	
	.record-audios{
		padding-left: 40rpx;
	}
	.audio-item-wrap{
		display: flex;
		align-items: center;
	}
	.delete-icon{
		margin-left: 30rpx;
		margin-bottom: 30rpx;
	}
</style>
