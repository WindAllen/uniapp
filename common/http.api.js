// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)

// let indexUrl = '/api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	//定义api属性
	vm.$u.api = {}
	
	// 首页
	vm.$u.api.index = (params = {}) => vm.$u.get('/api/index',params);
	
	//商品
	vm.$u.api.getGoodsDetail = id => vm.$u.get(`/api/goods/${id}`);//商品详情
	vm.$u.api.isCollect = id => vm.$u.post(`/api/collects/goods/${id}`);//商品收藏或取消
	vm.$u.api.getCollect = (page=1) => vm.$u.get('/api/collects',{page});//获取收藏商品
	// 个人中心
	vm.$u.api.userInfo = () => vm.$u.get('/api/user')//获取用户信息
	vm.$u.api.userInfoUpdate = params => vm.$u.put('/api/user',params)//更新用户信息
	
	// 认证相关的
	vm.$u.api.authLogin = params => vm.$u.post('/api/auth/login',params)//登录相关的API属性
	vm.$u.api.authRegister = params => vm.$u.post('/api/auth/register',params)//注册相关的API属性
	vm.$u.api.logout = () => vm.$u.post('/api/auth/logout')//退出登录
	vm.$u.api.authOssToken = () => vm.$u.get('/api/auth/oss/token')//获取OSStoken
	vm.$u.api.userAvatar = params => vm.$u.post('/api/user/avatar',params)//更改用户头像
	
	//购物车相关
	vm.$u.api.addCart = params => vm.$u.post('/api/carts',params)//商品加入购物车
	vm.$u.api.cartGoods = () => vm.$u.get(`/api/carts?include=goods`);//购物车列表
	
	// //陪审团
	// vm.$u.api.clicky = params =>this.$u.api.get('params')//按钮是诈骗
	// vm.$u.api.clicky = params =>this.$u.api.get('params')//按钮不是诈骗
	// vm.$u.api.getlike = params =>this.$u.api.get('params')//点赞数
	// vm.$u.api.setReply = params =>this.$u.api.get('params')	 //存储评论	
}

export default {
	install
}