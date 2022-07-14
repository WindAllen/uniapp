const install = (Vue, vm) => {
	//是否登录
	const isLogin = () =>{
		const token = vm.vuex_token
		if(!token){
			
			const currentPage = getCurrentPages().pop()
			//获取页面路径和请求参数
			const {options,route} = currentPage//id = 1
			//参数的key
			const optionsKeys = Object.keys(options)//['id']
			let params =''
			if(optionsKeys.length!==0){
				params = optionsKeys.reduce((pre,current)=>{
					return `${pre}${current}=${options[current]}&`
				},'？').slice(0,-1)
			}
			uni.setStorageSync('back_url',route+params)
			vm.$u.toast('您还未登录，请登录')
			setTimeout(() => {
						vm.$u.route({
							type:'redirect',
							url: 'pages/auth/login',
						
						})
					}, 1500)
					return false
		}
		return true
	}
	const updateUser = async() =>{
		const userInfo = await vm.$u.api.userInfo()
		vm.$u.vuex('vuex_user',userInfo)
	}
	
	vm.$u.utils = {
		isLogin,
		updateUser
	}
}
export default{
	install
}