<template>
  <div class="sort whitebg">
    <h2 class="htitle">点击排行</h2>
    <section class="topnews imgscale"><a href="/"><img v-lazy="h1png"><span>6条网页设计配色原则,让你秒变配色高手</span></a></section>
    <ul>
      <li v-for="item in sortlist"><i></i><a href="javascript:void(0)" @click="jumpArticle(item)">{{ item.title }}</a></li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        h1png: '/img/h1.png'
      }
    },
    props: {
      sortlist: {
        type: Array,
        default: []
      }
    },
    methods: {
			jumpArticle: function(item){
				this.$router.push({path: '/articleShow',query: {articleTag: item.tag[0],id: item.articleId }})
      }
    }
  }
</script>
<style lang="less">
  .sort{
    ul {
      overflow: hidden;
      li {
        height: 30px; line-height: 30px; margin-bottom: 10px; padding-left: 5px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;
        i { display: block; width: 16px; height: 16px; background: #B1B1B1; float: left; margin-top: 8px; margin-right: 10px; position: relative; font-style: normal }
        i::before { position: absolute; left: 0; top: 0; font-size: 9px; color: #fff; line-height: 16px; width: 16px; text-align: center }

      }
      li:nth-child(even) { background: #f6f6f6 }
      li:hover { -moz-transition: all .2s ease; -webkit-transition: all .2s ease; transition: all .2s ease; }
      li:first-child{
        i::before { content: "1"; }
      }
      li:first-child i, li:nth-child(2) i, li:nth-child(3) i { background: #FF6600; }
      li:nth-child(2) i::before { content: "2"; }
      li:nth-child(3) i::before { content: "3"; }
      li:nth-child(4) i::before { content: "4"; }
      li:nth-child(5) i::before { content: "5"; }
    }
  }
</style>
