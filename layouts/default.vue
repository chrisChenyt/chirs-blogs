<template>
  <div id="app">
		<header id="header">
			<div class="navbox">
				<h2 id="mnavh" @click="navShow"><span class="navicon"></span></h2>
				<div class="logo"><a href="javascript:void(0)">Chirs's blogs</a></div>
				<nav>
					<ul id="starlist">
						<li v-for="item in tabs" @click="navHide">
							<nuxt-link :to = "{name: item.name}" :class="{'nuxt-link-active': (($route.name == 'articleShow' || $route.name == 'articleType') && item.name=='article' && $route.query.articleTag!='life' && $route.query.articleTag!='work') || ($route.name == 'msgboard' && item.name=='msgboard') || ($route.name == 'articleShow' && item.name=='life' && $route.query.articleTag=='life') || ($route.name == 'articleShow' && item.name=='work' && $route.query.articleTag=='work')}" exact >
								{{ item.render }}
							</nuxt-link>
						</li>
					</ul>
				</nav>
				<div class="searchico" @click="showSearch=!showSearch"></div>
			</div>
		</header>
		<div class="searchbox">
			<div class="search" v-show="showSearch">
				<input id="keyboard" v-model="ArticleTitle" class="input_text" value="请输入关键字词" style="color: rgb(153, 153, 153);" onfocus="if(value=='请输入关键字词'){this.style.color='#000';value=''}" onblur="if(value==''){this.style.color='#999';value='请输入关键字词'}" type="text">
				<input class="input_submit" @click="searchArticle" value="搜索" type="button">
			</div>
			<div class="searchclose" @click="showSearch=false"></div>
		</div>
    <div class = "container" ref = "container">
      <nuxt/>
    </div>
    <footer>
      <div class="box">
        <div class="wxbox">
          <ul>
            <li><img v-lazy="lazywximg[0]"><span>微信公众号</span></li>
            <li><img v-lazy="lazywximg[1]"><span>我的微信</span></li>
          </ul>
        </div>
        <div class="endnav">
          <p><b>站点声明：</b></p>
          <p>1、本站部分资源来自互联网，我们转载的目的是用于学术交流与讨论，如果您认为我们的转载侵犯了您的权益，请与我们联系，我们将在3个工作日内删除相关内容。</p>
          <p>2、本网站所刊发、转载的文章，其版权均归原作者所有，如其他媒体、网站或个人从本网下载使用，请在转载有关文章时务必尊重该文章的著作权，保留本网注明的“稿件来源”，并自负版权等法律责任。</p>
          <p>Copyright ©2018 - 2019 <a href="http://blogs.cweb.fun" target="_blank">blogs.cweb.fun</a> All Rights Reserved. 备案号：<a href="http://www.miitbeian.gov.cn/" target="_blank">京ICP备18050975号-1</a></p>
        </div>
      </div>
    </footer>
    <transition name = "fade">
      <div class = "rocket" v-show = "showBackTop">
        <a href = "javascript: void(0)" @click = "backTop"></a>
      </div>
    </transition>
  </div>
