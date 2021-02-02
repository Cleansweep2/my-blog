<template>
  <div class="article-file flex">
    <div  class="left animate__animated animate__slideInLeft">
      <div :key="time + page"  class="animate__animated animate__slideInLeft">
        <ContentDesc class="mt-0" :title="time"/>
        <div class="article-content">
          <CategoryItem
            :class="{'mt-0':i === 0}"
            :item="item" :key="i" v-for="(item, i) in articleList" />
        </div>
      </div>
      <div
        v-if="articleList.length"
        class="pagination flex jc-center">
        <el-pagination
          @current-change="currentChange"
          background
          layout="prev, pager, next"
          :page-size="8"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div :key="time + page + 1" class="right col-right animate__animated animate__fadeInRight">
      <Search />
      <ArticleFile1/>
      <TagCloud />
    </div>
  </div>
</template>

<script>
/**
 * 文章归档列表
 */
import ContentDesc from "@/components/public/ContentDesc";
import CategoryItem from "@/components/category/CategoryItem";
import Search from "@/components/public/Search";
import TagCloud from "@/components/home/TagCloud";
import ArticleFile1 from "@/components/home/ArticleFile";
import dayjs from "dayjs";


export default {
  name: "ArticleFile",
  components: {
    ContentDesc,
    CategoryItem,
    Search,
    TagCloud,
    ArticleFile1
  },
  data() {
    return {
      articleList: [],
      time: "",
      total: 1,
      page:1,
    };
  },
  mounted() {
    const time = this.$route.params.time
    this.time = time
    document.querySelector('title').innerText = this.time
    this.getArticleFile(time,1);
  },
  methods: {
    //当分页改变的时候
    currentChange(page){
      this.page = page
      const time = this.time
      this.getArticleFile(time,page);
    },
    //根据时间获取文章
    async getArticleFile(time,page) {
      const res = await this.$http.get(
        `/crud/article/article_file/${time}/${page}/get`
      );
      const {errCode} = res.data
      if(errCode === 0)
      {
        const result = res.data
        this.total = result.total
        this.articleList = result.data;
      }
    },
  },
  watch: {
    //监控路由的变化
    $route(to, from) {
      const { time } = this.$route.params;
      document.querySelector('title').innerText = this.time
      this.time = time
      this.getArticleFile(time,1);
    },
  },
};
</script>

<style lang="scss">
.article-file {
  width: 100%;
  background-color: #f9f9f9;
}
@media (max-width: 992px) {
  .article-file {
    width: 96%;
  }
}
</style>
