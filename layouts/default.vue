<template>
  <div id="app">
		<header id="header">
			<div class="navbox">
				<h2 id="mnavh" @click="navShow"><span class="navicon"></span></h2>
				<div class="logo"><a href="javascript:void(0)">克里斯儿的blogs</a></div>
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
				<input id="keyboard" class="input_text" value="请输入关键字词" style="color: rgb(153, 153, 153);" onfocus="if(value=='请输入关键字词'){this.style.color='#000';value=''}" onblur="if(value==''){this.style.color='#999';value='请输入关键字词'}" type="text">
				<input class="input_submit" value="搜索" type="submit">
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
            <li><img src="../assets/img/wxgzh.jpg"><span>微信公众号</span></li>
            <li><img src="../assets/img/wx.png"><span>我的微信</span></li>
          </ul>
        </div>
        <div class="endnav">
          <p><b>站点声明：</b></p>
          <p>1、本站部分资源来自互联网，我们转载的目的是用于学术交流与讨论，如果您认为我们的转载侵犯了您的权益，请与我们联系，我们将在3个工作日内删除相关内容。</p>
          <p>2、本网站所刊发、转载的文章，其版权均归原作者所有，如其他媒体、网站或个人从本网下载使用，请在转载有关文章时务必尊重该文章的著作权，保留本网注明的“稿件来源”，并自负版权等法律责任。</p>
          <p>Copyright ©2018 - 2019 <a href="http://www.-----.com" target="_blank">cweb.fun</a> All Rights Reserved. 备案号：<a href="http://www.miitbeian.gov.cn/" target="_blank">京ICP备18050975号-1</a></p>
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
  export default {
    data () {
      return {
        showBackTop: false,
				showSearch: false,
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
    watch: {
    },
    mounted(){
      this.scrollCotainer()
      this.getTop()
    },
    methods: {
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
      // backHome: function(){
      //   this.location = []
      //   this.$router.push({name: "index"})
      // },
      backTop: function(){
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      },
      // //当前位置的路由信息表
      // currentLocation: function(to){
      //   switch(to.name){
      //     case "article" :
      //     this.location = [{pathName: "article",showName: "技术文章"}]
      //     break
      //     case "articleShow" :
      //     if(to.query.articleTag=='css'&& to.query.id==2){
      //       this.articleTitle = '圣杯布局中对left盒子设置负内边距-100%的一点解释'
      //     }
      //     this.location = [
      //       {pathName: "article",showName: "技术文章"},
      //       {pathName: "techincal",showName: to.query.articleTag,params: {tag: to.query.articleTag}},
      //       {pathName: "articleShow",showName: this.articleTitle,query: { tag: to.query.articleTag,id: to.query.id }}
      //     ]
      //     break
      //     case "articleType" :
      //     this.location = [
      //       {pathName: "article",showName: "技术文章"},
      //       {pathName: "articleType",showName: to.query.type,params: {type: to.query.type}},
      //     ]
      //     break
      //     case "timeList" :
      //     this.location = [{pathName: "timeList",showName: "时间轴"}]
      //     break
      //     case "msgboard" :
      //     this.location = [{pathName: "msgboard",showName: "留言板"}]
      //     break
      //     case "resources" :
      //     this.location = [{pathName: "resources",showName: "资源"}]
      //     break
      //     case "search" :
      //     this.location = [{pathName: "search",showName: "搜索"}]
      //     break
      //   }
      // }
    }
  }
</script>

<style lang="less">
	@import "../assets/css/prism.css";
	@import '../assets/css/emoji-sprite.css';
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
	#starlist li a:hover, #starlist .nuxt-link-active, .selected > a, #starlist li:hover {
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
				outline: none
			}
			input.input_submit {
				border: 0;
				background: 0;
				color: #fff;
				outline: none;
				position: absolute;
				top: 10px;
				right: 10%
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
			/* top: 30px;*/
			li {
				width: 55%;
				text-align: center;
				background: #12b7de;
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
			li:last-child {
				padding-bottom: 100%
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
//   *{
//     margin: 0;
//     padding: 0;
//   }
//   a{
//     -webkit-tap-highlight-color: transparent
//   }
//   body{
//     font: 400 16px/20px Arial,Helvetica,Tahoma,"华文细黑","Microsoft YaHei","微软雅黑",sans-serif;
//     color: #000;
//   }
//   #app{
//     margin: 50px 0 0 0;
//   }
//   .main{
//     width: 100%;
//     min-height: 1200px;
//   }
//   a{
//     text-decoration: none
//   }
//   .body-content,.container{
//     position: relative
//   }
//   .location{
//     background: #FAF7F7;
//     margin-top: 10px;
//     padding: 10px;
//     font-size: 14px;
//     a{
//       color: #16a085
//     }
//     div{
//       display: inline;
//     }
//   }
//   .section{
//     display: flex;
//     margin-left: auto;
//     margin-right: auto;
//   }
//   .content{
//     width: 68%;
//   }
//   .r-slide{
//     width: 32%;
//   }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active{
    transition: all ease .5s;
  }
//   .fix-bg{
//     width: 100%;
//     height: 100%;
//     position: fixed;
//     top: 0;
//     left: 0;
//     z-index: -1;
//   }
// //手机端
// @media screen and (max-width: 767px){
//   .fix-bg{
//     background: #f4f4f4
//   }
//   .section{
//       flex-wrap: wrap;
//         // padding: 10px 15px;
//     }
//     .section .content,.r-slide{
//       width: 100%
//     }
//     .location{
//       margin-top: 0;
//     }
// }
// //平板
// @media screen and (min-width: 768px){
//   .fix-bg{
//     background: url("/img/mainBg2.jpg") 0 0 no-repeat;
//     background-size: 100% 100%;
//   }
//   .section{
//     max-width: 760px;
//     padding: 10px 30px;
//   }
//   .navbar{
//     max-width: 820px
//   }
//   .search{
//     padding: 0 30px
//   }
//   .nav-header{
//     padding: 0 20px 0 35px
//   }
//   .r-slide{
//     margin-left: 25px;
//     margin-top: 10px;
//   }
// }
// //小屏幕pc端
//   @media screen and (min-width: 992px) {
//     .section{
//       max-width: 970px;
//       padding: 10px 30px;
//     }
//     .navbar{
//       max-width: 1030px;
//     }
//   }
//   //大屏幕pc端
//   @media screen and (min-width: 1200px){
//     .section{
//       max-width: 1140px;
//       padding: 20px 30px;
//     }
//     .r-slide{
//       margin-left: 30px;
//     }
//     .navbar{
//       max-width: 1200px;
//     }
//   }
</style>

