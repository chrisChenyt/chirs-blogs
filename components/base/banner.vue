<template>
  <el-carousel trigger="click">
    <el-carousel-item v-for="item in banners" :key="item">
      <img v-lazy="item">
    </el-carousel-item>
  </el-carousel>
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
      ]
    }
  }
}
</script>
<style lang="less">
  .el-carousel {
    width: 68.5%;
    float: left;
    border-radius: 3px;
    margin-bottom: 20px;
    .el-carousel__container{
      height: 260px;
      img{
        border-radius: 3px;
        width: 100%;
        height: 260px;
        margin: auto;
      }
    }
  }
	@media screen and (min-width: 1024px) and (max-width: 1199px) {
    .el-carousel img { height: 320px }
  }
  @media only screen and (max-width: 480px) {
    .el-carousel {
      width: 100%;
      .el-carousel__container {
        height: 200px;
        img { height: 200px; }
      }
    }
  }
</style>