<template>
  <div class="search-result flex">
    <div class="left">
      <div  :key="keyword + page" class="my-card1 animate__animated animate__slideInLeft">
      <ContentDesc class="mt-0" :title="`${keyword}  搜索结果`"/>
      <div class="search-result-content">
        <CategoryItem
          :class="{'mt-0':i === 0}"
          :item="item"
          :key="i"
          v-for="(item, i) in searchList"
        />
        <div class="no-data"
             v-if="!searchList.length"
        >
          没有搜索到你想要的内容哦 😊
        </div>
      </div>
    </div>
      <div
        v-if="searchList.length"
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
    <div :key="keyword + page + 1" class="right col-right animate__animated animate__fadeInRight">
      <Search />
      <ArticleFile/>
      <TagCloud />
    </div>
  </div>
</template>

<script>

  import CategoryItem from "@/components/category/CategoryItem";
  import Search from "@/components/public/Search";
  import TagCloud from "@/components/home/TagCloud";
  import ArticleFile from "@/components/home/ArticleFile";
  import ContentDesc from "@/components/public/ContentDesc";
  export default {
    name: "SearchResult",
    components: {
      CategoryItem,
      Search,
      TagCloud,
      ArticleFile,
      ContentDesc
    },
    data(){
      return {
        keyword:'',
        searchList:[],
        total: 1,
        page:1,
      }
    },
    mounted() {
      const {keyword} = this.$route.params
      document.querySelector('title').innerText = '搜索' + keyword
      this.keyword = keyword
      this.getSearchResulut(keyword,1)
    },
    methods:{
      //当分页改变的时候
      currentChange(page){
        this.page = page
        const keyword = this.keyword
        this.getSearchResulut(keyword,page);
      },
      async getSearchResulut(keyword,page){
        const res = await this.$http.get(`/crud/article/${keyword}/${page}/search`)
        const {errCode} = res.data
        if(errCode === 0)
        {
          const result = res.data
          this.total = result.total
          this.searchList = result.data
        }
      }
    },
    watch:{
      $route:function(){
        const {keyword} = this.$route.params
        document.querySelector('title').innerText = '搜索' + keyword
        this.keyword = keyword
        this.getSearchResulut(keyword,1)
      }
    },
  }
</script>

<style lang="scss">
.search-result{
  width: 100%;
}
</style>