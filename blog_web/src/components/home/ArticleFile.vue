<template>
  <div class="article-file- body my-card1 radius">
    <div class="title">文章归档</div>
    <ul class="article-file-items  flex">
      <li
        class="article-file-item"
        :title="item._id"
        :key="i"
        v-for="(item, i) in ArticlefileNum"
      >
        <div class="flex jc-between">
          <router-link
            :to="`/web/file/${item._id}`"
            style="color:#797979"
            >{{ item._id}}</router-link
          >
          <div>[ {{ item.article_file }} 篇 ]</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * 文章归档
 */
import dayjs from "dayjs";
export default {
  name: "AitrcleFile",
  computed: {
    ArticlefileNum() {
      return this.$store.state.ArticlefileNum;
    },
  },
};
</script>

<style lang="scss">
.article-file- {
  background-color: #fff;
  .article-file-items {
    margin-left: 25px;
    margin-right: 10px;
    font-size: 14px;
    color: #409EFF;
    flex-wrap: wrap;
    .article-file-item {
      padding: 5px 0;
      width: 100%;
      a {
        color: #409EFF !important;
        &:hover {
          text-decoration: underline deeppink !important;
        }
      }
    }
  }
}
</style>