</template>
<script>
  import { getScrollTop } from "@/utils/getScrollTop"
	import { getElementTop } from "@/utils/getElementTop"
	import webHttp from "../plugins/http.js"
  export default {
    data () {
      return {
				lazywximg: ['/img/wxgzh.jpg','/img/wx.png'],
        showBackTop: false,
				showSearch: false,
				ArticleTitle: '',
				tabs: [
					{name: "index",render: "首页"},
					{name: "article",render: "技术分享"},
					{name: "work",render: "工作日记"},
					{name: "life",render: "生活感悟"},
					{name: "msgboard",render: "建议和留言"},
					{name: "resources",render: "资源&文档"}
				]
      }
    },
    components: {
    },
    mounted(){
      this.scrollCotainer()
      this.getTop()
    },
    methods: {
			searchArticle() {
				this.$router.push({path: '/search',query: {title: this.ArticleTitle }})
			},
			navShow() {
        $("#starlist").toggle();
        $("#mnavh").toggleClass("open");
			},
			navHide() {
				if(document.body.clientWidth<1023) {
					this.navShow()
				}
			},
      scrollCotainer: function(){
        let that = this
        window.addEventListener("scroll",this.scroll_resize)
          //改变窗口大小后对导航栏状态重新进行确认
        window.addEventListener("resize",this.scroll_resize)
      },
      scroll_resize: function(){
        this.debounce(this.getTop,500)
      },
      getTop: function(){
        //计算document需要滚动的距离
        let tabOffsetTop = getElementTop(this.$refs.container) - 50
        let move = Math.abs(getScrollTop() - tabOffsetTop)
        if(getScrollTop() > 0){
          this.showBackTop = true
        }else{
          this.showBackTop = false
        }
      },
      //函数去抖，防止scroll和resize频繁触发
      debounce: function(func,delay){
        let context = this
        let args = arguments
        if(this.timer){
          clearTimeout(this.timer)
        }   
        this.timer = setTimeout(function(){
          func.apply(context,args)
        },delay)
      },
      backTop: function(){
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      },
    }
  }
</script>

