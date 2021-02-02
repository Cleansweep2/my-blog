<template>
  <div class="article-index my-card1">
    <div class="title">
      目录
    </div>
    <ul class="article-items">
      <li
        class="item"
        :key="i"
        v-for="(item, i) in hs"
        @click="to(item.offTop)"
        :class="{ 'item-h4': item.name == 'H4' }"
      >
        <div>
          {{ item.val }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * 文章索引
 */
export default {
  name: "ArticleIndex",
  data() {
    return {
      hs: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.getIndex();
    }, 500);
  },
  methods: {
    to(offTop) {
      window.scrollTo(0, offTop);
    },
    getIndex() {
      const h = document.querySelectorAll(".article-content-main h2,h4");
      const hs = [];
      h.forEach((v) => {
        hs.push({
          name: v.nodeName,
          val: v.innerText,
          offTop: v.offsetTop - 60,
        });
        this.hs = hs;
      });
    },
  },
};
</script>

<style lang="scss">
.article-index {
  width: 100%;
  padding: 5px 10px 10px 10px;
  background-color: #fff;
  margin-top: 20px;
  .title {
    padding: 10px 0;
    font-size: 18px;
  }
  .article-items {
    .item {
      margin-left: 20px;
      margin-bottom: 8px;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        width: 5px;
        height: 5px;
        background-color: black;
        left: -15px;
        top: 7px;
      }
      div {
        cursor: pointer;
        color: #666;
        font-size: 14px;
        &:hover {
          color: deeppink;
          text-decoration: underline !important;
          text-decoration-color: deeppink !important;
        }
      }
    }
  }
}

.item-h4 {
  margin-left: 60px !important;
  &:after {
    width: 5px !important;
    height: 5px !important;
    background-color: #fff !important;
    border: 1px solid black !important;
  }
}

@media (max-width: 992px) {
  .article-index{
    margin-top: 0;
    padding: 5px 0 10px 0;
    border-bottom: 1px solid #f0f0f0;
    &.my-card1{
      box-shadow:none;
    }
    .title{
      font-size: 16px;
    }
  }
}
</style>
