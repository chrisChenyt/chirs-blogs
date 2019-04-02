<template>
  <div class="banbox">
    <div class="banner">
      <div v-swiper:mySwiper="swiperOption" class="fader">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="banner in banners">
            <img :src="banner">
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banners: [
        '/img/banner_lo.png',
        '/img/banner_wa.png',
        '/img/banner_dao.png',
        '/img/banner_tr.png',
      ],
      swiperOption: {
        loop: true,
        autoplay:true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  }
}
</script>
<style lang="less">
  .banbox {
    width: 68.5%;
    overflow: hidden;
    float: left;
    border-radius: 3px;
    margin-bottom: 20px
  }
  .banner {
    width: 100%;
    overflow: hidden;
    float: left;
  }
  .fader {
    position: relative;
    width: 100%;
    height: 260px;
    font-family: "futura", arial;
    overflow: hidden;
  }
  .fader {
    .swiper-slide {
      img {
        width: 100%;
        height: 260px;
        margin: auto;
      }
    }
  }
  .fader .swiper-pagination {
    height: 26px;
    line-height: 40px;
  }
  .fader .swiper-pagination span {
    border-radius: 10px;
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 7px;
    background: #fff;
    opacity: .9;
    text-indent: -9999px;
    cursor: pointer;
    transition: all 150ms;
  }
  .fader .swiper-pagination .swiper-pagination-bullet-active {
    opacity: 1;
    background: #12b7de;
  }
</style>