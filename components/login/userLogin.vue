<template>
  <div>
    <transition name="vux-mask">
      <div class="c-mask" @touchmove.prevent="touchmove" v-show="visible" v-on:click="close">
      </div>
    </transition>
    <transition name="vux-dialog">
      <div class="loginCon" v-show="visible">
				<div class = "self-login">
					<img class ="exit-login-box" src="../../assets/img/close.png" @click="close">
					<ul class="login_tab">
						<li @click="tabRight=false" :class="{'tab_select': !tabRight}">登录</li>
						<li @click="tabRight=true" :class="{'tab_select': tabRight}">注册</li>
						<span :class="{'tab_right': tabRight}"></span>
					</ul>
					<div class ="design-name" v-show="tabRight">
						<input type="text" placeholder="请输入昵称" v-model="name" @focus="userInfoErr.name = '' ">
					</div>
					<div class = "name-info" v-show="tabRight">{{userInfoErr.name}}</div>
					<div class = "phone">
						<input type="tel" maxlength="11" placeholder="请输入手机号" v-model="phone" @focus="userInfoErr.phone = '' ">
					</div>
					<div class = "phone-info">{{userInfoErr.phone}}</div>
					<div class = "imgCode">
						<input type="tel" maxlength="4" placeholder="请输入图形验证码" v-model="imgCode" @focus="userInfoErr.imgCode = '' ">
						<img :src="img_code" @click="img_code = 'blog/captcha?rand='+Math.random();">
					</div>
					<div class = "code-info">{{userInfoErr.imgCode}}</div>
					<div class = "optbox">
						<button @click="login" v-show="!tabRight">登录</button>
						<button @click="register" v-show="tabRight">注册</button>
					</div>
				</div>
      </div>
    </transition>
  </div>
</template>
<script>
	import util from '../../plugins/utils.js'
	import webHttp from '../../plugins/http.js'
  export default {
		data() {
			return {
				visible: false,
				userInfoErr: {name: "",phone: "",imgCode: ""},
				name: '',
				phone: '',
				imgCode: '',
				img_code: 'blog/captcha?rand='+Math.random(),
				tabRight: false
			}
		},
    props: {
    },
    methods: {
      login () {
				if (!util.checkMobile(parseInt(this.phone))) {//手机号格式是否正确
          this.userInfoErr.phone = '请填写正确手机号'
        } else if(this.imgCode == ''){
          this.userInfoErr.imgCode = '请填写验证码'
				}else{
					this.userInfoErr = {name: "",phone: "",imgCode: ""}
					this.$emit('login')
				}
      },
      register () {
				if(this.name == ''){
					this.userInfoErr.name = '请填写昵称'
				}else if (this.name.length>22){
					this.userInfoErr.name = "喔唷~昵称最长22位...换一个试试？"
				}else if (!util.checkMobile(parseInt(this.phone))) {//手机号格式是否正确
          this.userInfoErr.phone = '请填写正确手机号'
        }else if(this.imgCode == ''){
          this.userInfoErr.imgCode = '请填写验证码'
				}else{
					this.userInfoErr = {name: "",phone: "",imgCode: ""}
					this.$emit('register')
				}
      },
      touchmove () {
				return false
			},
			close() {
				this.visible=false
				this.tabRight = false
				this.userInfoErr = {name: "",phone: "",imgCode: ""}
				this.name = ''
				this.phone = ''
				this.imgCode = ''
			}
		},
		watch: {
			tabRight(){
				this.userInfoErr = {name: "",phone: "",imgCode: ""}
				this.name = ''
				this.phone = ''
				this.imgCode = ''
			}
		}
  }
</script>
<style lang='less'>
  .c-mask {
		position: fixed;
		left: 0;
    top: 0;
		right: 0;
		bottom: 0;
    background:rgba(0,0,0,0.5);
    filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7F000000,endcolorstr=#7F000000);
    z-index: 10000;
	}
	.loginCon{
		z-index: 10001;
		width: 100%;
		padding: 0 56px;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%,-50%,0);
	}
	.exit-login-box{
		position: absolute;
		top: 5px;
		right: 5px;
		cursor: pointer;
		width: 20px;
		height: 20px;
	}
	
	.self-login{
		position: relative;
		padding: 30px 30px 15px 30px;
		margin: 0 auto;
		width: 260px;
		background: #fff;
		input{
			height: 24px;
			font-size: 14px;
			flex-shrink: 1; /*空间不足等比缩放*/
			width: 100%;
			border: 1px solid #ccc;
			padding: 3px;
			border-radius: 5px;
			outline: none;
		}
	}
	.login_tab{
		display: flex;
		position: relative;
    padding-bottom: 6px;
    margin-bottom: 15px;
		li{
			width: 50%;
			text-align: center;
			font-size: 16px;
			cursor: pointer;
		}
		.tab_select{
			font-weight: 600;
		}
		span{
			display: inline-block;
			width: 50%;
			height: 2px;
			background: #46AFCB;
			position: absolute;
			bottom: 0;
			left: 0;
			transition: left 0.5s;
		}
		.tab_right{
			left: 50%;
		}
	}
	.design-name,.phone{
		display: flex;
		align-items: center;
		margin-top: 16px;
		flex-shrink : 1;
	}
	.name-info,.phone-info,.code-info{
		position: absolute;
		left: 40px;
		font-size: 12px;
		color: red;
	}
	.imgCode{
		display: flex;
		align-items: center;
		margin-top: 16px;
		flex-shrink : 1;
		input{
    	margin-right: 10px;
		}
		img{
			cursor: pointer;
    	background: #f1f1f1;
		}
	}
	.optbox{
		display: flex;
		justify-content: flex-end;
		margin-top: 15px;
	}
	.optbox button{
		background: #5bc0de;
		color: #fff;
		padding: 6px 12px;
		border: 1px solid #46b8da;
		border-radius: 4px;
		outline: none;
		cursor: pointer;
	}
	.optbox button:last-child{
		margin-left: 10px;
	}
	.optbox button:hover{
		background: #46AFCB;
	}

  /*
  * animation
  */
  .vux-dialog-enter-active,.vux-dialog-leave-active {
    opacity: 1;
    transition-duration: 400ms;
    transform: translate(-50%, -50%) scale(1)!important;
    transition-property: transform, opacity!important;
  }

  .vux-dialog-enter, .vux-dialog-leave-active {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.185)!important;
  }

  .vux-mask-enter, .vux-mask-leave-active {
    opacity: 0;
  }
  .vux-mask-leave-active, .vux-mask-enter-active {
    transition: opacity 300ms;
  }

</style>
