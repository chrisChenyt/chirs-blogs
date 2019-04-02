<template>
	<article>
		<div class="lbox">
			<div class="whitebg lanmu"> <img src="../assets/img/lm03.png">
				<h1>工作日记</h1>
				<p>在工作中总结，在总结中进步。</p>
			</div>
			<!--bloglist begin-->
      <article-list :articleList = "articles.work" :pageTotal='pageTotal' :pageSize="pageSize" @pageChange='pageChange'></article-list>
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
	import recommend from "../components/base/recommend.vue"
	import sort from "../components/base/sort.vue"
  import webHttp from '../plugins/http.js'
	export default {
		data(){
			return {
        articles:{work:[]},
        pageTotal: 0,
        pageSize: 5,
        sortlist: [],
        recommend: [],
      }
		},
		mounted(){
      webHttp.request({
        url: '/blog/workArticle',
        method: 'POST',
        data: {
          pageNum: 1,
          pageSize: this.pageSize
        },
        callback: (res) => {
          this.articles.work = res.list.data
          this.pageTotal = res.list.totalCount
          this.sortlist = res.sort
          this.recommend = res.recommend
        }
      })
    },
    components: {
      articleList, recommend, sort
    },
		methods: {
      pageChange(currentPage) {
        webHttp.request({
          url: '/blog/workArticle',
          method: 'POST',
          data: {
            pageNum: currentPage,
            pageSize: this.pageSize
          },
          callback: (res) => {
            this.articles.work = res.list.data
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
