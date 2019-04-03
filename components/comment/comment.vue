<template>
	<div class = "comment">
 		<h2 id="commentTop">说点什么：</h2>
		<div class = "say-box">
			<div v-show ="replyInfo.aite.length">
				<strong>回复：@</strong><span>{{ replyInfo.aite }}</span>
				<span @click ="replyInfo.aite = ''" class = "exit-aite" :title = "'取消回复' + replyInfo.aite" >x</span>
			</div>
			<textarea  v-model="sayWords" @focus="showLogin" placeholder = "这小地盘儿交给你啦 *^_^*"></textarea>
			<div class = "icon-submit-box">
				<div class = "icon-userInfo-box">
					<div @click = "emojiToggle" class = "emoji-icon">
						<img src = "/img/emoji/grinning.png" height = "20px" width = "20px" alt = "" >
					</div>
					<span class = "fence"></span>
					<div class = "reviewer-info" v-show = "!!userInfo.name">
						<img :src = userInfo.imgUrl alt = "" width = "20px" height = "20px">
						<span>{{ userInfo.name }}</span>
						<a href = "javascript: void(0)" @click = "loginOut" >退出</a>
					</div>
				</div>
				<input ref="pubButton" type ="button" value="发表评论" @click="publishComment"/>
			</div>
		</div>
		<div class = "emoji-box" v-show = "emojiShow">
			<span @click = "exitEmoji" class = "emoji-exit">x</span>
			<emoji @select = "selectEmoji" ></emoji>
		</div>
		<div class="all-comments">
			<h2 id="commentsH2">文章评论：</h2>
			<ul>
				<li v-for="item in comments" class = "reviewer-item">
					<div class = "reviewer">
						<div class = "name-img-box">
							<div><img :src='item.imgUrl' alt=""></div>
							<h3>  {{ item.name }}</h3>
						</div>
						<pre><div class = "rev-c" v-html="item.content"></div></pre>
						<div class="rev-details">
							<span class = "icon-clock"></span>
							<span class = "rev-details-time"> {{ item.date }} </span>
							<a href="javascript:void(0)" class="rev-details-reply"><span @click ="rep(item.commentId,item.name)"> 回复 </span></a>
						</div>
					</div>
					<div class="answer" v-if="item.reply.length > 0">
						<ul>
							<li v-for = "reply in item.reply">
								<div class = "name-img-box">
									<div><img :src = reply.imgUrl alt=""></div>
									<h3>  {{ reply.name }}: @{{ reply.aite }}</h3>
								</div>
								<pre><div class = "ans-c" v-html="reply.content"></div></pre>
								<div class = "ans-details">
									<span class = "icon-clock"></span>
									<span class = "ans-details-time"> {{ reply.date }} </span>
									<a href="javascript:void(0)" class="ans-details-reply"><span  @click ="rep(item.commentId,reply.name)" > 回复 </span></a>
								</div>
							</li>
						</ul>
					</div>
				</li>
				<!-- 没有评论时显示 -->
				<li class = "empty-comment" v-if="!comments.length">
					<h3>( >﹏<。)哎~~没人理我</h3>
				</li>
			</ul>
		</div>
		<page :pageTotal='pageTotal' :pageSize='pageSize' @pageChange='pageChange'></page>
		<transition name = "mask" v-show = "dialogErr.show">
			<div class = "mask" v-show = "dialogErr.show"  @click = "dialogErr.show = false">
				<transition name = "dialog">
					<div class = "dialog" @click.stop>
						<h1>o(╯□╰)o</h1>
						<span>{{ dialogErr.info }}</span>
						<div><button @click = "dialogErr.show = false">确定</button></div>
					</div>
				</transition>
			</div>
		</transition>
	</div>
