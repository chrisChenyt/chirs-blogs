<template>
	<article>
    <div id="resources_container">
      <a class="resources_item" target="_blank" href="https://www.html.cn/jqapi-1.9/">
        <div>
          <img v-lazy="lazyimg.jquery">
        </div>
        <div>
          <h3>jQuery API 中文文档</h3>
          <p> 适用jQuery 1.0 – jQuery 3.1，翻译至官方文档，并且跟随官方文档持续更新。</p>
        </div>
      </a>
      <a class="resources_item" target="_blank" href="https://www.html.cn/book/css/">
        <div>
          <img v-lazy="lazyimg.css3">
        </div>
        <div>
          <h3>CSS3参考手册</h3>
          <p> web前端开发参考手册系列之CSS参考手册</p>
        </div>
      </a>
      <a class="resources_item" target="_blank" href="https://www.html.cn/doc/sass/">
        <div>
          <img v-lazy="lazyimg.sass">
        </div>
        <div>
          <h3>Sass 中文文档</h3>
          <p>  Sass 是一个 CSS 的扩展，它在 CSS 语法的基础上，允许您使用变量 (variables), 嵌套规则 (nested rules), 混合 (mixins), 导入 (inline imports) 等功能，令 CSS 更加强大与优雅。使用 Sass 以及 Compass 样式库 有助于更好地组织管理样式文件，以及更高效地开发项目。</p>
        </div>
      </a>
      <a class="resources_item" target="_blank" href="https://www.html.cn/doc/less/">
        <div>
          <img v-lazy="lazyimg.less">
        </div>
        <div>
          <h3>Less 中文文档</h3>
          <p>  Less 是一个Css 预编译器,意思指的是它可以扩展Css语言,添加功能如允许变量(variables),混合(mixins),函数(functions) 和许多其他的技术，让你的Css更具维护性，主题性，扩展性。</p>
        </div>
      </a>
      <a class="resources_item" target="_blank" href="http://bootstrap.html.cn/">
        <div>
          <img v-lazy="lazyimg.bootstrap">
        </div>
        <div>
          <h3>Bootstrap 中文文档</h3>
          <p> Bootstrap 是最流行的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。</p>
        </div>
      </a>
    </div>
	</article>
</template>
<script>
export default {
  data(){
    return{
      lazyimg:{
        jquery: "/img/jquery.png",
        css3: "/img/css3.png",
        sass: "/img/sass.png",
        less: "/img/less.png",
        bootstrap: "/img/bootstrap.png"
      }
    }
  }
}
</script>
<style lang="less" scoped>
  #resources_container{
    background: #fff;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    .resources_item{
      display: flex;
      justify-content: left;
      width: 45%;
      height: 102px;
      >div:nth-child(1){
        img{
          display: block;
          height: 80px;
          width: 80px;
          background: #FFF;
          margin: 10px;
          border-radius: 15px;
          border: 1px solid #f1f1f1;
        }
      }
      >div:nth-child(2){
        h3{
          text-shadow: 0px 1px 1px #FFF;
          padding-top: 15px;
          font-size: 14px;
          color: #444;
        }
        p{
          color: #888;
          font-size: 12px;
          margin-top: 10px;
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box; 
          /* autoprefixer: ignore next */
          -webkit-box-orient: vertical;
          -webkit-line-clamp:2; 
        }
      }
    }
  }
  //手机端
  @media screen and (max-width: 767px){
    #resources_container{
      .resources_item{
        width: 100%;
        img{
          width: 55px;
          height: 55px;
        }
        >div{
          h3{
            padding-top: 10px;
          }
          p{
            margin-top: 0;
          }
        }
      }
    }
  }
  //平板
  @media screen and (min-width: 768px){
    #resources_container{
      .resources_item{
        img{
          width: 55px;
          height: 55px;
        }
        >div{
          h3{
            padding-top: 10px;
          }
          p{
            margin-top: 0;
          }
        }
      }
    }
  }
  //小屏幕pc端
  @media screen and (min-width: 992px) {
    #resources_container{
      .resources_item{
        img{
          width: 70px;
          height: 70px;
        }
        >div{
          h3{
            padding-top: 13px;
          }
          p{
            margin-top: 5px;
          }
        }
      }
    }
  }
  //大屏幕pc端
  @media screen and (min-width: 1200px){
    #resources_container{
      .resources_item{
        img{
          width: 80px;
          height: 80px;
        }
        >div{
          h3{
            padding-top: 15px;
          }
          p{
            margin-top:15px;
          }
        }
      }
    }
  }
</style>