<style lang="less">
	header {
		width: 100%;
		padding: 5px 0;
		background: #1C2327;
		height: 50px;
	}
	header::before {
		background: #000 linear-gradient(to left, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
		content: "";
		height: 5px;
		position: absolute;
		top: 0;
		width: 100%;
	}
	.logo {
		float: left;
		margin-right: 60px;
		line-height: 50px;
		color: #FFF;
		font-size: 22px;
		a {
			color: #FFF;
		}
		img {
			margin-top: 14px;
		}
	}
	#mnavh {
		display: none;
		margin: 5px 0 0 0;
		width: 24px;
		height: 40px;
		float: right;
		text-align: center;
		padding: 0 10px;
	}
	.navicon {
		display: block;
		position: relative;
		width: 30px;
		height: 5px;
		background-color: #fff;
		margin-top: 20px;
	}
	.navicon:before, .navicon:after {
		content: '';
		display: block;
		width: 30px;
		height: 5px;
		position: absolute;
		background: #fff;
		-webkit-transition-property: margin, -webkit-transform;
		transition-property: margin, -webkit-transform;
		transition-property: margin;
		transition-property: margin, transform, -webkit-transform;
		-webkit-transition-duration: 300ms;
		transition-duration: 300ms;
	}
	.navicon:before {
		margin-top: -10px;
	}
	.navicon:after {
		margin-top: 10px;
	}
	
	nav {
		float: left;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	
	.open{
		.navicon {
			background: none
		}
		.navicon:before {
			margin-top: 0;
			transform: rotate(45deg);
		}
		.navicon:after {
			margin-top: 0;
			transform: rotate(-45deg);
		}
		.navicon:before, .navicon:after {
			content: '';
			display: block;
			width: 30px;
			height: 5px;
			position: absolute;
			background: #fff;
		}
	}
	#starlist {
		li {
			position: relative;
			float: left;
			width: max-content;
			a {
				float: left;
				padding: 0 20px;
				color: #fff;
			}
		}
	}
	#starlist li a:hover, #starlist .nuxt-link-active, .selected > a {
		color: #00c1de;
	}
	#starlist li:hover a {
		color: #00c1de
	}

	.searchico {
		margin-top: 5px;
		width: 39px;
		height: 39px;
		float: right;
		cursor: pointer;
		background: url('../assets/img/search_bg.png') no-repeat center !important;
	}
	.searchbox {
		width: 1200px;
		margin: 10px auto;
		overflow: hidden;
		background: #ffffff;
		position: relative;
		.search {
			width: 50%;
			margin: 20px auto;
			background: #222;
			border-radius: 0 5px 5px 0;
			position: relative;
			border: #ccc 1px solid;
			input.input_text {
				border: 0;
				line-height: 36px;
				height: 36px;
				width: 72%;
				padding-left: 10px;
				outline: none;
				border-radius:0;
			}
			input.input_submit {
				border: 0;
				background: 0;
				color: #fff;
				outline: none;
				position: absolute;
				right: 0;
				height: 100%;
				width: 25%;
			}
		}
		.searchclose {
			background: url('../assets/img/close.png') no-repeat;
			display: block;
			position: absolute;
			width: 28px;
			height: 30px;
			right: 5px;
			top: 5px
		}

	}

  footer {
    background: #373D41;
    width: 100%;
    border-top: #00C1DE 10px solid;
    padding: 30px 0;
    color: #73777a;
    font-size: 14px;
    a {
      color: #73777a;
    }
    a:hover {
      color: #00C1DE;
    }
    .wxbox {
      overflow: hidden;
      float: left;
      margin-right: 20px;
      li {
        float: left;
        margin: 0 10px;
        text-align: center;
      }
      img {
        height: 100px;
      }
    }
    .endnav{
      b {
        font-size: 16px;
        color: #00c1de;
      }
      p {
        margin-bottom: 5px;
      }
    }
  }
  .rocket{
    position: fixed;
    right: 10px;
    bottom: 10px;
    a{
      display: inline-block;
      width: 50px;
      height: 50px;
      background: url("/img/backTop.png") 0 0 no-repeat;
    }
    a:hover{
      background-position: -50px 0;
    }
  }
	@media screen and (min-width: 1024px) and (max-width: 1199px) {
		.navbox {
			width: 96%;
		}
		#starlist li a {
			padding: 0 10px;
		}
		.searchbox {
			width: 96%;
		}
    .box, article { width: 96% }
	}
	@media screen and (max-width: 1023px) {
    .box, article { width: 96% }
    article { padding-top: 80px; }
		.navbox {
			width: 100%;
		}
		header {
			position: fixed;
			z-index: 999
		}
		nav {
			width: 100%;
			height: auto;
			background: rgba(0,0,0,0.5);
			margin-top: 18px;
			position: fixed;
			z-index: 999;
			top: 42px;
		}
		.searchico {
			position: absolute;
			top: 6px;
			right: 10px;
		}
		#mnavh {
			display: block;
			overflow: hidden;
			position: absolute;
		}

		.logo {
			margin-left: 0;
			line-height: 56px;
			float: none;
			text-align: center;
			margin-right: 0px;
		}
		#starlist {
			display: none;
			width: 100%;
			background: #12b7de;
			width: 55%;
			padding-bottom: 100%;
			li {
				width: 100%;
				text-align: center;
				float: none;
				display: block;
				font-weight: bold;
				a {
					color: #fff;
					display: block;
					width: 100%;
					text-align: center;
					float: none;
					padding: 0;
					background: #12b7de;
					border-bottom: #49ccea 1px solid;
				}
			}
		}
		#starlist li a:hover, #starlist .nuxt-link-active, .selected > a, #starlist li:hover {
			color: orange;
		}
		.searchbox {
			width: 100%;
			position: fixed;
			top: 50px;
			z-index: 99;
			background: rgba(0,0,0,.8);
			.search {
				width: 80%;
			}
		}
	}
	@media only screen and (max-width: 768px) {
    footer{
      .endnav p:last-child { text-align: center; margin-top: 20px; }
    }
	}
	@media only screen and (max-width: 480px) {
    footer {
      .wxbox {
        float: none;
    		margin-right: 0;
        ul {
          overflow: hidden;
          text-align: center;
        }
        li {
          float: none;
          display: inline-block;
        }
      }
      .endnav {
        width: 100%;
        overflow: hidden;
        margin-top: 20px;
        p {
          margin: 0 10px;
        }
      }
    }
	}
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active{
    transition: all ease .5s;
  }
</style>

