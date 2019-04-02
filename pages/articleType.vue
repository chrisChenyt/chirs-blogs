<template>
	<article>
		<div class="lbox">
			<div class="whitebg lanmu"> <img src="../assets/img/lm01.png">
				<h1>技术分享</h1>
				<p>学习新鲜技术，厚积而薄发，在时代的浪潮中，顺流而上。</p>
			</div>
			<!--bloglist begin-->
			<article-list :articleList = "articles.tech" :pageTotal='pageTotal' :pageSize='pageSize' @pageChange='pageChange'></article-list>
      <!--bloglist end-->
		</div>
    <div class="rbox">
      <!--sort begin-->
			<sort :sortlist="sortlist"></sort>
      <!--sort end-->
      <!--gateway begin-->
			<div class="gateway whitebg">
				<h2 class="htitle">标签</h2>
				<div class="gateway-content">
					<ul >
						<li v-for="item in tags" ><a href="javascript: void(0)" @click="jumpArticle(item)" ref = "tag">{{ item }}</a></li>
					</ul>
				</div>
			</div>
      <!--gateway end-->
      <!--recommend begin-->
			<recommend :recommend="recommend"></recommend>
      <!--recommend end-->
		</div>
	</article>
</template>
<script>
	import articleList from "../components/article/articleList"
	import sort from "../components/base/sort.vue"
	import recommend from "../components/base/recommend.vue"
  import webHttp from '../plugins/http.js'
	export default {
		data(){
			return {
        articles:{ tech:[]},
        pageTotal: 0,
        pageSize: 7,
        tags: [
          "CSS","html","JavaScript","nodejs","Vue","webpack","react","other"
				],
				color: ["#8A9B0F","#EB6841","#3FB8AF","#FE4365","#FC9D9A","#EDC951","#C8C8A9","#3299BB","#9BBFEA","#CCCC00"],
        sortlist: [],
        recommend: [],
      }
		},
		mounted(){
			//没有标签则不要初始化，否则会出错
			if(this.tags.length){
				this.initBackground()
			}
      webHttp.request({
        url: '/blog/techArticle',
        method: 'POST',
        data: {
          pageNum: 1,
          pageSize: this.pageSize,
					articleTag: this.$route.query.type
        },
        callback: (res) => {
          this.articles.tech = res.list.data
          this.pageTotal = res.list.totalCount
          this.sortlist = res.sort
          this.recommend = res.recommend
        }
      })
		},
		components: {
			articleList, sort, recommend
		},
		methods: {
      pageChange(currentPage) {
        webHttp.request({
          url: '/blog/techArticle',
          method: 'POST',
          data: {
            pageNum: currentPage,
            pageSize: this.pageSize,
						articleTag: this.$route.query.type
          },
          callback: (res) => {
            this.articles.tech = res.list.data
            this.pageTotal = res.list.totalCount
            this.sortlist = res.sort
            this.recommend = res.recommend
          }
        })
      },
			initBackground: function(){
				this.$nextTick(()=>{
					//IE10不支持refs.tag
					this.$refs.tag.forEach((item,index,arr) =>{
						item.style.backgroundColor = this.color[Math.floor(Math.random()*10)]
					})
				})
			},
			jumpArticle: function(type){
				document.documentElement.scrollTop = 230
				document.body.scrollTop = 230
				this.$router.push({query: {type: type}})
				webHttp.request({
					url: '/blog/techArticle',
					method: 'POST',
					data: {
						pageNum: 1,
						pageSize: this.pageSize,
						articleTag: type
					},
					callback: (res) => {
						this.articles.tech = res.list.data
						this.pageTotal = res.list.totalCount
						this.sortlist = res.sort
						this.recommend = res.recommend
					}
				})
      }
    }
	}
</script>
<style lang="less" scoped>
	.gateway-content{
		li{
			list-style: none;
			border-radius: 5px;
			margin: 5px 5px 5px 0;
			float: left;
			overflow: hidden;
			a{
				display: inline-block;
				padding: 6px 15px;
				border-radius: 5px;
				color: #EEE;
				transition: all ease .5s
			}
			a:hover { border-radius: 0; text-shadow: #000 1px 1px 1px }
		}
	}
	.gateway-content:after{
		display: block;
		content: "";
		clear: both;
		line-height: 0;
		height: 0;
		visibility: hidden;
	}
</style>
