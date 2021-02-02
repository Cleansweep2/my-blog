<template>
  <div id="app">
    <!-- 头部 -->
    <Header />
    <div class="content flex fc ai-center">
      <div class="content-main flex jc-center">
        <!--主内容-->
        <router-view />
      </div>
    </div>
    <!--    底部-->
    <Bottom />
    <GoTop />
    <!--    登录-->
    <div class="login" @click="cancleOut($event)" v-if="LoginIsShow">
      <Login />
    </div>
    <!--      注册-->
    <div class="register" @click="cancleOut($event)" v-if="RegisterIsShow">
      <Register />
    </div>
    <!-- 打赏-->
    <div class="reward" @click="cancleOut($event)" v-if="rewardIsShow">
      <Reward />
    </div>
  </div>
</template>
<script>
//头部
import Header from "@/components/app/Header";
//底部
import Bottom from "@/components/app/Bottom";
import ColRight from "@/components/app/ColRight";
//回到顶部
import GoTop from "@/components/app/GoTop";
//移动端导航栏
import DrawerContent from "@/components/app/DrawerContent";
//登录
import Login from "@/components/app/Login";
//注册
import Register from "@/components/app/Register";
import Reward from "@/components/app/Reward";
export default {
  components: {
    Header,
    Bottom,
    ColRight,
    GoTop,
    DrawerContent,
    Login,
    Register,
    Reward,
  },
  data() {
    return {
      drawer: false,
      LoginIsShow: false,
      RegisterIsShow: false,
      rewardIsShow: false,
      path: "",
      num1: "",
    };
  },
  mounted() {
    this.verifyToken();
    this.$store.dispatch("getTag");
    this.$store.dispatch("getCourse");
    this.$store.dispatch("getArticleFileNum");
    this.$store.dispatch("getSentenceList");
    this.$store.dispatch("getSwiper");
    this.$store.dispatch("getArticleCount");
    this.$store.dispatch("getLinkList");
    //在header显示login
    this.$bus.$on("loginShow", (type) => {
      this.isShow(type);
    });
    //在header隐藏login
    this.$bus.$on("regsShow", (type) => {
      this.isShow(type);
    });
    //隐藏
    this.$bus.$on("cancle", (type) => {
      this.cancle(type);
    });
  },
  methods: {
    //验证登录是否延时
    async verifyToken() {
      const { token } = localStorage;
      if (!token) return;
      const res = await this.$http.post(
        "/user/verify",
        {},
        {
          headers: {
            token,
          },
        }
      );
      const { errCode, user } = res.data;
      console.log(errCode);
      if (errCode === 0) {
        this.$store.commit("verify", user);
      } else if (errCode === 7) {
        this.$store.commit("logout");
      }
    },
    //隐藏登录页 或者 注册页 点击空白黑色区域
    cancleOut(e) {
      const target = e.target;
      const className = target.className;
      if (className === "login") {
        this.LoginIsShow = false;
      } else if (className === "register") {
        this.RegisterIsShow = false;
      } else if (className === "reward") {
        this.rewardIsShow = false;
      }
    },
    cancle(type) {
      if (type === "login") {
        this.LoginIsShow = false;
      } else if (type === "reward") {
        this.rewardIsShow = false;
      } else {
        this.RegisterIsShow = false;
      }
    },
    //隐藏显示侧边栏
    drawerShow() {
      this.drawer = !this.drawer;
    },
    //显示注册 或者 登录页
    isShow(type) {
      if (type === "login") {
        this.LoginIsShow = true;
      } else if (type === "reward") {
        this.rewardIsShow = true;
      } else {
        this.RegisterIsShow = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/base.scss";
.show {
  animation: show 1.5s linear;
  z-index: 999;
}
@keyframes show {
  0% {
    transform: translateY(0%);
    opacity: 1;
    font-size: map-get($size, sz-6) * $base-size;
  }
  100% {
    transform: translateY(-1000%);
    opacity: 0;
    font-size: map-get($size, sz-2) * $base-size;
  }
}
.el-drawer__wrapper {
  z-index: 99999 !important;
  .el-drawer {
    .el-drawer__body {
      outline: none;
    }
  }
}
#app {
  background-color: #f9f9f9;
  height: auto;
  .login,
  .register,
  .reward {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(68, 68, 68, 0.5);
    z-index: 9999999;
    .login-cot,
    .register-cot {
      position: fixed;
      top: 50vh;
      left: 50%;
      width: 350px;
      transform: translate(-50%, -50%);
    }
  }
  .content {
    padding-bottom: 10px;
    width: 100vw;
    .content-main {
      margin-top: 87px; //87px
      width: 1200px;
      min-height: calc(100vh - 110px);
      .left {
        flex: 1;
      }
      .right {
        width: 360px;
        padding: 0 0 0 20px;
      }
    }
  }
}
@media (max-width: 1220px) {
  #app {
    .content {
      .content-main {
        width: 98vw;
      }
    }
  }
}
@media (max-width: 992px) {
  #app {
    .content {
      .content-main {
        width: 100vw;
        margin-top: 77px;
        .left {
          width: 96vw;
          justify-content: center;
        }
        .right {
          display: none;
          padding: 0px 0px;
        }
      }
    }
  }
}
</style>
