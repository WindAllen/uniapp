<template>
	<view style="width:100%;">
		<!-- <swiper :style="{height:windowHeight+'px'}" :current="tabIndex"  :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" @click="changeTab">
			<swiper-item style="width: 100%;" v-for="(item,index) in guidelList" :key="index">
				<image class="img" :src="item" mode="widthFix"></image>
			</swiper-item>
		</swiper> -->
		<!-- 轮播图 -->
		<u-swiper :list="list" height="1334" :autoplay = "false" indicator-pos = "topLeft" :circular="false" @click="toindex"></u-swiper>
		<!-- <u-button type="warning">警告按钮</u-button> -->
	</view> 
</template>



<script>
	export default {
		data() {
			return {
				list: [{
										image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
										title: '昨夜星辰昨夜风，画楼西畔桂堂东'
									},
									{
										image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
										title: '身无彩凤双飞翼，心有灵犀一点通'
									},
									{
										image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
										title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
									}
								],
			}
		},
		methods: {
			toindex(){
				console.log("点击"),
				this.$u.route({
					type:'reLaunch',
					url:'pages/auth/login'
				})
			}
		}
	}
</script>

<style>

</style>
