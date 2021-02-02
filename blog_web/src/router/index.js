import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/home/Home.vue");
const ArticleDetail = () => import("@/views/article_detail/ArticleDetail");
const Category = () => import("@/views/category/Category");
const Node = () => import("@/views/course/Course");
const MessageBoard = () => import("@/views/messageBoard/MessageBoard");
const About = () => import("@/views/about/About");
const Diary = () => import("@/views/diary/Diary");
const Meitu = () => import("@/views/meitu/Meitu");
const SearchResult = () => import("@/views/search_ressult/SearchResult");
const Links = () => import("@/views/links/Links");
const NotFoundComponent = () => import("@/views/404/NotFoundComponent.vue");
const ArticleFile = () => import("@/views/article_file/ArticleFile");

Vue.use(VueRouter);

const routes = [
  {
    redirect: "/web/home",
    path: "/web",
  },
  {
    path: "/web/home",
    component: Home,
  },
  {
    path: "/web/article/:id",
    props: true,
    component: ArticleDetail,
  },
  {
    path: "/web/category/:index",
    component: Category,
    props: true, //路由的动态参数会以props的形式传入
  },
  {
    path: "/web/course",
    component: Node,
  },
  {
    path: "/web/message_board",
    component: MessageBoard,
  },
  {
    path: "/web/about",
    component: About,
  },
  {
    path: "/web/diary",
    component: Diary,
  },
  {
    path: "/web/file/:time",
    component: ArticleFile,
  },
  {
    path: "/web/meitu",
    component: Meitu,
  },
  {
    path: "/web/search/:keyword",
    component: SearchResult,
  },
  {
    path: "/web/links",
    component: Links,
  },
  {
    path: "*",
    component: NotFoundComponent,
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

// 全局路由拦截-进入页面前执行
router.beforeEach((to, from, next) => {
  //解决页面停留
  // chrome
  document.body.scrollTop = 0;
  // firefox
  document.documentElement.scrollTop = 0;

  next();
});

export default router;
