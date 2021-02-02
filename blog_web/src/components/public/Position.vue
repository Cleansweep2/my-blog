<template>
  <div
    :style="{'background-image': `url(${bgc})`}"
    class="position flex fc jc-center my-card1">
    <p class="category-tit" :class="{cor:isShow}">{{ category }}</p>
  </div>
</template>

<script>
export default {
  name: "Position",
  data() {
    return {};
  },
  props: {
    category: {
      type: String,
      default: "前端知识",
    },
    bgc:{
      type:String,
      default:''
    },
    isShow:{
      type:Boolean,
      default:false
    }
  },
  mounted() {},
};
</script>

<style lang="scss">
.position {
  background-color: #fff;
  width: 100%;
  height: 80px;
  background-size: cover;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  p {
    margin: 0;
  }
  .category-tit {
    color: #444;
    font-size: 25px;
    font-weight: 500;
    padding: 5px 0;
  }
  .cor{
    color: #fff;
  }
}

@media (max-width: 768px) {
  .position {
    height: 50px;
    border-bottom: 1px solid #eaeaea;
    .category-tit {
      font-size: 20px;
    }
  }
}
</style>
