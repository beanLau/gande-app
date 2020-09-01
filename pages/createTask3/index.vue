<template>
	<view class="container">
		<uni-nav-bar status-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="发布任务"></uni-nav-bar>
		
		<form @submit="formSubmit" @reset="formReset">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务标题</view>
					<input placeholder-class="tui-phcolor" @input="changeTitle" :value="title" class="tui-input form-right" name="title" placeholder="请输入任务标题" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务期限（天）</view>
					<input placeholder-class="tui-phcolor" type="number" min="0" @input="changeQixian" :value="qixian" class="tui-input form-right" name="title" placeholder="请输入任务期限天数"/>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">紧急程度</view>
					<picker @change="bindDegreeChange" :value="index" rangeKey="ItemName" :range="degreeList" class="form-right">
						<view class="uni-input">{{degreeName || '请选择紧急程度'}}</view>
						<uni-icons type="arrowright" :size="18"></uni-icons>
					</picker>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">选择分类</view>
					<picker @change="bindClassifyChange" :value="index" rangeKey="ItemName" :range="classifyList" class="form-right">
						<view class="uni-input">{{classifyName || '请选择分类'}}</view>
						<uni-icons type="arrowright" :size="18"></uni-icons>
					</picker>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">下发村庄</view>
					<!-- <picker @change="bindPickerChange" mode="multiSelector" :value="index" rangeKey="ItemName" :range="statusList" class="form-right">
						<view class="uni-input">{{selectNames || '请选择下发的村庄'}}</view>
						<uni-icons type="arrowright" :size="18"></uni-icons>
					</picker> -->
					
					<u-checkbox-group @change="bindPickerChange" class="checkbox-group">
						<u-checkbox
							width="200rpx"
							active-color="#DE1727"
							v-model="item.checked" 
							v-for="(item, index) in xiangList" :key="index" 
							:name="item.RealName"
						><text class="checkbox-item">{{item.RealName}}</text></u-checkbox>
					</u-checkbox-group>
				</view>
			</tui-list-cell>
			<!-- <tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">下发内容</view>
				</view>
				
			</tui-list-cell>
			<view class="textarea-wrap">
				<textarea placeholder-style="color:#999" name="content" @input="changeContent" :value="content" placeholder="请输入汇报内容"/>
			</view> -->
			<tui-list-cell :hover="false">
				<view class="group">
					<text class="group-label">语音内容</text>
					<view class="record-audios">
						<view class="audio-item-wrap" v-for="(audio,index) in audios">
							<view class="audio-item" :data-index="index" @click="playRecordAudio">
								<image v-if="recordIndex == index" src="../../static/playing.gif" mode="" class="play-icon"></image>
								<image v-else src="../../static/play-icon.png" mode="" class="play-icon"></image>
								<text class="audio-len">{{audio.len}}</text>
							</view>
							<view class="delete-icon" :data-index="index" @click="deleteRecordAudio">
								<tui-icon name="delete" :size="18" ></tui-icon>
							</view>
						</view>
					</view>
				</view>
			</tui-list-cell>
			<teacher-chat @sendData="sendData"/>
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
	import TeacherChat from "@/components/TeacherChat.vue"
	const form = require("@/components/common/tui-validation/tui-validation.js")
	const recorderManager = uni.getRecorderManager();
	export default {
		components: {uniNavBar,TeacherChat},
		data() {
			return {
				array: ['中国', '美国', '巴西', '日本'],
				audios: [],
				index: 0,
				RenwuID: '',
				XiangCode: '',
				XiangName: '',
				content: '',
				statusList: [],
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
				curentItem: {},
				isLoading: false,
				selectNames: '',
				recordIndex: -1,
				innerAudioContext: null
			}
		},
		onLoad(opt) {
			this.RenwuID = opt.RenwuID
			this.XiangCode = opt.XiangCode
			this.XiangName = opt.XiangName
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
			cancelCb(){
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
					return arr.includes(item.RealName)
				})
				selectArr.map(item=>{
					selectNames.push(item.RealName)
					selectIds.push(item.UserId)
				})
				selectNames = selectNames.join(",")
				selectIds = selectIds.join(",")
				this.selectNames = selectNames;
				this.selectIds = selectIds;
			},
			getXiangList(){
				let _this = this;
				this.tui.request('/BaseManage/User/GetLianHuYuanList',"GET",{
					XiangCode: _this.userinfo.XiangCode,
					CunCode: _this.userinfo.CunCode
				}).then((res)=>{
					console.log(res)
					_this.xiangList = res || []
				})
			},
			deleteRecordAudio(e){
				let index = e.currentTarget.dataset.index;
				let audios = this.audios;
				this.audios.splice(index,1);
				if(this.innerAudioContext && !this.innerAudioContext.paused && this.recordIndex == index){
					this.innerAudioContext.stop();
				}
			},
			playRecordAudio(e){
				let index = e.currentTarget.dataset.index;
				let audios = this.audios;
				if(this.innerAudioContext && !this.innerAudioContext.paused && this.recordIndex == index){
					this.innerAudioContext.stop();
					return
				}
				this.recordIndex = index
				if(this.innerAudioContext){
					this.innerAudioContext.destroy();
					this.innerAudioContext = null
				}
				uni.showLoading({
					title: '音频资源加载中'
				});
				this.initAudioContext()
				console.log(audios[index].src)
				this.innerAudioContext.src = audios[index].src;
				this.innerAudioContext.play();
			},
			initAudioContext(){
				let _this = this;
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.onCanplay(() => {
					console.log('onCanplay')
					uni.hideLoading();
				});
				this.innerAudioContext.onPlay(() => {
					console.log('onPlay')
					uni.hideLoading();
				});
				this.innerAudioContext.onEnded(() => {
					_this.playEnd();
				});
				this.innerAudioContext.onStop(() => {
					_this.playEnd();
				});
				this.innerAudioContext.onWaiting(() => {
					console.log("loading")
					// uni.showLoading({
					//     title: '音频资源加载中'
					// });
				});
				this.innerAudioContext.onError((e) => {
					console.log(e)
					uni.hideLoading()
					_this.$refs.uToast.show({
						title: '资源加载失败',
					})
				});
			},
			//音频播放结束处理逻辑
			playEnd(){
				if(this.innerAudioContext.stop){
					this.innerAudioContext.stop();
				}
				this.recordIndex = -1;
				uni.hideLoading();
			},
			sendData(res){
				console.log(res)
				this.audios.push(res)
			},
			checkboxChange(e){
				console.log(e)
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
				let audioUrlList = []
				_this.audios.map(item=>{
					audioUrlList.push(item.src)
				})
				if(!_this.title){
					_this.$refs.uToast.show({
						title: '请输入任务标题',
					})
					return
				}
				if(!_this.qixian){
					_this.$refs.uToast.show({
						title: '请输入任务期限',
					})
					return
				}
				if(!_this.degreeId){
					_this.$refs.uToast.show({
						title: '请选择紧急程度',
					})
					return
				}
				if(!_this.classifyId){
					_this.$refs.uToast.show({
						title: '请选择分类',
					})
					return
				}
				if(!_this.selectIds){
					_this.$refs.uToast.show({
						title: '请选择执行人',
					})
					return
				}
				if(audioUrlList.length == 0){
					_this.$refs.uToast.show({
						title: '请录制任务语音！',
					})
					return
				}
				let reqData = {
					"entity":{
						XiangCode: _this.userinfo.XiangCode,
						CunCode: _this.userinfo.CunCode,
						StatusCode: 1,
						"StatusName": "待处理",
						"Title": _this.title,
						"JinjiCode": _this.degreeId,
						"TypeCode": _this.classifyId,
						"RenWuQiXian": parseInt(_this.qixian),
						"Neirong": _this.content,
						"RenWuDuiXiangName": _this.selectNames,
						"JinjiName": _this.degreeName,
						"TypeName": _this.classifyName,
						"RenWuDuiXiangCode": _this.selectIds
					},
					"audioUrlList": audioUrlList.join(',')
				}
				console.log(reqData)
				_this.isLoading = true
				_this.tui.request("/Siji/AFP_RenwuCun/SaveForm",'POST',reqData).then((res)=>{
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
	.uni-input{
		display: inline-block;
	}
	
	.audio-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 400upx;
		height: 60upx;
		line-height: 60upx;
		padding: 0 24upx;
		border-radius: 30upx;
		background: #FEF3F3;
		margin-bottom: 30upx;
	}
	.audio-len{
		color: #DE1727;
		font-size: 22upx;
	}
	.audio-item-wrap{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 30rpx;
	}
	.play-icon{
		width: 20rpx;
		height: 20rpx;
	}
	.delete-icon{
		margin-left: 30rpx;
		margin-bottom: 30rpx;
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
