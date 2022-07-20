<template>
	<u-upload 
	ref = "upload"
	:action="action" 
	:max-size="5 * 1024 * 1024" 
	:show-progress= "false"
	:before-upload="beforeUpload"
	:custom-btn	= "true"
	:form-data = "formData"
	:multiple = "false"
	:deletable = "false"
	:show-upload-list = "true"
	max-count="1"
	width="0"
	height="0"
	@on-success="onSuccess">
	<u-avatar slot="addBtn" :src="vuex_user.avatar_url" size="140"></u-avatar>
	</u-upload>
</template>

<script>
	let _this = {}
	export default { 
		name:"oss-upload",
		data() {
			return {
				action: '',                           
				formData: {},
				upFileName: ''
			};
		},
		created() {
			_this = this
		},
		methods:{
			/**
			 * 上传前的钩子	
			 */
			async beforeUpload(index, list) {
						const {file} = list[0]
						//#ifdef H5
						const fileName = file.name
						//#endif
						//#ifndef H5
						const fileName = file.path
						//#endif 
						console.log(fileName)
					//请求API，获取OSStoken
						const ossToken = await _this.$u.api.authOssToken()
					//设置上传域名
						_this.action = ossToken.host
						//处理唯一的文件名
							//后缀
						const suffix = fileName.slice(fileName.lastIndexOf('.'))
						// console.log(suffix)
						//生成
						const upFileName = _this.$u.guid(20) + suffix
						
						_this.upFileName = upFileName
						// console.log(upFileName)
						//额外的上传参数
						_this.formData = {
									'key' :upFileName,
							        'policy': ossToken.policy,
							        'OSSAccessKeyId': ossToken.accessid, 
							        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
							        'signature': ossToken.signature, 
						}
						// console.log(ossToken)
							return true;
						},
						//上传成功之后
						async onSuccess(){
							
							//请求API更新头像
							await this.$u.api.userAvatar({avatar:this.upFileName})
							
							//更新缓存的用户信息
							await this.$u.utils.updateUser()
							//移除预览区域的图片
							this.$refs.upload.remove(0)
							this.$u.toast('更新成功')
						}
		}
	}
</script>

<style>

</style>