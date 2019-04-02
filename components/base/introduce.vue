<template>
  <div class="introduce whitebg">
    <h2 class="htitle">站点信息</h2>
    <ul>
      <li><b>建站时间</b>：2018-10-10</li>
      <li><b>技术架构</b>：Vue.js+Node.js+MySQL</li>
      <li><b>网站链接</b>：<a href="http://xxx" target="_blank">xxxxx</a></li>
      <li><b>文章统计</b>：299篇</li>
      <li><b>微信公众号</b>：扫描二维码，关注公众号</li>
      <img src="../../assets/img/wxgzh.jpg" class="introduce_gzh">
    </ul>
  </div>
</template>
<style lang="less">
  .introduce{
    li {
      margin-bottom: 8px;
      a { color: #096 }
      a:hover { text-decoration: underline; color: #000 }
    }
    .introduce_gzh { width: 80%; margin: auto; overflow: hidden; }
  }
</style>
