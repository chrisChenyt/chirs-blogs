<template>
	<div class = "timeLine">
		<article-list :articleList = "articles.time" :pageArr='pageArr'></article-list>
	</div>
</template>
<script>
	import articleList from "@/components/article/articleList"
	export default {
    data() {
      return{
        articles: {
          time: [
            {
              abstract: "本篇文章主要给刚开始学习vue并且打算用vue创建个人博客的同学一个参考",
              articleId: 1,
              commentNum: 5,
              date: "2018-03-29T14:59:40.702Z",
              likeNum: 16,
              original: true,
              publish: true,
              pv: 6140,
              tag: ["vue", "javascript", "express", "mongodb"],
              title: "用vue搭建的个人博客介绍----mapblog小站",
              __v: 0,
              _id: "5abcfe0c291d9e712e0fd055"
            }
          ]
        },
        pageArr: []
      }
    },
		components: {
			articleList
		},
		methods: {
			time_arts: function(){
				let timeArr = this.$route.query.time.match(/\d+\-\d+\-\d+/g)
				//utc时间0点起
				let startTime = new Date(Date.parse(timeArr[0])).getTime()
				//utc时间24点
				let endTime = new Date(Date.parse(timeArr[1])).getTime() + 1000*60*60*24
				let params = {
					publish: true,
					page: 1,
					start: startTime,
					end: endTime,
					according: "time"
				}
			}
		}
	}
</script>
<style lang="less" scoped>

</style>

