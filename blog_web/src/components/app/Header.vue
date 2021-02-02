<template>
  <div ref="header" class="header flex jc-center">
    <div class="header-contains">
      <div class="contains-left">
        <ul class="navbar">
          <li class="nav-item">
            <img src="https://wx2.sbimg.cn/2020/07/24/DO5En.jpg" />
          </li>
          <li class="nav-item" title="首页">
            <router-link to="/web/home">首页</router-link>
          </li>
          <li class="nav-item" title="日记">
            <router-link to="/web/diary">日记</router-link>
          </li>
          <li class="nav-item" title="学习">
            <a>学习</a>
            <ul class="item-dropdown">
              <li title="javascript">
                <router-link tag="div" to="/web/category/1"
                  >JavaScript</router-link
                >
              </li>
              <li title="Node.js">
                <router-link to="/web/category/2" tag="div"
                  >Node.js</router-link
                >
              </li>
              <li title="TyleScript">
                <router-link to="/web/category/3" tag="div"
                  >TypeScript</router-link
                >
              </li>
              <li title="vue">
                <router-link to="/web/category/4" tag="div">vue</router-link>
              </li>
              <li title="react">
                <router-link to="/web/category/5" tag="div">
                  react
                </router-link>
              </li>
              <li title="php">
                <router-link to="/web/category/6" tag="div">php</router-link>
              </li>
              <li title="MySql">
                <router-link to="/web/category/7" tag="div">mysql</router-link>
              </li>
              <li title="mongodb">
                <router-link to="/web/category/8" tag="div"
                  >mongodb</router-link
                >
              </li>
              <li title="mongodb">
                <router-link to="/web/category/9" tag="div">其他</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item" title="美图">
            <router-link to="/web/meitu">美图</router-link>
          </li>
          <li class="nav-item" title="历程">
            <router-link to="/web/course">历程</router-link>
          </li>
          <li class="nav-item" title="友链">
            <router-link to="/web/links">友链</router-link>
          </li>
          <li class="nav-item" title="留言">
            <router-link to="/web/message_board">留言</router-link>
          </li>
          <li class="nav-item" title="关于">
            <router-link to="/web/about">关于</router-link>
          </li>
        </ul>
      </div>
      <div class="contains-right">
        <div class="more h-1">
          <i @click="show" class="icon-weibiaoti6 iconfont"></i>
          <i class="h-tit flex ai-center">
            <img src="https://wx2.sbimg.cn/2020/07/24/DO5En.jpg" />
          </i>
          <i class="icon-sousuo iconfont" @click="SShow"></i>
          <div
            class="search-body animate__slideInUp animate__animated"
            :class="{ dn: isShow }"
          >
            <div class="search-body-in flex ai-center jc-center">
              <el-input
                size="mini"
                v-model="keyword"
                placeholder="输入关键字搜索文章"
                :style="{ width: '70%' }"
              >
              </el-input>
              <el-button @click="search" type="primary">搜索</el-button>
            </div>
          </div>
        </div>
        <div class="row flex ai-center">
          <div title="登录" class="row-logon" v-if="!user.userName">
            <el-button type="text" @click="loginShow"> 登录 </el-button>
          </div>
          <div class="row-register" title="注册" v-if="!user.userName">
            <el-button type="text" @click="regsShow"> 注册 </el-button>
          </div>
          <div class="row-avatar" v-if="user.userName">
            <el-image style="width: 50px; height: 50px" :src="user.avatar">
            </el-image>
          </div>
          <div
            class="row-logout flex ai-center"
            title="操作"
            v-if="user.userName"
          >
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ user.userName
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <!--    移动端头部-->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      size="70%"
    >
      <DrawerContent :user="user" />
    </el-drawer>
  </div>
</template>
<script>
/**
 * APP头部
 */
import DrawerContent from "./DrawerContent";

