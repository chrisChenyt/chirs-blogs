<template>
  <div class="recommend whitebg">
    <h2 class="htitle">文章推荐</h2>
    <section class="topnews imgscale"><a href="/"><img src="/img/h2.png"><span>6条网页设计配色原则,让你秒变配色高手</span></a></section>
    <ul>
      <li v-for="(item,index) in recommend">
        <a href="javascript:void(0)" @click="jumpArticle(item)">
          <i><img :src="'/img/text0'+index+'.png'"></i>
          <p>{{ item.title }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return{
    }
  },
  props: {
    recommend: {
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
  .recommend{
    ul {
      overflow: hidden; padding-top: 10px;
      li {
        overflow: hidden; margin-bottom: 10px; height: 60px;
        i {
          width: 70px; height: 70px; margin-right: 10px; overflow: hidden; display: block; float: left;
          img { height: 100%; max-width: 100%; min-width: 100%; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; -ms-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease; transition: all 0.5s; }
        }
        p { margin-top: 10px; line-height: 20px; max-height: 40px; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; font-size: 14px; }
      }
      li:hover {
        background: #f6f6f6;
        img { transform: scale(1.1); }
      }
    }
  }
</style>
