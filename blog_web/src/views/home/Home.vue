<template>
  <div class="home flex">
    <div class="left animate__animated animate__slideInLeft">
      <div class="swiper">
        <Swiper />
      </div>
      <div class="motto-article-items">
        <ContentDesc title="心情语录" />
        <Motto
          :class="{ 'mt-0': i === 0 }"
          :sentence="item"
          :key="item._id"
          v-for="(item, i) in sentenceList"
        />
      </div>
      <div class="recommend-article-items my-card1">
        <ContentDesc title="推荐文章" />
        <Recommend :recommentList="recommentList" />
      </div>
      <div class="new-article-items">
        <ContentDesc title="最新文章" />
        <CategoryItem
          :class="{ 'mt-0': i === 0 }"
          :item="item"
          :key="item.id"
          v-for="(item, i) in newList"
        />
      </div>
      <Loading v-show="isShow" />
      <div class="no-data1" v-show="isShow1">没有更多文章了~</div>
      <div class="up-button" v-if="page > 1 && !isShow && !isShow1">
        <el-button type="primary" @click="pullUpLoading">加载更多</el-button>
      </div>
    </div>
    <div class="right col-right animate__animated animate__fadeInRight">
      <Search />
      <ContactMe />
      <HotArticles />
      <ArticleFile />
      <NewComment />
      <TagCloud />
      <Website />
      <LinkColumn />
    </div>
  </div>
</template>
<script>
//header
import ContentDesc from "@/components/public/ContentDesc";
//推荐文章
import Recommend from "@/components/home/Recommend";
//文章最新
import CategoryItem from "@/components/category/CategoryItem";
//每日一句
import Motto from "@/components/home/Motto";
//轮播图
import Swiper from "@/components/swiper/Swiper";
import Search from "@/components/public/Search";
import HotArticles from "@/components/home/HotArticles";
import Website from "@/components/home/Website";
import ArticleFile from "@/components/home/ArticleFile";
import NewComment from "@/components/home/NewComment";
import TagCloud from "@/components/home/TagCloud";
import ContactMe from "@/components/home/ContactMe";
import LinkColumn from "@/components/home/LinkColumn";
import Loading from "@/components/public/Loading";
export default {
  components: {
    ContentDesc,
    Recommend,
    CategoryItem,
    Swiper,
    Motto,
    Search,
    HotArticles,
    ArticleFile,
    NewComment,
    TagCloud,
    ContactMe,
    Website,
    Loading,
    LinkColumn,
  },
  data() {
    return {
      isShow: false, //加载中
      isShow1: false, //没有更多数据了
      totalPage: 1, //总页数
      page: 1, //当前页数
      newList: [],
      recommentList: [],
    };
  },
  mounted() {
    document.querySelector("title").innerText =
      "少年已老的个人博客,一个不断进步的前端学习者";
    window.addEventListener("scroll", this.scroll);
    this.getNewArticle();
    this.getRecommendList();
  },
  methods: {
    //获取博主推荐文章
    async getRecommendList() {
      const res = await this.$http.get("/crud/article/recommend/get");
      const { errCode } = res.data;
      if (errCode === 0) {
        this.recommentList = res.data.data;
      }
    },
    //按钮上拉加载
    async pullUpLoading() {
      this.page++;
      let page = this.page;
      if (page > this.totalPage) {
        this.isShow = true;
        return setTimeout(() => {
          this.isShow = false;
          this.isShow1 = true;
        }, 500);
      }
      this.isShow = true;
      await this.pullNewArticle(page);
    },
    //上拉加载最新文章列表
    async pullNewArticle(page) {
      const res = await this.$http.get(`/crud/article/new/${page}/get`);
      const { errCode } = res.data;
      if (errCode === 0) {
        const result = res.data.data;
        setTimeout(() => {
          this.isShow = false;
          this.newList = [...this.newList, ...result];
        }, 500);
      }
    },
    //获取最新文章列表
    async getNewArticle() {
      const res = await this.$http.get("/crud/article/new/1/get");
      const { errCode } = res.data;
      if (errCode === 0) {
        this.newList = res.data.data;
        this.totalPage = Math.ceil(res.data.total / 8);
      }
    },
    async scroll() {
      //如果没有更多数据了就停止
      if (this.isShow1 || this.page > 1) {
        return;
      }
      if (this.newList.length < 8) {
        return;
      }
      const body = document.body;
      const html = document.documentElement;
      let scrollTop = html.scrollTop || body.scrollTop;
      let clientHeight = html.clientHeight || body.clientHeight;
      let scrollHeight = html.scrollHeight || body.scrollHeight;
      let width = body.offsetWidth;
      if (width < 992) {
        if (scrollHeight - scrollTop < 350 + clientHeight) {
          this.page = 2;
          this.isShow = true;
          await this.pullNewArticle(2);
        }
      } else {
        if (scrollHeight - scrollTop < 150 + clientHeight) {
          this.page = 2;
          this.isShow = true;
          await this.pullNewArticle(2);
        }
      }
    },
  },
  computed: {
    sentenceList() {
      return this.$store.state.sentenceList;
    },
  },
};
</script>

<style lang="scss">
.vue-swiper {
  display: none;
}
.home {
  width: 100%;
  .motto-article-items {
    margin-top: 20px;
  }
  .selected-article-items {
    margin-top: 20px;
  }
  .recommend-article-items,
  .new-article-items {
    margin-top: 20px;
  }
  .no-data1 {
    margin: 20px;
    font-size: 14px;
    color: #ec4949;
    text-align: center;
  }
  .up-button {
    padding: 10px 0;
    .el-button {
      width: 100%;
    }
  }
}

@media (max-width: 992px) {
  .vue-swiper {
    display: block;
  }
  .home {
    width: 96%;
    justify-content: center;
    .selected-article-items {
      border: none;
      margin-top: 20px;
    }
    .recommend-article-items {
      margin-top: 20px;
      border: none;
    }
    .swiper {
      .swiper-slide {
        width: 100% !important;
        img {
          width: 100%;
          height: 400px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home {
    .swiper {
      .swiper-slide {
        img {
          width: 100%;
          height: 235px;
        }
      }
    }
  }
}

.article-desc-item:nth-last-of-type(1) {
  margin-bottom: 0 !important;
}
</style>
