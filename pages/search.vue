<template>
	<article>
		<div class="lbox">
			<!--bloglist begin-->
			<article-list :articleList = "articles.search" :pageTotal='pageTotal' :pageSize='pageSize' @pageChange='pageChange'></article-list>
      <!--bloglist end-->
		</div>
    <div class="rbox">
      <!--sort begin-->
			<sort :sortlist="sortlist"></sort>
      <!--sort end-->
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
        articles:{ search:[]},
        pageTotal: 0,
        pageSize: 7,
        sortlist: [],
        recommend: [],
      }
		},
		mounted(){
      webHttp.request({
        url: '/blog/searchArticle',
        method: 'POST',
        data: {
          pageNum: 1,
          pageSize: this.pageSize,
					title: this.$route.query.title
        },
        callback: (res) => {
          this.articles.search = res.list.data
          this.pageTotal = res.list.totalCount
          this.sortlist = res.sort
          this.recommend = res.recommend
        }
      })
		},
		components: {
			articleList, sort, recommend
		},
		watch: {
			$route(){
				webHttp.request({
					url: '/blog/searchArticle',
					method: 'POST',
					data: {
						pageNum: 1,
						pageSize: this.pageSize,
						title: this.$route.query.title
					},
					callback: (res) => {
						this.articles.search = res.list.data
					}
				})
			}
		},
		methods: {
      pageChange(currentPage) {
        webHttp.request({
          url: '/blog/searchArticle',
          method: 'POST',
          data: {
            pageNum: currentPage,
            pageSize: this.pageSize,
						title: this.$route.query.title
          },
          callback: (res) => {
            this.articles.search = res.list.data
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
</style>
