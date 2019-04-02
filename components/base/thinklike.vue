<template>
  <div class="whitebg thinklike">
    <h2 class="htitle">猜你喜欢</h2>
    <ul>
      <li v-for="item in thinklike">
        <a href="javascript:void(0)" @click="jumpArticle(item)">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return{}
  },
  props: {
    thinklike: {
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
.thinklike{
  li { line-height: 22px; margin-bottom: 10px; position: relative; padding-left: 15px }
  li:before { position: absolute; content: ""; width: 3px; height: 3px; background: #000; border-radius: 10px; left: 0px; top: 10px; }
}
</style>
