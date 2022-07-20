<template>
	<view class="wrap">
		<view class="top"></view>
		<u-swiper :list="list" height="444"></u-swiper>
		<view class="content">
			<!-- <view class="title" >反诈宝</view> -->
			<u-icon name="email"></u-icon>
			<input class="u-border-bottom" v-model="email" placeholder="请输入账号" />
			<u-icon name="lock"></u-icon>
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">忘记密码？</view>
				<view class="issue" @tap="toRegist">注册</view>
			</view>
			
			<view class="buttom">
				<!-- <view class="u-m-t-60 u-text-center">第三方登录</view> -->
				<view class="loginType">
					
					<view class="wechat item">
						<view class="icon"><u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
						微信
					</view>
					<view class="QQ item">
						<view class="icon"><u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
						QQ
					</view>
				</view>
			</view>
		</view>
		
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
			email: '',
			password:''
		}
	},
	//看看缓存
	async onLoad(){
		
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.$u.test.email(this.email)&&this.password) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		async submit() {
			if(!this.$u.test.email(this.email)||!this.password)return
			// console.log(this.email)处理登录用的参数
			const params = {
				email:this.email,
				password:this.password
			}
			// 请求API,执行登录
			const loginRes =  await this.$u.api.authLogin(params)
			//缓存token
			this.$u.vuex('vuex_token',loginRes.access_token)
			this.$u.toast('登陆成功')
			// //请求用户信息
			const userInfo = await this.$u.api.userInfo()
			
			//缓存用户信息
			this.$u.vuex('vuex_user',userInfo)
			//登录之后，跳转到来源页
			const backUrl = uni.getStorageSync('back_url')||'pages/index/index'
			setTimeout(()=>{
				this.$u.route({
					type:'reLaunch',
					url:backUrl
				})
			},1500)
		},
		async toRegist(){
			setTimeout(() => {
						this.$u.route({
							type:'navigateTo',
							url: 'pages/auth/register',
			
						})
					}, 500)
			}
		}
}

</script>

<style lang="scss" scoped>
.u-border-bottom{
	margin-bottom:50rpx!important;
}
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 40rpx auto 0;

		.title {
			text-align: center;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: #42b983;
			color: #FFFFFF;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 150rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
	
}
</style>