</template>
<script>
	import emoji from "../base/emoji"
	import emojiData from "@/assets/js/emoji-data"
	import page from "../base/page.vue"
	import webHttp from '../../plugins/http.js'
	import util from '../../plugins/utils.js'
	export default {
		data(){
			return {
				sayWords: "",
				content: "",
				emojiShow: false,
				loginType: "",
				dialogErr: {show: false,info: ""},
				replyInfo: {commentId: "",aite: ""},
				pageSize: 8,
				pageTotal: 0
			}
		},
		props: {
			comments: '',
			userInfo: {
				type: Object
			}
		},
		components: {
			emoji, page
		},
		mounted(){
		},
		computed: {
		},
		methods: {
			pageChange(currentPage) {
				let top = document.getElementById("commentsH2").offsetTop-20
				if(document.body.offsetWidth<1024){
					top = top-80
				}
				document.documentElement.scrollTop = top
				document.body.scrollTop = top
				this.$emit('pageChange',currentPage)
			},
			loginOut: function(){
				this.$emit('loginOut')
			},
			selectEmoji: function(emojiCode){
				this.sayWords += emojiCode
				this.emojiShow = false
			},
			publishComment: function(index){// 发表评论
				if(this.validatePub()){
					return
				}
				let content = this.productContent()
				this.$refs.pubButton.value = "发表中..."
				if(this.replyInfo.aite==''&&this.replyInfo.commentId==''){
					let data = {
						name: this.userInfo.name,
						content: content,
						date: util.getNowFormatDate('yyyy-MM-dd HH:mm'),
						imgUrl: this.userInfo.imgUrl,
						articleId: this.$route.query.id
					}
					// 评论文章
					this.$emit('leaveComment',data)
				}else {
					let newReply = {
						aite: this.replyInfo.aite,
						name: this.userInfo.name,
						content: content,
						date: util.getNowFormatDate('yyyy-MM-dd HH:mm'),
						imgUrl: this.userInfo.imgUrl,
						articleId: this.$route.query.id,
						_id: util.generateUUID()
					}
					// 回复评论
					this.$emit('commentReply',newReply,this.replyInfo.commentId)
				}
			},
			validatePub: function(){
				if(!this.userInfo.name&&!this.userInfo.imgUrl){
					// 未登录
					this.$emit('loginShow')
					return true
				}
				if(!this.sayWords.length){
					this.dialogErr = {show: true,info: "内容不能为空"}
					return true
				}
				if(this.sayWords.length > 500){
					this.dialogErr = {show: true,info: "内容过长，请不要超过500个字符"}
					return true
				}
			},
			productContent: function(){
				let emojiObject = {},
				finStr = this.sayWords
				finStr = finStr.replace(new RegExp("<","g"),"&lt")
				finStr = finStr.replace(new RegExp(">","g"),"&gt")
				Object.values(emojiData).forEach((item,index,arr) => {
					emojiObject = Object.assign(emojiObject,item)
				})
				Object.keys(emojiObject).forEach((item) => {
					let path = "/img/emoji/"
					let value = emojiObject[item]
					let imgURL = `<span style = "display: inline-block;vertical-align: middle"><img src=${path}${value} alt="" width = "16px" height = "16px" /></span>`
					finStr = finStr.replace(new RegExp(item,"g"),imgURL)
				})
				return finStr
			},
			emojiToggle: function(){// 表情按钮
				this.emojiShow = !this.emojiShow
			},
			exitEmoji: function(){
				this.emojiShow = false
			},
			rep: function(commentId,name){
				if(!this.userInfo.name&&!this.userInfo.imgUrl){
					// 未登录
					this.$emit('loginShow')
				}else{
					this.replyInfo = {
						commentId: commentId,
						aite: name
					}
				}

				let top = document.getElementById("commentTop").offsetTop-10
				if(document.body.offsetWidth<1024){
					top = top-60
				}
				document.documentElement.scrollTop = top
				document.body.scrollTop = top
			},
			showLogin: function(){
				if(!this.userInfo.name&&!this.userInfo.imgUrl){
					// 未登录
					this.$emit('loginShow')
				}
			}
		}	
	}
