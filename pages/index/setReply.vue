<template>
	<view>
		<u-field v-model="replyContext"  label="输入评论" type="textarea" placeholder="请输入....." :border-bottom='false' :clearable='false'></u-field>
		<view class="u-col-center u-row-center">
			<u-button type="primary"  shape="circle" @click="setReply">发表评论</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				replyContext:"",
			}
		},
		methods: {
			setReply(){
				const params = {
					replyContext:this.replyContext,
				}
				// this.$u.api.setReply(params)
				this.$u.route({
					type:'redirect',
					url: 'pages/index/jury',
				})
			},
			
		}
	}
</script>

<style>

</style>
