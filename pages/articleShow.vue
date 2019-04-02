<template>
	<article>
    <!--lbox begin-->
    <div class="lbox">
			<div class = "article-show">
				<div class = "article-show-content" >
					<div class = "article-body">
						<h2 class = "article-title">{{ articles.only.title }}</h2>
						<div class = "article-details">
							<div class = "article-details-tag">
								<span class = "icon-tag-stroke i-p"></span>
								<span class = "each-tag" v-for = "tag in articles.only.tag">{{ tag }}</span>
							</div>
							<div class = "article-details-other">
								<div class = "time">
									<span class = "icon-clock i-p"></span>
									<span>{{ articles.only.date }} 发表</span>
								</div>
								<div class = "pv-c-l">
									<span class = "icon-eye i-p"></span>
									<span>{{ articles.only.pv }} 次阅读 </span>
									<span class = "icon-commenting-o i-p"></span>
									<span>{{ articles.only.commentNum }} 条评论</span>
									<span class = "icon-like i-p"></span>
									<span>{{ articles.only.likeNum }} 个赞</span>
								</div>
							</div>
						</div>
						<hr>
						<div v-html="articles.only.content" class = "article-body">{{ articles.only.content }}</div>
						<div class = "article-like" :class="{'article-like-after': lovedArr.indexOf(articles.only.articleId) !== -1}" @click="love(articles.only)"><span class = "love-text">{{ love_t }}</span></div>
							<div class="article-warning" v-if="articles.only.original">
							<h6>本文为作者原创文章，转载请注明出处： </h6>
							<i><a href="javascript: void(0)">{{ fullPath }}</a></i>
						</div>
						<div class="article-line"></div>
						<h4>分享：</h4>
						<div class="share">
							<a href="javascript: void(0)" @click = "share('QQ','http://connect.qq.com/widget/shareqq/index.html')" class="design-bg-qq"></a>
							<a href="javascript: void(0)" @click = "share('qzone','http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey')" class="design-bg-qzone"></a>
							<a href="javascript: void(0)" @click = "share('sina','http://v.t.sina.com.cn/share/share.php')" class="design-bg-sina"></a>
							<a href="javascript: void(0)" @click = "qrcode" class="design-bg-weixin"></a>
							<a href="javascript: void(0)" @click = "share('douban','http://shuo.douban.com/!service/share')" class="design-bg-douban"></a>
						</div>
						<div class = "otherArticle"></div>
						<div class = "qrcode-box" v-show = "qrShow">
							<span>微信扫一扫分享到朋友圈</span><span class = "exit-qrcode" @click = "exitQrcode">X</span>
							<div id = "qrcode"></div>
						</div>
						<div class = "pre-next">
							<div class = "pre" v-if = "pre_next.pre">
								<h6>上一篇：</h6>
								<a href="javascript: void(0)"><span @click = "jumpPn(pre_next.pre)"> {{ pre_next.pre.title }}</span> </a>
							</div>
							<div class = "next" v-if = "pre_next.next">
								<h6>下一篇：</h6>
								<a href="javascript: void(0)"><span @click = "jumpPn(pre_next.next)"> {{ pre_next.next.title }}</span> </a>
							</div>
						</div>
					</div>
				</div>
				<comment ref='comment' :userInfo="userInfo" :comments="comments" @leaveComment="leaveComment" @commentReply="commentReply" @loginShow="loginShow" @loginOut="loginOut" @pageChange="pageChange"></comment>
			</div>
		</div>
		<!--bloglist end-->
    <div class="rbox">
      <sort :sortlist="sortlist"></sort>
      <div class="ad whitebg imgscale">
        <ul>
          <a href="javascript:void(0)"><img src="../assets/img/ad.png"></a>
        </ul>
      </div>
			<recommend :recommend="recommend"></recommend>
      <thinklike :thinklike="thinklike"></thinklike>
      <introduce></introduce>
		</div>
		<login ref="login" @login="login" @register="register"></login>
	</article>
