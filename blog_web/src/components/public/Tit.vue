<template>
  <div class="tit">
    <span>{{ tit }}</span>
  </div>
</template>

<script>
export default {
  name: "Tit",
  props: {
    tit: {
      type: String,
      default: "评论",
    },
  },
};
</script>

<style lang="scss" scoped>
.tit {
  margin: 10px 0 30px 0;
  position: relative;
  margin-left: 15px;
  font-size: 16px;
  color: #00c1de;
  &:before {
    content: "";
    position: absolute;
    top: 31px;
    left: -15px;
    width: calc(100% + 10px);
    border-bottom: 1px solid #f0f0f0;
  }
  &:after {
    content: "";
    position: absolute;
    left: -15px;
    width: 5px;
    height: 100%;
    background: #00c1de;
    border-radius: 2.5px;
  }
}
</style>
