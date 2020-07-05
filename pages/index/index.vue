<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<archives v-if="PageCur=='archives'"></archives>
		<updown v-if="PageCur=='updown'"></updown>
		<build v-if="PageCur=='build'"></build>
		<my v-if="PageCur=='my'"></my>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/home' + [PageCur=='home'?'-cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-red':'text-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="archives">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/archives' + [PageCur == 'archives'?'-cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='archives'?'text-red':'text-gray'">户档案</view>
			</view>
			<view class="action" @click="NavChange" data-cur="updown">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/updown' + [PageCur == 'updown'?'-cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='updown'?'text-red':'text-gray'">上传下达</view>
			</view>
			<view class="action" @click="NavChange" data-cur="build">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/build' + [PageCur == 'build'?'-cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='build'?'text-red':'text-gray'">党建</view>
			</view>
			<view class="action" @click="NavChange" data-cur="my">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/my' + [PageCur == 'my'?'-cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='my'?'text-red':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'updown'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
