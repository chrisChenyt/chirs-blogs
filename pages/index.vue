<template>
  <article>
    <!--lbox begin-->
    <div class="lbox">
      <banner></banner>
      <!--headline begin-->
      <div class="headline">
        <ul>
          <li><a href="/" title="为什么说10月24日是程序员的节日？"><img v-lazy="lazyimg[0]" alt="为什么说10月24日是程序员的节日？"><span>为什么说10月24日是程序员的节日？</span></a></li>
          <li><a href="/" title="个人网站做好了，百度不收录怎么办？来，看看他们怎么做的"><img v-lazy="lazyimg[1]" alt="个人网站做好了，百度不收录怎么办？来，看看他们怎么做的。"><span>个人网站做好了，百度不收录怎么办？来，看看他们怎么做的。</span></a></li>
        </ul>
      </div>
      <!--headline end-->
      <!--tab_box begin-->
      <div class="tab_box whitebg">
        <div class="tab_buttons">
          <ul>
            <li class="newscurrent">前端技术</li>
            <li>工作日记</li>
            <li>生活感悟</li>
          </ul>
        </div>
        <div class="newstab">
          <div class="newsitem" v-for="(newsItem,index) in tabList">
            <div class="newspic">
              <ul>
                <li v-for="item in newsItem.deslist"><a href="/"><img :src="item.imgName"><span>{{ item.describe }}</span></a></li>
               </ul>
            </div>
            <ul class="newslist">
              <li v-for="item in newsItem.newslist">
                <i></i><a href="javascript:void(0)" @click="jumpArticle(item)">{{ item.title }}</a>
                <p>{{ item.abstract }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--tab_box end-->
      <!--special begin-->
      <div class="special whitebg">
        <h2 class="htitle"><span class="hnav"><a href="/">技术分享</a><a href="/">生活感悟</a></span>精彩专题</h2>
        <ul>
          <li v-for="(item,index) in special">
            <i class="ztpic"><a href="/" target="_blank"><img v-lazy="item.img"></a></i>
            <b>{{ item.title }}</b>
            <span>{{ item.abstract }}</span>
            <a href="" target="_blank" class="readmore">文章阅读</a>
          </li>
        </ul>
      </div>
      <!--special end-->
      <div class="ad whitebg"> <img v-lazy="lazyimg[2]"> </div>
      <!--bloglist begin-->
      <article-list :articleList="articles.all" :pageTotal='pageTotal' :pageSize='pageSize'></article-list>
    </div>
    <!--bloglist end-->
    <div class="rbox">
      <!--card begin-->
      <div class="card">
        <h2>我的名片</h2>
        <p>网名：ChirsChen | 克里斯儿</p>
        <p>职业：前端开发工程师、前端架构师</p>
        <p>现居：北京市-朝阳区</p>
        <p>Email：chirschenyt@qq.com</p>
        <ul class="linkmore">
          <li><a href="/" target="_blank" class="iconfont icon-zhuye" title="网站地址"></a></li>
          <li><a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=uNvQ0crL29Dd1sHM_MnJltvX1Q" target="_blank" class="iconfont icon-youxiang" title="我的邮箱"></a></li>
          <li><a href="http://wpa.qq.com/msgrd?v=3&uin=853784650&site=qq&menu=yes" target="_blank" class="iconfont icon---" title="QQ联系我"></a></li>
          <li id="weixin"><a href="#" target="_blank" class="iconfont icon-weixin" title="关注我的微信"></a><i><img src="/img/wx.png"></i></li>
        </ul>
      </div>
      <!--card end-->
      <!--notice begin-->
      <div class="notice whitebg">
        <h2 class="htitle">常见内容</h2>
        <ul>
          <li><a href="/">十条设计原则教你学会如何设计网页布局!</a></li>
          <li><a href="/">用js+css3来写一个手机栏目导航</a></li>
          <li><a href="/">6条网页设计配色原则,让你秒变配色高手</a></li>
          <li><a href="/">三步实现滚动条触动css动画效果</a></li>
        </ul>
      </div>
      <!--notice end-->
      <!--sort begin-->
      <sort :sortlist="sortlist"></sort>
      <!--sort end-->
      <!--recommend begin-->
      <recommend :recommend="recommend"></recommend>
      <!--recommend end-->
      <div class="ad whitebg imgscale">
        <ul>
          <a href="/"><img v-lazy="lazyimg[3]"></a>
        </ul>
      </div>
      <!--thinklike begin-->
      <thinklike :thinklike="thinklike"></thinklike>
      <!--thinklike end-->
      <div class="ad whitebg imgscale">
        <ul>
          <a href="/"><img v-lazy="lazyimg[4]"></a>
        </ul>
      </div>
      <!--introduce begin-->
      <introduce :num='articleNum'></introduce>
      <!--introduce end-->
    </div>
  </article>
</template>
<script>
  import articleList from "../components/article/articleList"
  import sort from "../components/base/sort.vue"
  import recommend from "../components/base/recommend.vue"
  import banner from "../components/base/banner.vue"
  import thinklike from "../components/base/thinklike.vue"
  import introduce from "../components/base/introduce.vue"
  import webHttp from '../plugins/http.js'
  export default {
    layout: 'default',
    data(){ 
      return{
        lazyimg: ['/img/h1.png','/img/h2.png','/img/longad.png','/img/ad.png','/img/ad02.png'],
        articles:{ all:[] },
        pageTotal: 0,
        pageSize: 7,
        tabList: [
          {
            deslist: [
              { describe: '技术分享 describe111111', imgName: '/img/1.png' },
              { describe: '技术分享 describe111111', imgName: '/img/3.png' }
            ],
            newslist: []
          },
          {
            deslist: [
              { describe: '工作日记 describe111111', imgName: '/img/2.png' },
              { describe: '工作日记 describe111111', imgName: '/img/4.png' }
            ],
            newslist: []
          },
          {
            deslist: [
              { describe: '生活感悟 describe111111', imgName: '/img/5.png' },
              { describe: '生活感悟 describe111111', imgName: '/img/6.png' }
            ],
            newslist: []
          },
        ],
        special: [
          { 
            img: '/img/6.png',
            title: '技术分享01标题技术分享01标题',
            abstract: '技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要'
          },
          { 
            img: '/img/5.png',
            title: '技术分享02标题技术分享02标题',
            abstract: '技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要'
          },
          { 
            img: '/img/4.png',
            title: '技术分享03标题技术分享03标题',
            abstract: '技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要'
          },
          { 
            img: '/img/3.png',
            title: '技术分享04标题技术分享04标题',
            abstract: '技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要'
          },
          { 
            img: '/img/2.png',
            title: '技术分享05标题技术分享05标题',
            abstract: '技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要'
          },
          { 
            img: '/img/1.png',
            title: '技术分享06标题技术分享06标题',
            abstract: '技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要技术分享01摘要'
          },
        ],
        sortlist: [],
        thinklike: [],
        recommend: [],
        articleNum:'' // 网站介绍文章总数
      }
    },
    components: {
      banner, articleList, sort, recommend, thinklike, introduce
    },
    mounted() {
      $('.tab_buttons li').click(function() {
        $(this).addClass('newscurrent').siblings().removeClass('newscurrent');
        $('.newstab>div:eq(' + $(this).index() + ')').show().siblings().hide();
      });
      webHttp.request({
        url: '/blog/index',
        method: 'POST',
        data: {
          pageNum: 1,
          pageSize: this.pageSize
        },
        callback: (res) => {
          this.articles.all = res.list.data
          this.sortlist = res.sort
          this.thinklike = res.thinklike
          this.recommend = res.recommend
          this.tabList[0].newslist = res.tabList.tech.data
          this.tabList[1].newslist = res.tabList.work.data
          this.tabList[2].newslist = res.tabList.life.data
          this.articleNum = res.list.totalCount
        }
      })
    },
    methods: {
			jumpArticle: function(item){
				this.$router.push({path: '/articleShow',query: {articleTag: item.tag[0],id: item.articleId }})
      }
    }
  }
</script>

<style lang="less">
  .headline {
    width: 30%;
    float: right;
    overflow: hidden;
    ul {
      height: 260px;
      li {
        width: 100%;
        background: #000;
        overflow: hidden;
        height: 125px;
        margin-bottom: 10px;
        border-radius: 3px;
        position: relative;
        a { display: block; overflow: hidden; height: 100%; }
        img { width: 100%; height: 100%; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; -ms-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease; transition: all 0.5s; opacity: .7; }
        span { bottom: 0; position: absolute; top: 30%; left: 0; right: 0; color: #FFF; text-align: center; font-size: 15px; margin-top: 5px; padding: 0 40px; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; line-height: 24px; height: 48px; }
      }
      li:hover img { transform: scale(1.1); opacity: 1 }
    }
  }

  .tab_buttons { margin-bottom: 10px; width: 100%; overflow: hidden; border-bottom: #e4e3e3 1px solid;/* position: relative; */ }
  .tab_buttons li { display: block; font-size: 16px; line-height: 40px; float: left; width: 100px; text-align: center;position: relative; cursor:pointer }
  .newscurrent:after { content: ""; background: #000; width: 100px; height: 2px; position: absolute; bottom: 0; left: 0; }
  .newsitem { display: none; }
  .newsitem:nth-child(1) { display: block; }
  .newsitem ul li i { display: block; width: 20px; height: 20px; background: #9a9a9a; float: left; margin-top: 6px; margin-right: 20px; position: relative; font-style: normal }
  .newsitem ul li i::before { position: absolute; left: 0; top: 0; font-size: 9px; color: #fff; line-height: 20px; width: 20px; text-align: center }
  .newsitem ul li:first-child i { background: #222; }
  .newsitem ul li:first-child i::before { content: "1"; }
  .newsitem ul li:nth-child(2) i::before { content: "2"; }
  .newsitem ul li:nth-child(3) i::before { content: "3"; }
  .newsitem ul li:nth-child(4) i::before { content: "4"; }
  .newsitem ul li:nth-child(5) i::before { content: "5"; }.newslist { float: right; width: 66% }
  .newslist li { overflow: hidden; line-height: 32px; padding: 0 20px 10px 20px; }
  .newslist li a { height: 32px; }
  .newslist li img { width: 100% }
  .newslist li { height: 22px; }
  .newslist li:hover { height: 100%; background: #f7f7f7 }
  .newslist li:hover a { color: #000; font-weight: bold }
  .newslist li:hover i { background: #222; }
  .newslist li:nth-child(1) { height: 100%; background: #f7f7f7 }
  .newslist li:nth-child(1) a { color: #000; font-weight: bold }
  .newslist li:nth-child(1) i { background: #9a9a9a; }
  .newslist:hover li:nth-child(1) { height: 22px; background: none; }
  .newslist:hover li:nth-child(1) a { color: #333; font-weight: normal }
  .newslist:hover li:nth-child(1) i { background: #9a9a9a; }
  .newslist:hover li:nth-child(1):hover { height: 100%; background: #f7f7f7; }
  .newslist:hover li:nth-child(1):hover a { color: #000; font-weight: bold }
  .newslist:hover li:nth-child(1):hover i { background: #222; }
  .newslist p { line-height: 24px; font-size: 14px; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; height: 48px; }
  .newspic {
    float: left; width: 32%; height: 218px; overflow: hidden; position: relative;
    ul {
      overflow: hidden;
      li {
        height: 100px; position: relative; background: rgba(0,0,0,1); overflow: hidden; margin-bottom: 10px; border-radius: 3px;
        a { display: block; height: 100%; overflow: hidden }
      }
      img { height: 100%; width: 100%; opacity: .7; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; -ms-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease; transition: all 0.5s; }
      span { bottom: 0; position: absolute; bottom: 30%; left: 0; right: 0; color: #FFF; text-align: center; font-size: 15px; padding: 0 40px; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; line-height: 22px; }
      li:hover img { opacity: .9; transform: scale(1.1); }
    }
  }

  
  .tab_box { clear: both; position: relative; }
  
  .special{
    ul { overflow: hidden; padding: 10px 0 20px 10px; position: relative; }
    ul:before { content: ""; position: absolute; background: #fff; width: 1px; height: 100%; left: 10px }
    ul:after { content: ""; position: absolute; background: #fff; width: 100%; height: 1px; bottom: 20px; left: 0; }
    li {
      float: left; width: 27.6%; border-bottom: #eee 1px solid; border-left: #eee 1px solid; overflow: hidden; padding: 20px; -moz-transition: all .5s ease; -webkit-transition: all .5s ease; transition: all .5s ease;
      b { display: block; width: 100%; overflow: hidden; height: 30px; line-height: 30px; margin: 10px 0; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
      span { color: #999; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 3; font-size: 14px; height: 62px; }
    }
    li:hover {
      background: #fff; box-shadow: #ccc 1px 1px 8px;
      img { transform: scale(1.05) }
    }
  }
  .ztpic {
    width: 100%; height: 100px; overflow: hidden; border-radius: 3px; background: #CCC; display: block;
    img { display: inline-block; width: 100%; min-height: 100%; height: auto; vertical-align: middle; transition: all .5s ease-out .1s; }
  }
  .readmore { margin: 10px 0 0 0; color: #096; display: block; }
  .readmore:before { content: "+"; color: #063 }
  .hnav {
    float: right;
    a { display: block; margin-right: 10px; padding-right: 10px; float: left; position: relative }
    a:after { position: relative; content: "/"; right: -10px; bottom: 0; color: #ccc }
    a:last-child::after { content: "" }
  }

  .card { box-shadow: 0px 1px 0px rgba(255,255,255,.1), inset 0px 1px 1px rgba(0,0,0,.7); border-radius: 3px; background: url('../assets/img/quote-bg.png') no-repeat top right rgba(42,42,42,1); height: 260px; overflow: hidden; margin-bottom: 20px }
  .card h2 { font-size: 22px; margin: 10px; color: #89919a; font-weight: normal; padding-bottom: 10px; }
  .card p { font-size: 12px; padding: 0 0 0 20px; line-height: 28px; text-shadow: 0px 1px 2px rgba(0,0,0,.5); color: #d0d2d4; -webkit-animation: animations2 5s ease-in-out 5s; -moz-animation: animations2 5s ease-in-out 5s; -o-animation: animations2 5s ease-in-out 5s; -ms-animation: animations2 5s ease-in-out 5s; animation: animations2 5s ease-in-out 5s; }
  .linkmore { margin: 15px }
  .linkmore li { width: 25%; float: left }
  .linkmore li a { height: 53px; display: block; overflow: hidden; box-shadow: 0px 1px 0px rgba(255,255,255,.1), inset 0px 1px 1px rgba(0,0,0,.7); border-radius: 50%; margin: 0 5px; }
  .linkmore li a:hover { opacity: 0.5; }
  a.iconfont.icon-zhuye {color: #ef5509;font-size: 36px;background: url('../assets/img/c01.png') no-repeat center ;}
  a.iconfont.icon-youxiang { color: #FF991A; font-size: 28px;    background: url('../assets/img/c02.png') no-repeat center ; }
  a.iconfont.icon--- { color: #1296DB;    background: url('../assets/img/c03.png') no-repeat center; }
  a.iconfont.icon-weixin { color: #07AF12;    background: url('../assets/img/c04.png') no-repeat center; }
  #weixin { position: relative }
  #weixin i { display: block; position: absolute; bottom: 55px; right: 0 }
  #weixin i img { height: 100px; display: none }
  #weixin:hover i img { display: block }

  .notice{
    ul { padding-top: 18px }
    li { font-size: 12px; line-height: 30px; margin-bottom: 12px; display: block; -moz-border-radius: 4px; border-radius: 4px; background: #f6f6f6; padding: 4px 12px 4px 30px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; position: relative; -moz-transition: all .2s ease; -webkit-transition: all .2s ease; transition: all .2s ease; }
    li:before { position: absolute; content: ""; width: 3px; height: 3px; background: #000; border-radius: 10px; left: 15px; top: 20px }
    li:hover { background: #f2f2f2; box-shadow: 0 0 10px #ccc; -moz-transition: all .2s ease; -webkit-transition: all .2s ease; transition: all .2s ease; }
  }

	@media screen and (min-width: 1024px) and (max-width: 1199px) {
    .special li { width: 27% }
	}
	@media screen and (max-width: 1023px) {
    .special li { width: 27%; }
	}
	@media only screen and (max-width: 768px) {
    .special li { width: 27.6%; padding: 8px }
    .hnav a { font-size: 12px }
	}
	@media only screen and (max-width: 480px) {
    
    .headline {
      width: 100%;
      ul {
        height: auto; padding-bottom: 10px; overflow: hidden;
        li {
          width: 49%; float: left;
          span { padding: 0 20px }
        }
        li:last-child { float: right }
      }
    }
    
    .newspic {
      width: 100%;
      height: auto;
      li {
        width: 49%;
        float: left;
        a {
          height: 100%
        }
      }
      li:last-child {
        float: right;
      }
      span { padding: 0 8px; }
    }
    .newslist {
      float: none;
      width: 100%
    }
    .tab_buttons {
      overflow-x: auto;
      ul {
        width: 600px;overflow-x: scroll;
        li {margin-right: 30px;width: auto;}
      }
    }
    .newscurrent:after{width:100%;}
    
    .special {
      ul { padding: 0; }
      ul:before { left: 0; }
      ul:after { bottom: 0; }
      li {
        width: 44%; padding: 8px;
        b { -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2; font-size: 14px; height: 42px; line-height: 24px; white-space: inherit; }
      }
    }
    .hnav { float: none; width: 100%; clear: both; display: block; overflow: hidden; }
    

	}
</style>

