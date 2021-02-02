<template>
  <div class="category flex">
    <div class="left">
      <div :key="index"  class=" animate__animated animate__slideInLeft">
        <ContentDesc
          class="mt-0"
          :title="category_name"
        />
        <div class="category-content">
          <CategoryItem
            :class="{'mt-0':i === 0}"
            :item="item"
            :key="i"
            v-for="(item, i) in categoryList"
          />
          <div class="no-data"
               v-if="!categoryList.length"
          >
            {{category_name}} 分类暂时没有内容哦 😊
          </div>
        </div>
      </div>
      <div
        v-if="categoryList.length"
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
    <div :key="index + 100" class="right col-right animate__animated animate__fadeInRight">
      <Search />
      <RecommendColumn :recommendList="recommendList" />
      <TagCloud />
    </div>
  </div>
</template>

<script>
import CategoryItem from "@/components/category/CategoryItem";
import Search from "@/components/public/Search";
import RecommendColumn from "@/components/home/RecommendColumn";
import TagCloud from "@/components/home/TagCloud";
import ContentDesc from "@/components/public/ContentDesc";
export default {
  name: "Category",
  data() {
    return {
      type: 0,
      i: 0,
      categoryList: [],
      recommendList: [],
      total: 1,
      page:1,
      index:0,
      category_name:''
    };
  },
  components: {
    CategoryItem,
    Search,
    RecommendColumn,
    TagCloud,
    ContentDesc
  },
  computed: {
    tagList() {
      return this.$store.state.tagList;
    },
  },
  watch: {
    //监控路由的变化
    $route(to, from) {
      this.getData()
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    //获取推荐和分类的数据
    getData(){
      const { index } = this.$route.params;
      console.log(index)
      const {id,tag_name} = this.$store.state.tagList[index - 1]
      this.category_name = tag_name
      document.querySelector('title').innerText = tag_name
      this.index = index
      this.id = id
      this.getCategory(id);
      this.getRecommend(id);
    },
    //当分页改变的时候
    currentChange(page){
      this.page = page
      const id = this.id
      this.getCategory(id);
    },
    //获取分类文章列表
    async getCategory(id) {
      const page = this.page
      const res = await this.$http.get(`/crud/article/category/${id}/${page}/get`);
      console.log(res)
      const {errCode} = res.data
      if(errCode === 0)
      {
        const result = res.data;
        this.total = result.total;
        this.index = this.index + page
        this.categoryList = result.data;
      }
    },
    //获取侧边栏推荐列表
    async getRecommend(id) {
      const res = await this.$http.get(`/crud/article/${id}/recommend/get`);
      const {errCode} = res.data
      if(errCode === 0)
      {
        this.recommendList = res.data.data;
      }
    },
  }
};
</script>

<style lang="scss">
.category {
  width: 100%;
  .category-item:nth-of-type(1) {
    border-top: none;
  }
}
@media (max-width: 992px) {
  .category {
    width: 96%;
  }
}
</style>
