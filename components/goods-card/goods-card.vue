<template>
	<navigator class="goods-item":url="`/pages/goods/goods-detail/goods-detail?id=${item.id}`">
		<u-image class = "u-skeleton-fillet" width="100%" height="300rpx" :src="item.cover_url"></u-image>
		<view class="title u-line-1 u-skeleton-rect">{{item.title?item.title:"商品名称"}}</view>
		<view class="u-flex u-row-between ">
			<view class="price u-skeleton-rect">￥{{item.price}}</view>
			<view class="sales u-skeleton-rect">销量:{{item.sales}}</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		name:"goods-card",
		props:{
			item:{
				type:Object,
				default(){
					return{}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item{
		padding: 40rpx;
		box-shadow: 0 12rpx 20rppx 0 rgba(0,0,0,.1);
		margin-top: 30rpx;
		.title{
			margin:10rpx 0;	//与上下左右的间距
			font-weight: 500;  //字体粗
			font-size: 32rpx;	//字体大小
			width: 100%;
		}
		.price{
			color: red;
			width: 40%;
		}
		.sales{
			color: #888;
			width: 40%;
		}
	}
</style>