export default {
  data() {
    return {
      drawer: false,
      isShow: true,
      user: {},
      keyword: "",
    };
  },
  computed: {},
  watch: {
    "$store.state.user.userName": function () {
      this.user = this.$store.state.user;
    },
  },
  mounted() {
    this.$bus.$on("show", () => {
      this.show();
    });
    this.$bus.$on("logout", () => {
      this.logout();
    });
  },
  components: {
    DrawerContent,
  },
  methods: {
    //搜索
    search() {
      const keyword = this.keyword;
      if (!keyword.trim()) {
        return this.$message.info("请输入关键字");
      }
      this.$router.push(`/web/search/${keyword}`);
    },
    logout() {
      this.$confirm("您确定要退出吗?", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$store.commit("logout");
          localStorage.token = "";
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    show() {
      this.drawer = !this.drawer;
    },
    loginShow() {
      this.$bus.$emit("loginShow", "login");
    },
    regsShow() {
      this.$bus.$emit("regsShow", "regs");
    },
    SShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="scss">
.header {
  position: fixed;
  z-index: 9999;
  width: 100%;
  background-color: #fff;
  padding: 5px;
  border-bottom: #e6e6e6 solid 1px;

  .header-contains {
    height: 50px;
    width: 1200px;

    .contains-right {
      float: right;
      height: 100%;

      .row {
        height: 100%;

        .row-register {
          padding-left: 20px;
        }

        .row-logon {
          padding-right: 20px;
        }
        .row-avatar {
          height: 100%;
          padding-right: 20px;
          img {
            &:hover {
              transform: scale(1.2);
            }
          }
        }
        .row-logout {
          padding-left: 20px;
          position: relative;
          height: 100%;
        }
      }

      .more {
        display: none;
        position: relative;

        .search-body {
          position: absolute;
          left: -5px;
          height: 61px;
          border-top: 1px solid #e5e9ef;
          border-bottom: 1px solid #e5e9ef;
          overflow: hidden;
          width: 100vw;
          background-color: #fff;
          border-radius: 0;
          .dn {
            display: none;
          }

          .search-body-in {
            width: 100%;
            height: 100%;
          }

          .el-button {
            height: 55%;
            border-radius: 0;
            line-height: 0;
            display: flex;
            align-items: center;
          }

          .el-input {
            height: 55% !important;

            .el-input__inner {
              border: 1px solid #ccc;
              border-radius: 0;
              height: 100%;
            }
          }
        }

        i {
          height: 100%;
          line-height: 50px;

          &.h-tit {
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            top: 50%;

            img {
              height: 28px !important;
              width: auto !important;
            }
          }

          .img {
            height: 100%;
            width: auto;
          }

          &.icon-sousuo {
            float: right;
            padding-right: 10px;
            font-size: 20px;
          }
        }
      }
    }

    .contains-left {
      height: 100%;
      float: left;
      img {
        height: 28px;
      }
      .navbar {
        height: 100%;
        display: flex;
        margin: 0;
        padding: 0 !important;

        .nav-item {
          height: 100%;
          padding: 0 20px;
          position: relative;
          align-items: center;
          display: flex;
          &:nth-of-type(1) {
            padding-left: 0;
          }
          a {
            height: 100%;
            display: flex;
            align-items: center;
          }

          a:hover + .item-dropdown {
            display: block;
          }

          .item-dropdown {
            display: none;
            border: 1px solid #e5e5e5;
            width: 200px;
            position: absolute;
            top: 50px;
            left: 0px;
            background-color: #fff;

            &:hover {
              display: block;
            }

            li {
              cursor: pointer;

              &:hover {
                background-color: deeppink;
              }

              div {
                padding: 10px 10px 5px 10px;
                border-bottom: 1px solid #e5e5e5;
              }
            }
          }

          a {
            cursor: pointer;
            color: #aaa;

            &:hover {
              color: black;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1220px) {
  .header {
    width: 100%;
    .header-contains {
      display: flex;
      width: 100%;
      .contains-right {
        flex: 1;
        .row {
          justify-content: flex-end;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    .header-contains {
      .contains-right {
        .row {
          display: none;
        }

        .more {
          padding-left: 10px;
          display: block;
        }

        .row-logon {
          display: none;
        }

        .row-register {
          display: none;
        }
      }

      .contains-left {
        display: none;
      }
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
