<template>
	<view>
		商品
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbar:''
			}
		},
		onLoad() {
			this.tabbar = [{
					iconPath: "home",
					selectedIconPath: "home-fill",
					text: '水驿',
					count: 2,
					isDot: true,
					pagePath: "/pages/index/index"
				},
				{
					iconPath: "/static/icon/jinzhongzhao.png",
					selectedIconPath: "/static/icon/jinzhongzhao2.png",
					text: '金钟罩',
					midButton: true,
					customIcon: false,
					pagePath: "/pages/goods/goods"
				},
				{
					iconPath: "account",
					selectedIconPath: "account-fill",
					text: '我的',
					count: 23,
					isDot: false,
					customIcon: false,
					pagePath: "/pages/center/index"
				},
			]
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