</template>
<script>
  import sort from "../components/base/sort.vue"
  import recommend from "../components/base/recommend.vue"
  import thinklike from "../components/base/thinklike.vue"
  import introduce from "../components/base/introduce.vue"
	import comment from "../components/comment/comment"
	import webHttp from '../plugins/http.js'
	import util from '../plugins/utils.js'
	import login from '../components/login/userLogin.vue'
	export default {
		components: {
			comment, sort, recommend, thinklike, introduce, login
		},
		data(){
			return {
				qrShow: false,
				lovedArr: [],
				fullPath: '',
        articles: { only: []
        },
				pre_next: {
					next: {},
					pre: {}
				},
				sortlist: [],
				thinklike: [],
				recommend: [],
				comments: [],
				userInfo: {name: "",imgUrl: ""}
			}
		},
		mounted(){
			if(localStorage.getItem("articleLoved")){
				this.lovedArr = JSON.parse(localStorage.getItem("articleLoved"))
			}
			if(localStorage.getItem("userInfo")){
				this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
			}

			this.$nextTick(function(){
				Prism.highlightAll()
			})
			// 文章链接
			this.fullPath = window.location.href
      webHttp.request({
        url: '/blog/articleShow',
        method: 'POST',
        data: {
					articleId: this.$route.query.id
				},
        callback: (res) => {
					this.articles.only = res.list
					this.pre_next = res.pre_next
          this.thinklike = res.thinklike
          this.sortlist = res.sort
					this.recommend = res.recommend
					this.comments = res.comment.data
					this.$refs.comment.pageTotal = res.comment.totalCount

					let title = this.userInfo.name+'在 '+util.getNowFormatDate('yyyy-MM-dd HH:mm')+' 浏览了你的文章 ---《'+this.articles.only.title+'》'
					webHttp.request({
						url: '/blog/createPv',
						method: 'POST',
						data: {
							name: this.userInfo.name,
							title: title
						},
						callback: (res) => {
						}
					})
        }
      })
		},
		computed: {
			love_t: function(){
				if(this.lovedArr.indexOf(this.articles.only.articleId) !== -1){
					return "已赞"
				}else{
					return "赞"
				}
			},
			ifCatch: function(){
				return this.articles.only
			}
		},
		watch: {
			//抓取数据延时较高时，确保抓取到数据之后进行一次代码样式的渲染
			ifCatch(){
				this.$nextTick(function(){
					Prism.highlightAll()
				})
			},
			$route(){
				this.fullPath = window.location.href
			}
		},
		methods: {
      pageChange(currentPage) {
        webHttp.request({
          url: '/blog/commentList',
          method: 'POST',
          data: {
            pageNum: currentPage,
						pageSize: 8,
						articleId: this.$route.query.id
          },
          callback: (res) => {
						this.comments = res.list.data
						this.$refs.comment.pageTotal = res.list.totalCount
          }
        })
			},
			login() {
				webHttp.request({
					url: '/blog/login',
					method: 'POST',
					data: {
						phone: this.$refs.login.phone,
						imgCode: this.$refs.login.imgCode
					},
					callback: (res) => {
						if(res.success) {
							this.userInfo = res.userInfo
							localStorage.setItem('userInfo',JSON.stringify(res.userInfo));
							this.$refs.login.close()
						}else{
							if(res.errorType == 'imgCode'){
								this.$refs.login.userInfoErr.imgCode = res.message
							}else if(res.errorType == 'phone'){
								this.$refs.login.userInfoErr.phone = res.message
							}
						}
					}
				})
			},
			register() {
				webHttp.request({
					url: '/blog/register',
					method: 'POST',
					data: {
						name: this.$refs.login.name,
						phone: this.$refs.login.phone,
						imgCode: this.$refs.login.imgCode
					},
					callback: (res) => {
						if(res.success) {
							this.userInfo = res.userInfo
							localStorage.setItem('userInfo',JSON.stringify(res.userInfo));
							this.$refs.login.close()
						}else{
							if(res.errorType == 'imgCode'){
								this.$refs.login.userInfoErr.imgCode = res.message
							}else if(res.errorType == 'name'){
								this.$refs.login.userInfoErr.name = res.message
							}else if(res.errorType == 'phone'){
								this.$refs.login.userInfoErr.phone = res.message
							}
						}
					}
				})
			},
			loginShow() {
				this.$refs.login.visible = true
				this.$refs.login.img_code = 'blog/captcha?rand='+Math.random()
			},
			loginOut() {
				this.userInfo = {name: "",imgUrl: ""}
				localStorage.removeItem('userInfo')
			},
			leaveComment(data) {
				data.title = this.articles.only.title
				webHttp.request({
					url: '/blog/leaveComment',
					method: 'POST',
					data: data,
					callback: (res) => {
						// 评论后更新 "评论数量"
						this.articles.only.commentNum = res.article.commentNum
						this.$refs.comment.sayWords = ''
						this.$refs.comment.$refs.pubButton.value = "发表评论"
						this.comments = res.list.data
						this.$refs.comment.pageTotal = res.list.totalCount
						this.$refs.comment.dialogErr = {show: true,info: "评论成功"}
					}
				})
			},
			commentReply(newReply,commentId) {
				webHttp.request({
					url: '/blog/commentReply',
					method: 'POST',
					data: {
						newReply: newReply,
						commentId: commentId
					},
					callback: (res) => {
						this.$refs.comment.sayWords = ''
						this.$refs.comment.$refs.pubButton.value = "发表评论"
						this.comments = res.list.data
						this.$refs.comment.pageTotal = res.list.totalCount
						this.$refs.comment.dialogErr = {show: true,info: "回复留言成功"}
					}
				})
			},
			love: function(article){// 点赞文章
				if(this.lovedArr.indexOf(article.articleId) !== -1){
					this.$refs.comment.dialogErr = {show: true,info: "您已经赞过此篇文章"}
				}else{
					let title = this.userInfo.name+'在 '+util.getNowFormatDate('yyyy-MM-dd HH:mm')+' 赞了你的文章 ---《'+article.title+'》'
					webHttp.request({
						url: '/blog/likeArticle',
						method: 'POST',
						data: {
							title: title,
							name: this.userInfo.name,
							articleId: article.articleId
						},
						callback: (res) => {
							// 点赞后更新 "点赞数量"
							this.articles.only.likeNum = res.list.likeNum
							this.lovedArr.push(article.articleId)
							localStorage.setItem("articleLoved",JSON.stringify(this.lovedArr))
						}
					})
				}
			},
			jumpPn: function(item){
				this.$router.push({query: {articleTag: item.tag[0],id: item.articleId }})
				webHttp.request({
					url: '/blog/articleShow',
					method: 'POST',
					data: {
						articleId: item.articleId
					},
					callback: (res) => {
						this.articles.only = res.list
						this.pre_next = res.pre_next
					}
				})
			},
			share: function(type,url){
				let	title = "这是一个积累web知识的个人博客",
					el = document.createElement("a"),
					_href,
					_url = window.location.href;
					// _url = window.location.href.split("/articleShow")[0];
				el.target = "_blank"
				switch (type){
					case "QQ" : 
					_href = url + "?title=" + title +"&url=" + _url + "&desc=我分享了一个博客，快来看看哦~" + "&site=克里斯儿的博客"
					break
					case "qzone" : 
					_href = url + "?title=" + title + "&url=" + _url + "&desc=我分享了一个博客，快来看看哦~" + "&site=克里斯儿的博客" + "summary="
					break
					case "sina" : 
					_href = url + "?title=" + title + "&url=" + _url
					break
					case "weixin" : 
					_href = url + "&url=" + _url
					break
					case "douban" : 
					_href = url + "?name=" + title + "&href=" + _url
				}
				el.href = _href
				el.click()
			},
			//微信二维码生成器
			qrcode: function(){
				if(this.qrShow === false){
					this.qrShow = true
					let _url = window.location.href
					new QRCode(document.getElementById("qrcode"),{
					 	text: _url,
					 	width: 160,
					 	height: 160,
					 	colorDark : "#000000",
						colorLight : "#ffffff",
					 	correctLevel : QRCode.CorrectLevel.H
					})
				}	
			},
			//关闭微信二维码
			exitQrcode: function(){
				this.qrShow = false
				document.getElementById("qrcode").innerHTML = ''
			}
		},
		
	}
