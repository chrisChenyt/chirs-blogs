<template>
	<div class = "search-abstract">
		<div class = "search-tips">
			<h3>{{ searchTips }}</h3>
		</div>
		<article-list :articleList = "articles.search" :pageArr="pageArr"></article-list>
	</div>
</template>
<script>
	import articleList from "@/components/article/articleList"
	export default {
		components: {
			articleList
		},
		data(){
			return{
        searchTips: "",
        articles: {
          search: [
            {
              abstract: "前几天偶然看到有的同学对圣杯布局左侧定宽盒子设置负内边距-100%有疑惑，因此在这里写下自己的一点理解",
              articleId: 2,
              commentNum: 9,
              date: "2018-04-10T14:44:59.427Z",
              likeNum: 30,
              original: true,
              publish: true,
              pv: 1538,
              tag: ["css", "html"],
              title: "圣杯布局中对left盒子设置负内边距-100%的一点解释",
              __v: 0,
              _id: "5acccc9e52602f14e4154a5e"
            },
          ]
        },
        pageArr: []
			}
		},
		created(){
			this.startSearch()
		},
		methods: {
			startSearch: function(){
        // this.searchTips = "杯具啊(┬┬﹏┬┬)啥也没找到···"
        this.searchTips = "以下是为您搜索到的内容："
			}
		}
	}
</script>
<style lang = "less" scoped>
	.search-tips{
		margin-top: 10px;
		padding: 10px;
		background: #FAF7F7;
	}
</style>

