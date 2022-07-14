<template>
	<view class="u-p-l-40 u-p-r-30">
		<u-form :model="form" ref="uForm">
			<u-form-item label="昵称" prop="name" required>
				<u-input v-model="form.name" />
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				form:{
					name: ''
				},
				rules: {
								name: [
									{ 
										required: true, 
										message: '请输入昵称', 
										// 可以单个或者同时写两个触发验证方式 
										trigger: ['change','blur'],
									}
								]
								
							
				}
				}
			},
		onReady() {
				this.$refs.uForm.setRules(this.rules);
				this.form.name = this.vuex_user.name;
					},
		methods: {
			submit() {
			this.$refs.uForm.validate(async(valid) => {
				if (valid) {
					
					console.log('验证通过');
					await this.$u.api.userInfoUpdate(this.form)
					this.$u.utils.updateUser()
					this.$u.toast("更新成功")
				} else {
					console.log('验证失败');
				}
			});
		}
			
		}
		}
</script>

<style>

</style>
