<template>
	<view class="container">
		<view class="navbar-wrap">
			<uni-nav-bar @clickLeft="pageBack" left-icon="back" left-text="返回" right-text="" color="#fff" fixed background-color="#DE1727" title="发布任务"></uni-nav-bar>
		</view>
		<form @submit="formSubmit" @reset="formReset">
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务标题</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="mobile" placeholder="请输入任务标题" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">紧急程度</view>
					<radio-group class="radio-group" name="sex">
						<label class="tui-radio">
							<radio value="1" color="#5677fc" />一般
						</label>
						<label class="tui-radio">
							<radio value="2" color="#5677fc" />紧急
						</label>
						<label class="tui-radio">
							<radio value="3" color="#5677fc" />特急
						</label>
					</radio-group>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">选择分类</view>
					<picker @change="bindPickerChange" :value="index" :range="array" class="form-right">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">任务执行人</view>
					<picker @change="bindPickerChange" :value="index" :range="array" class="form-right">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">选择分类</view>
				</view>
				<textarea placeholder-style="color:#F76260" placeholder="占位符字体是红色的"/>
			</tui-list-cell>

			<view class="tui-btn-box">
				<button class="tui-button-primary" hover-class="tui-button-hover" formType="submit" type="primary">Submit</button>
				<button class="tui-button-primary tui-button-gray" hover-class="tui-button-gray_hover" formType="reset">Reset</button>
			</view>
		</form>
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
				index: 0
			}
		},
		methods: {
			bindPickerChange(){
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			formSubmit: function(e) {
				//表单规则
				let rules = [{
					name: "name",
					rule: ["required", "isChinese", "minLength:2", "maxLength:6"], //可使用区间，此处主要测试功能
					msg: ["请输入姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过6个字符"]
				}, {
					name: "sex",
					rule: ["required"],
					msg: ["请选择性别"]
				}, {
					name: "age",
					rule: ["required", "isNum", "range:[0,150]"],
					msg: ["请输入年龄", "请输入正确的年龄", "请输入正确的年龄范围：0-150"]
				}, {
					name: "mobile",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				}, {
					name: "email",
					rule: ["required", "isEmail"],
					msg: ["请输入邮箱", "请输入正确的邮箱"]
				}, {
					name: "idcard",
					rule: ["required", "isIdCard"],
					msg: ["请输入身份证号码", "请输入正确的身份证号码"]
				}, {
					name: "pwd",
					rule: ["required", "isEnAndNo"],
					msg: ["请输入密码", "密码为8~20位数字和字母组合"]
				}, {
					name: "pwd2",
					rule: ["required", "isSame:pwd"],
					msg: ["请输入确认密码", "两次输入的密码不一致"]
				}, {
					name: "range",
					rule: ["required", "range:[3,20]"],
					msg: ["请输入区间数字", "请输入3-20之间的数字"]
				}, {
					name: "amount",
					rule: ["required", "isAmount"],
					msg: ["请输入金额", "请输入正确的金额，允许保留两位小数"]
				}];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
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
		display: inline-block;
		padding-left: 28rpx;
		font-size: 36rpx;
		vertical-align: middle;
	}


	.tui-btn-box {
		padding: 40rpx 50rpx;
		box-sizing: border-box;
	}

	.tui-button-gray {
		margin-top: 30rpx;
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
</style>
