import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    info: "",
    sentenceList: {},
    swiperList: [],
    diaryList: [],
    tagList: [],
    ArticlefileNum: [],
    courseList: [],
    linkList: [],
    user: { userName: "" },
    articleCount: 0,
  },
  mutations: {
    setValue(state, payload = {}) {
      const { key, value } = payload;
      state[key] = value;
    },
    //注册后往全局用户信息
    register(state, user) {
      state.user = user;
    },
    //登录后全局信息
    login(state, user) {
      state.user = user;
    },
    //验证后全局用户信息
    verify(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = {};
      localStorage.token = "";
    },
  },
  actions: {
    //注册 //获取信息

    //登录
    async getUserInfo(context) {
      const res = await Vue.prototype.$http.get("/crud/info/get");
    },
    async getInfo(context) {
      const res = await Vue.prototype.$http.get("/crud/info/get");
      const { errCode } = res.data;
      if (errCode === 0) {
        const info = res.data.data.content;
        context.commit("setValue", {
          key: "info",
          value: info,
        });
      }
    },
    //获取每日一句
    async getSentenceList(context) {
      const res = await Vue.prototype.$http.get("/crud/sentence/get");
      const { errCode } = res.data;
      if (errCode === 0) {
        const sentenceList = res.data.data;
        context.commit("setValue", {
          key: "sentenceList",
          value: sentenceList,
        });
      }
    },

    //获取轮播图
    async getSwiper(context) {
      const res = await Vue.prototype.$http.get("/crud/image/首页/get");
      const { errCode } = res.data;
      if (errCode === 0) {
        const swiperList = res.data.data;
        context.commit("setValue", {
          key: "swiperList",
          value: swiperList,
        });
      }
    },

    //获取
    async getDiary(context) {
      const res = await Vue.prototype.$http.get("/crud/diary/get");
      const diaryList = res.data.data;
      const { errCode } = res.data;
      if (errCode === 0) {
        context.commit("setValue", {
          key: "diaryList",
          value: diaryList,
        });
      }
    },

    //获取标签列表
    async getTag(context) {
      const res = await Vue.prototype.$http.get("/crud/tag/get");
      const { errCode } = res.data;
      if (errCode === 0) {
        const tagList = res.data.data;
        context.commit("setValue", {
          key: "tagList",
          value: tagList,
        });
      }
    },

    //获取文章归档数量
    async getArticleFileNum(context) {
      const res = await Vue.prototype.$http.get(
        "/crud/article/article_file_num/get"
      );
      const { errCode } = res.data;
      if (errCode === 0) {
        const ArticlefileNum = res.data.data;
        context.commit("setValue", {
          key: "ArticlefileNum",
          value: ArticlefileNum,
        });
      }
    },
    //时间轴
    async getCourse(context) {
      const res = await Vue.prototype.$http.get("/crud/course/get");
      const { errCode } = res.data;
      if (errCode === 0) {
        const courseList = res.data.data;
        context.commit("setValue", {
          key: "courseList",
          value: courseList,
        });
      }
    },
    //文章获取数量
    async getArticleCount(context) {
      const res = await Vue.prototype.$http.get("/crud/article/count/get");
      const { errCode } = res.data;
      if (errCode === 0) {
        const articleCount = res.data.count;
        context.commit("setValue", {
          key: "articleCount",
          value: articleCount,
        });
      }
    },
    //获取友链
    async getLinkList(context) {
      const res = await Vue.prototype.$http.get("/crud/link/get");
      const { errCode } = res.data;
      if (errCode === 0) {
        const linkList = res.data.data;
        context.commit("setValue", {
          key: "linkList",
          value: linkList,
        });
      }
    },
  },
  modules: {},
});