</script>
<style lang = "less" scoped >
	li{
		list-style: none
	}
	h2{
		margin-left: 10px;
	}
	.comment{
		background: #fff;
		margin-top: 10px;
		padding: 20px 10px;
		border-radius: 5px;
		font-size: 14px;
		color: #404040;
		h2{
			color: #462C2C;
		} 
	}
	.say-box{
		margin: 10px 10px 5px;
		textarea{
			font-family: "STFangsong";
			resize: none;
			overflow-y: none;
			outline: none;
			font-size: 14px;
			padding: 5px;
			border: none;
			border-radius: 6px;
			box-sizing: border-box;
			width: 100%;
			height: 100px;
			box-shadow: 0 0 10px rgba(0,0,0,.4);
		}
	}
	.icon-submit-box input,.dialog button{
		background: #5bc0de;
		color: #fff;
		padding: 6px 12px;
		border: 1px solid #46b8da;
		border-radius: 4px;
		outline: none;
		cursor: pointer;
	}
	.icon-submit-box input:hover,.dialog button:hover{
		background: #46AFCB;
	}
	.exit-aite{
		margin-left: 5px;
		color: #5bc0de;
		cursor: pointer;
	}
	.emoji{
		border-radius: 5px;
	}
	.emoji-box{
		position: absolute;
		z-index: 500;
		margin-left: 10px;
		margin-top: 2px;
	}
	.emoji-exit{
		float: right;
		margin-right: 25px;
		margin-top: 15px;
		color: red;
		display: inline-block;
		cursor: pointer;
	}
	.icon-submit-box{
		width: 100%;
		margin-top: 8px;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.icon-userInfo-box{
		display: flex;
		justify-content: space-between;
	}
	.reviewer-info{
		display: flex;
		align-items: center;
		margin-top: -5px;
		img{
			margin-left: 20px;
			cursor: pointer;
		}
		span,a{
			cursor: pointer;
			margin-left: 10px;
			font-size: 14px;
			color: #5bc0de;
		}
		span:hover,a:hover{
			color: #46AFCB;
		}
	}
	.emoji-icon{
		img{
			margin-top: 3px;
			cursor: pointer;
		}
	}
	.fence{
		display: inline-block;
		margin-top: 3px;
		margin-left: 5px;
		width: 2px;
		height: 20px;
		background: #D8D8D8;
	}
	.all-comments{
		margin-top: 32px;
		h2{
			margin-bottom: 20px;
			text-align: center;
		}
	}
	.reviewer{
		border: 1px solid #647155;
		border-radius: 10px;
		padding: 10px;
		box-shadow: 0 0 10px rgba(0,0,0,0.4);
		font-family: FangSong;
	}
	.reviewer-item{	
		margin: 10px;
		pre{
			white-space: pre-wrap;
			word-wrap: break-word;
		}
	}
	.name-img-box{
		display: flex;
		align-items: center;
		img{
			border-radius: 18px;
			width: 36px;
			height: 36px;
		}
		h3{
			margin-left: 5px;
		}
	}
	.rev-c,.ans-c{
		vertical-align: middle;
		font-family: FongSong;
		font-size: 14px;
		padding: 0 10px 0 40px;
	}
	.answer{
		margin-left: 50px;
	}
	.answer li{
		border: 1px solid #647155;
		border-radius: 10px;
		padding: 10px;
		box-shadow: 2px 2px 10px rgba(0,0,0,.4);
		font-family: FangSong;
		margin-top: 10px;
	}
	.rev-details,.ans-details{
		display: flex;
		font-family: "微软雅黑";
		font-size: 12px;
		font-weight: 500;
		justify-content: flex-end;
		margin-right: 10px;
		a{
			color: #404040
		}
	}
	.rev-details-time,.rev-details-reply,.ans-details-time,.ans-details-reply{
		margin-right: 15px;
	}
	.mask{
		position: fixed;
		z-index: 1200;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5) /*用opacity会使子元素继承其透明度*/
	}
	.dialog{
		width: 30%;
		height: 200px;
		border-radius: 5px;
		text-align: center;
		box-shadow: 0 0 10px rgba(0,0,0,.6);
		background: #fff;
		margin: 150px auto;
		h1{
			font-size: 40px;
			line-height: 40px;
		}
		span{
			display: inline-block;
			margin-top: 50px;
			color: gold;
		}
		div{
			margin-top: 45px;
		}
	}
	.icon-clock{
	  	margin-top: 4px;
	  	margin-right: 5px;
	}

	.empty-comment{
		display: flex;
		justify-content: center;
		border-radius: 3px;
		padding: 10px;
	}
	.dialog-enter-active,.dialog-leave-active,.mask-enter-active,.mask-leave-active{
		transition: all .5s ease;
	}
	.mask-enter,.mask-leave-to,.dialog-enter,.dialog-leave-to{
		opacity: 0;
	}
	@media screen and(max-width: 767px){
		.say-box textarea{
			width: 100%;
		}
		.icon-submit-box{
			width: 100%;
		}
		.emoji-box{
			width: 92%;
		}
		.comment{
			padding: 20px 5px;
		}
		.reviewer-item{	
			margin: 10px 5px;
		}
		.answer{
			margin-left: 35px;
		}
		.dialog{
			width: 80%;
		}
	}
</style>