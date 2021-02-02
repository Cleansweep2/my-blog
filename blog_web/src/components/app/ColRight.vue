<template>
  <div class="col-right">
    <Search />
    <HotArticles/>
    <ArticleFile/>
    <NewComment />
    <TagCloud/>
    <HotArticle/>
    <RecommendColumn />
  </div>
</template>

<script>
  import Search from "../public/Search";
  import HotArticles from "../home/HotArticles";
  import ArticleFile from "../home/ArticleFile";
  import NewComment from "../home/NewComment";
  import TagCloud from "../home/TagCloud";
  import HotArticle from "../home/HotArticles"
  import RecommendColumn from "../home/RecommendColumn";
  export default {
    name: "ColRight",
    components:{
      Search,
      HotArticles,
      ArticleFile,
      NewComment,
      TagCloud,
      HotArticle,
      RecommendColumn
    }
  }
</script>

<style lang="scss">

</style>


