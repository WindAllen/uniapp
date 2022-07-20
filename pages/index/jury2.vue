<template>
	<view>
		<view class="u-flex u-row-between u-m-l-30 u-m-r-30">
			<text class="title u-font-30 "><h1>陪审结束啦</h1><h3>十分感谢您的参与，世界会因为您的热心变得更美好！结合专家已经给出解释：</h3>截止时间：{{time}}</text>
			<u-image width="100%" height="300rpx" src="/static/zhapian.jpeg"></u-image>
		</view>
		<view class="comment u-p-20 u-m-25" v-for="(res, index) in commentList" :key="res.id">
			<view class="left"><image :src="res.url" mode="aspectFill"></image></view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.name }}</view>
					<view class="like" :class="{ highlight: res.isLike }">
						<view class="num">热度:{{ res.likeNum }}</view>
						<u-icon v-if="!res.isLike" name="thumb-up" :size="50" color="#5677fc" @click="getLike(index)"></u-icon>
						<u-icon v-if="res.isLike" name="thumb-up-fill" :size="50" @click="getLike(index)"></u-icon>
					</view>
				</view>		
		<!-- 引用组件 -->
					<baifenbi :leftPercent="res.leftPercent" :totalNum="res.totalNum"></baifenbi>
				<view class="shijian">事件描述:</view>
				<view class="content">{{ res.contentText }}</view>
				<view class="reply-box">
					<view class="item" v-for="(item, index) in res.replyList" v-if="index < 2" :key="item.index">
						<view class="username">{{ item.name }}</view>
						<view class="text">{{ item.contentStr }}</view>
					</view>
					<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
						共{{ res.allReply }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
					
				</view>
				
				<view class="bottom">
					{{ res.date }}
					<u-button class="reply" @click="toSetReply()" size="mini">回复</u-button>
					<!-- <view class="reply">回复</view> -->
				</view>
				<view class="bottomType">
						<u-button type="error" @click = "changey(index)" >是骗局</u-button>
						<u-button type="primary" @click = "changen(index)">不是骗局</u-button>
						<!-- <u-button type="default" v-on:clickn = "change">跳过</u-button> -->
						<!-- <div class="area" v-show="showArea">
							
						</div> -->
				</view>
		</view>
		
	</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			leftPercent:'',
			commentList: [],
			time: "2022-07-22",		
			
		};
	},
	onLoad() {
		this.getComment();
	},
	
	methods: {
		// 跳转到全部回复
		
		// 点赞
		 toAllReply(){
			setTimeout(() => {
						this.$u.route({
							type:'navigateTo',
							url: 'pages/index/reply',
			
						})
					}, 500)
			}
		,
		toSetReply(){
			setTimeout(() => {
						this.$u.route({
							type:'navigateTo',
							url: 'pages/index/setReply',
			
						})
					}, 500)
			}
		,
		getLike(index) {
			
			this.commentList[index].isLike = !this.commentList[index].isLike;
			if (this.commentList[index].isLike == true) {
				// const params = {
				// 	index: this.index
				// }
				// this.commentList[index].likeNum=this.$u.api.getLike(index)
				this.commentList[index].likeNum++;
			} else {
				// const params = {
				// 	index: this.index
				// }
				// this.commentList[index].likeNum=this.$u.api.getnLike(index)
				this.commentList[index].likeNum--;
			}
		},
		changey(index){
						// const params = {
						// 	index: this.index
						// }
						// this.commentList[index].leftPercent=this.$u.api.clicky(index)	
						if(this.commentList[index].status==0){uni.showToast({
							title:"评价成功，感谢您的参与！"
						})}
							else{
							uni.showToast({
								title:"您已经评价过了！"
							})						
						}
						this.commentList[index].status=1;
						this.commentList[index].leftPercent++;
		},
		changen(index){
						// const params = {
						// 	index: this.index
						// }
						// this.commentList[index].leftPercent=this.$u.api.clickn(index)
						if(this.commentList[index].status==0){uni.showToast({
													title:"评价成功，感谢您的参与！"
												})}
													else{
													uni.showToast({
														title:"您已经评价过了！"
													})						
												}
												this.commentList[index].status=1;
												this.commentList[index].leftPercent--;
						},
		//评论列表
		getComment() {
			this.commentList = [
				{
					status:0,
					totalNum:60,
					leftPercent:30,
					id: 1,
					name: '求助人1',
					date: '12-25 18:58',
					contentText: '我在楼下一个小商场，有个人手拿一堆红旗挥舞，对经过的人说，这是政府的福利，拿着我这面红旗，可以去旁边那里换各种梳子，洗衣液等生活用品，看着我很心动啊，想问问大家真的是政府的补贴吗？',
					// url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					url:'https://cdn.uviewui.com/uview/template/niannian.jpg',
					allReply: 12,
					likeNum: 33,
					isLike: false,
					replyList: [
						{
							name: '晴空万里',
							contentStr: '小便宜千万贪不得呀，这种一看就不正规'
						},
						{
							name: '随风',
							contentStr: '之前我亲戚就被骗了，千万别相信啊，他这种就是把你骗过去然后让你拿东西，最后再推销让你买这买那的'
						}
					]
				},
				{
					status:0,
					totalNum:60,
					leftPercent:30,
					id: 2,
					name: '叶轻眉2',
					date: '01-25 13:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					allReply: 0,
					likeNum: 11,
					isLike: false,
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
				},
				{
					status:0,
					totalNum:60,
					leftPercent:30,
					id: 3,
					name: '叶轻眉2',
					date: '03-25 13:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					allReply: 0,
					likeNum: 21,
					isLike: false,
					allReply: 2,
					url: '../../../static/logo.png',
					replyList: [
						{
							name: 'uview',
							contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
						},
						{
							name: '豆包',
							contentStr: '想吃冰糖葫芦粘豆包，但没钱5555.........'
						}
					]
				},
				{
					status:0,
					totalNum:60,
					leftPercent:30,
					id: 4,
					name: '叶轻眉3',
					date: '06-20 13:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					allReply: 0,
					likeNum: 150,
					isLike: false
				}
			];
		}
	}
};
</script>

<style lang="scss" scoped>
.bottomType {
		display: flex;
		padding: 50rpx 50rpx 50rpx 50rpx;
		justify-content:space-between;
		}
.comment {
	box-shadow: 0rpx 8rpx 40rpx 0 rgba(#000, .3);
	display: flex;
	padding: 30rpx;
	.left {
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}
	.shijian {
		font-weight:bold;
		font-size: 35rpx;
		color: #ff9900;
	}
	.right {
		flex: 1;
		padding-left: 10rpx;
		font-size: 30rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.name {
				font-weight:bold;
				font-size: 30rpx;
				color: #000000;
			}
			
			.like {
				display: flex;
				align-items: center;
				color: #fa3534;
				font-size: 40rpx;
				.num {
					margin-right: 4rpx;
					color: #fa3534;
				}
			}
			.highlight {
				color: #ff9900;
				.num {
					color: #fa3534;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;
			font-weight:bold;
			font-size: 30rpx;
			color: #606266;
		}
		.reply-box {
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			.item {
				padding: 20rpx;
				border-bottom: solid 2rpx $u-border-color;
				.username {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.all-reply {
				padding: 20rpx;
				display: flex;
				color: #5677fc;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
		}
		.bottom {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			color: #606266;
			.reply {
				color: #5677fc;
				margin-left: 400rpx;
			}
		}
	}
}
</style>
