<template>
	<view>
		<!-- 轮播页面 -->
		<u-swiper :list="slides" name="img_url" height="320"></u-swiper>
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
				sortList: [
					{name:'默认'},
					{name:'销量'},
					{name:'推荐'},
					{name:'最新'}
					],
					currentSort:0,
					slides:[],
					goods:[],
					page:1,
					loading:false,
			}	
		},
		onLoad() {
			// this.$u.utils.isLogin()
			 this.getData()
		},
		methods:{
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
