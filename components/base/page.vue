<template>
	<transition name="fade" mode="out-in">
		<div class="pagination" v-if="(pageTotal/pageSize)>1">
			<el-pagination
				background
				:page-size="pageSize"
				@current-change="pageChange"
				layout="prev, pager, next"
				:total="pageTotal">
			</el-pagination>
		</div>
	</transition>
</template>
<script>
	export default {
		data(){
			return {
			}
		},
		props: {
			pageTotal: '',
			pageSize: ''
		},
		mounted() {
		},
		methods: {
			pageChange(currentPage) {
				this.$emit('pageChange',currentPage)
			},
		}
	}
</script>
<style lang = "less">
	.pagination{
		text-align: center;
		padding: 15px 0 5px;
	}
	.fade-enter-active, .fade-leave-active{
 		transition: opacity .5s
	}
	.fade-enter, .fade-leave-to{
 		opacity: 0
	}
</style>