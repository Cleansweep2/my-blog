<template>
  <div class="swiper1">
    <el-carousel :loop="true" :interval="3000">
      <el-carousel-item v-for="item in $store.state.swiperList" :key="item._id">
        <img v-lazy="item.imgUrl" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
/**
 * 轮播图
 */

export default {
  name: "Swiper",

};
</script>

<style lang="scss">

  .swiper1{
    width: 100%;
  }

.el-carousel {
  height: 430px;
  .el-carousel__container {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

@media (max-width: 1220px) {
  .el-carousel {
    width: 100%;
    img {
      height: auto;
    }
  }
}

@media (max-width: 768px) {
  .el-carousel {
    height: 330px;
    img {
      height: 100%;
    }
  }
}

@media (max-width: 480px) {
  .el-carousel {
    height: 188px;
    img {
      height: 100%;
    }
  }
}



</style>
