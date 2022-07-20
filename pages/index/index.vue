<template>
	<view>	
		<!-- 两端布局 -->
		<view class="u-flex u-row-between ">
			<u-icon class = "u-m-l-10"name="scan"></u-icon>
			<u-search margin = "10rpx 10rpx 10rpx 10rpx" placeholder="日照香炉生紫烟" shape="round":show-action="false" v-model="keyword"></u-search>
			<u-icon  class = "u-m-r-10" name="checkbox-mark"></u-icon>
		</view>
			
		<!-- 轮播页面 -->
		<u-swiper :list="slides" name="img_url" height="444" indicator-pos = "bottomRight"></u-swiper>
		<view class="u-flex u-row-between ">
			<image src="../../static/center-selected.png" @click="toMap"></image>
			<image src="../../static/center-selected.png" @click="toCommunity"></image>
			<image src="../../static/center-selected.png" @click="toJury"></image>
			<image src="../../static/center-selected.png" @click="toCalendar"></image>
		</view>
		<view class="u-flex u-row-between u-m-l-40 u-m-r-40">
			<h5>诈情地图</h5>
			<h5>互助社区</h5>
			<h5>评审团</h5>
			<h5>活动日历</h5>
		</view>
		<view class="u-text-center u-m-t-30">
			<!-- 标签界面 -->
			<u-tabs :list="sortList" :is-scroll="false" :current="currentSort" @change="changeSort"></u-tabs>
		</view>
		<!-- 布局 -->
		<u-row gutter="16" class="u-skeleton">
					<u-col span="6" v-for="item in goods.length!==0?goods:[{},{}]">
						<goods-card :item="item"></goods-card>
					</u-col>
		</u-row>
		<!-- 骨架屏幕 -->
		<u-skeleton :loading="loading" :animation="true" bgColor='#FFF'></u-skeleton>
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			// 	imgList: [
			
			// 		'https://cdn.uviewui.com/uview/swiper/1.jpg',
			// 		'https://cdn.uviewui.com/uview/swiper/2.jpg'
			// 	],
				// list: [{
				// 					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				// 				},
				// 				{
				// 					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
				// 					title: '身无彩凤双飞翼，心有灵犀一点通'
				// 				},
				// 				{
				// 					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
				// 					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				// 				}
				// 			],
				sortList: [
					{name:'默认'},
					{name:'销量'},
					{name:'推荐'},
					{name:'最新'}
					],
					tabbar: '',
					currentSort:0,
					slides:[],
					goods:[],
					page:1,
					loading:false,
					// 搜索框
					keyword: '遥看瀑布挂前川'
			}	
		},
		onLoad() {
			// this.$u.utils.isLogin()
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
			],
			 this.getData()
		},
		methods:{
					toMap(){
						this.$u.route({
							url:'pages/index/map'
						})
					},
					toCommunity(){
						this.$u.route({
							url:'pages/index/community'
						})
					},
					toJury(){
						this.$u.route({
							url:'pages/index/jury'
						})
					},
					toCalendar(){
						this.$u.route({
							url:'pages/index/calendar'
						})
					},
					changeSort(index) {
						console.log(index)
						this.currentSort = index
						//商品制空，然后切换数据
						this.goods = []
						this.page = 1
						this.getData()
						//判断筛选条件
					},
					async getData(){
						this.loading = true
						const params = {
							page: this.page
						}
						if(this.currentSort==1) params.sales = 1
						if(this.currentSort==2) params.recommend = 1
						if(this.currentSort==3) params.news = 1
						const res = await this.$u.api.index(params)
						console.log(res)
							this.loading = false
							this.slides = res.slides 
							this.goods = [...this.goods,...res.goods.data]
						
					}
				},
		onReachBottom(){
			this.page = this.page + 1
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
	

</style>