</script> 
<style lang = "less" scoped>
	.article-show-content{
		background: #FAF7F7;
		color: #404040;
		font-size: 14px;
		line-height: 1.8;
		padding: 15px;
		border-radius: 3px;
		hr{
			margin: 15px 0;
			height: 0;
			border: 0;
			border-top: 1px solid #ccc;
		}
		img{
			max-width: 100%
		}
	}
	.article-title{
		padding: 5px 0;
		color: #16a085;
	}
	.article-body li{
		margin-left: 15px;
	}
	.article-details{
		font-size: 12px;
		line-height: 24px;
		color: #404040;
	}
	.article-details-tag{
		display: flex;
		align-items: center;
	}
	.each-tag{
		margin-right: 8px;
	}
	.icon-tag-stroke,.icon-eye,.icon-clock{
		margin-top: 2px;
	}
	.article-details-other{
		display: flex;
		/*align-items: center;*/
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.i-p{
		margin: 0 5px;
	}
	.article-like{
		background: url("/img/love-before.png") no-repeat;
		width: 50px;
		height: 50px;
		margin: 15px auto;
		cursor: pointer;
		text-align: center;
		transition: all ease 0.5s;
	}
	.love-text{
		display: inline-block;
		user-select: none;
		color: #F7EDED;
		margin-top: 7px;
	}
	.article-like-after{
		transform: rotateY(360deg);
		background: url("/img/love-after.png") no-repeat;
	}
	.article-like-after:hover,.article-like:hover{
		animation: move 1.5s;
	}
	@keyframes move{
		0% {
			transform: scale(1);
		}
		25% {
			transform: scale(1.2);
		}
		50%{
			transform: scale(1);
		}
		75%{
			transform: scale(1.2);
		}
		100%{
			transform: scale(1);
		}
	}
	.article-line{
		height: 2px;
		margin-top: 10px;
		background: #ccc;
	}
	.share a{
		display: inline-block;
		width: 32px;
		height: 32px;
		padding: 1px;
		margin: 0 5px;
		transition: all ease 0.5s;
	}
	.share a:hover{
		opacity: 0.8;
		transform: rotate(360deg);
	}
	.share .design-bg-qq{
		margin: 0 5px 0 0;
		background: url("/img/share.png") 0 0 no-repeat!important;
	}
	.design-bg-qzone{	
		background: url("/img/share.png") -57px 0 no-repeat!important;
	}
	.design-bg-sina{
		background: url("/img/share.png") -118px -71px no-repeat!important;
	}
	.design-bg-douban{
		background: url("/img/share.png") -118px -138px no-repeat!important;
	}
	.design-bg-weixin{
		background: url("/img/share.png") 0 -71px no-repeat!important;
	}
	.qrcode-box{
	 	position: fixed;
	 	z-index: 2000;
		padding: 0 15px 15px 15px;
		border-radius: 15px;
	 	-webkit-transform: translate(-50%, -50%);
    	transform: translate(-50%, -50%);
    	top: 50%;
    	left: 50%;
		background: #ccc;
		
	}
	.qrcode-box span:nth-child(1){
			font-size: 12px;
		};
	#qrcode img{
		margin: 0 auto;
	}
	.exit-qrcode{
		float: right;
		margin-right: 2px;
		cursor: pointer;
	}
	.article-warning{
		h6{
			line-height: 1.2;
			padding: 1px 0 0 5px ;
			display: inline-block;
			border-left: 5px solid orange;
		}
		a{
			display: inline-block;
			color: #404040;
		}
		a:hover{
			text-decoration: underline;
			color: #16a085;
		}
	}
	.pre-next{
		margin-top: 10px;
		h6{
			display: inline-block;

		}
		a{
			color: #404040;

		}
		a:hover{
			color: #16a085;
			text-decoration: underline;
		}
	}
</style>