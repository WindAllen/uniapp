<template>
	<view>
		
		</u-navbar>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 u-p-t-30">
			<view class="u-m-r-10 avatar-body" >
				
				<oss-upload></oss-upload>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{vuex_user.name}}</view>
				<view class="u-font-14 u-tips-color">邮箱:{{vuex_user.email}}</view>
			</view>
			
			
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" @click= "toBaseInfo" title="个人信息"></u-cell-item>
				
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<!-- <u-cell-item icon="rmb-circle" title="订单"></u-cell-item> -->
				<!-- <u-cell-item icon="star" title="商品收藏" ></u-cell-item> -->
				<!-- <u-cell-item icon="map" title="收货地址"></u-cell-item> -->
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="reload" @click = "logout" title="退出登录"></u-cell-item>
			</u-cell-group>
		</view>
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				show:true,
				tabbar: '',
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
			if(!this.$u.utils.isLogin()) return 
		},
		methods: {
			showCollect(){
				this.$u.route({
					url:'pages/center/collectGoods'
				})
			},
			toBaseInfo(){
				this.$u.route({
					url:'pages/center/baseInfo'
				})
			},
			async logout(){
				await this.$u.api.logout()
				this.$u.toast('退出成功')
				setTimeout(()=>{
					this.$u.vuex('vuex_user',{})
					this.$u.vuex('vuex_token',null)
					this.$u.route({
						type:'reLaunch',
						url:'pages/index/index'
					})
				},1500)
				
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
.avatar-body{
	width: 70px;
	height: 70px;
}
}
</style>




			
			
			
