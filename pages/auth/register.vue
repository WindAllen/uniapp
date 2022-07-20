<template>
	<!-- <view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录图书商城</view>
			<input class="u-border-bottom" v-model="name" placeholder="请输入昵称" />
			<input class="u-border-bottom" v-model="email" placeholder="请输入注册的邮箱号" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<input class="u-border-bottom" type="password_confirmation" v-model="password_confirmation" placeholder="请确认密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">注册</button>
			<view class="alternative">
				
				
			</view>
		</view>
		
	</view> -->
	<view class="wrap u-p-t-80">
		<u-field v-model="name" label="昵称" placeholder="请输入昵称" focus required></u-field>
		<u-field v-model="email" label="邮箱" placeholder="请输入邮箱" required :error-message="emailMsg"></u-field>
		<u-field v-model="password" label="密码" placeholder="请输入密码" required :error-message="pwdMsg" password></u-field>
		<u-field v-model="password_confirmation" label="确认密码"  placeholder="请确认密码" required password :error-message="errorMessage"></u-field>
		<!-- <button @tap="submit" :loading="submitBtn" :disabled="submitBtn" :style="[inputStyle]" class="getCaptcha">注册</button> -->
		<u-button type="primary" @tap="submit" :loading="submitBtn" :disabled="submitBtn" :style="[inputStyle]" class="getCaptcha">注册</u-button>
		<view class="buttom">
			<view class="u-m-t-50 u-text-center">------------第三方登录------------</view>
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
	
	
</template>

<script>
export default {
	data() {
		return {
			name:'',
			email: '',
			password:'',
			password_confirmation:'',
			submitBtn:false,
		}
	},
	//看看缓存
	async onLoad(){
		
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.$u.test.email(this.email)&&this.password==this.password_confirmation&&this.password!==''&&this.name!=='') {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		},
			emailMsg(){
				if(!this.email){
					return ''
				}
				if(!this.$u.test.email(this.email)){
					return '邮箱格式错误'
				}else{
					return ''
				}
				
			},
			pwdMsg(){
				if(!this.password){
					return ''
				}
				if(!this.$u.test.rangeLength(this.password,[6,12])){
					return '密码长度需在6-12位'
				}else{
					return ''
				}
			},
			errorMessage(){
				if(this.password!==this.password_confirmation){
					return '两次密码不一致'
				}else{
					return ''
				}
			}

	},
	methods: {
		async toRegister() {
			try{
				//注册btn样式
				this.submitBtn=true
				// 准备提交参数
				const params = {
					name: this.name,
					email: this.email,
					password: this.password,
					password_confirmation: this.password_confirmation
				}
				// 注册接口
				const regRes = await this.$u.api.authRegister(params)
				this.submitBtn=false
				// 注册成功，重定向到登录（关闭注册页面）
				this.$u.toast('注册成功！')
				// 延时跳转
				setTimeout(()=>{
					this.$u.route({
						type:"redirect",
						url:"/pages/auth/login",
						params:{email:this.email,password:this.password}
					})
				},1500)
			}catch(e){
				this.submitBtn=false
			}
		},
		async submit() {
			if(!this.$u.test.email(this.email)||!this.password||(this.password!==this.password_confirmation)||this.password==''||this.name=='')return
			// console.log(this.email)处理注册用的参数
			const params = {
				name:this.name,
				email:this.email,
				password:this.password,
				password_confirmation:this.password_confirmation
			}
			// 请求API,执行注册
			const registerRes =  await this.$u.api.authRegister(params)
			//注册成功之后，重定向到登录（redirect)
			
			
			
						this.$u.route({
							type:'redirect',
							url: 'pages/auth/login',
						
						})
					
				
		}
	}
}
</script>

<style lang="scss" scoped>
.u-border-bottom{
	margin-bottom:40rpx!important;
}
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
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
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
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
