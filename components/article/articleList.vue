<template>
	<div class = "bloglist whitebg">
		<h2 class="htitle">最新博文<span v-if="this.$route.query.type">({{ this.$route.query.type }})</span></h2>
		<ul>
			<li v-for = "(item,index) in articleList">
				<h2 class = "blogtitle">
					<a href = "javascript: void(0)" @click = "jump(item)">{{item.title}}</a>
				</h2>
				<div class = "article-review">
					<img :src="'/img/article_'+item.tag[0]+'.png'" alt="">
					<p class = "blogtext">{{ item.abstract }}</p>
				</div>
				<p class="bloginfo"><i class="avatar"><img src="../../assets/img/avatar.jpg"></i><span>克里斯儿</span>
					<span class = "article-msg-time">{{ item.date | reviseTime}}</span>
					<span>【<a href="javascript:void(0)">原创</a>】</span>
				</p>
				<a href="javascript:void(0)" class="viewmore" @click = "jump(item)">阅读更多</a>
			</li>
		</ul>
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
	</div>
</template>
<script>
	export default {
		props: {
			articleList: {
				type: Array
			},
			pageTotal: '',
			pageSize: ''
		},
		mounted(){
			Prism.highlightAll()
		},
		computed: {
		},
		methods: {
			pageChange(currentPage) {
				document.documentElement.scrollTop = 230
				document.body.scrollTop = 230
				this.$emit('pageChange',currentPage)
			},
			jump: function(item){
				this.$router.push({path: '/articleShow',query: {articleTag: item.tag[0],id: item.articleId }})
			}
		}
	}
</script>
<style lang="less" scoped>
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
	.articleList{
		font-size: 14px;
		line-height: 20px;
		color: #404040;
		img{
			max-width: 100%;
		}
	}
	.article-review{
		color: #646464;
		display: flex;
		align-items: center;
		margin-top: 8px;
		img{
			width: 100px;
			height: 100px;
      transition: all ease .5s;
      transform-origin: left;
			border-radius: 8px;
		}
		img:hover{
			transform: scale(1.1);
		}
	}
	.article-msg-time{
		margin-left: 5px
	}
	@media screen and(max-width: 767px){
		.article-review{
			img{
				width: 80px;
				height: 80px;
			}
		}
	}
</style>
