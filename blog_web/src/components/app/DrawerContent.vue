<template>
  <div class="drawer-content"
  >
      <router-link
        @click.native="handleClick"
        tag="div"
        to="/web/home"
        class="drawer-content-item">
        首页
      </router-link>
      <router-link
        @click.native="handleClick"
        tag="div"
        to="/web/diary"
        class="drawer-content-item">
         日记
      </router-link>
      <div
           class="drawer-content-item-
           item-menu">
        <div class="menu"
             :class="{active:show}"
             @click="showMenu"
        >学习</div>
        <div class="child-items"
             :class="{showMenu:show}"
        >
          <router-link
            tag="div"
            @click.native="handleClick"
           to="/web/category/1"
           class="drawer-content-item
           child">
            javascript
          </router-link>
          <router-link
            tag="div"
            @click.native="handleClick"
            to="/web/category/2"
            class="drawer-content-item child">
            Node.js
          </router-link>
          <router-link
            tag="div"
            @click.native="handleClick"
            to="/web/category/3"
            class="drawer-content-item child">
            TypeScript
          </router-link>
          <router-link
            tag="div"
            @click.native="handleClick"
            to="/web/category/4"
            class="drawer-content-item
             child">
            vue
          </router-link>
          <router-link
            tag="div"
            @click.native="handleClick"
            to="/web/category/5"
            class="drawer-content-item
            child">
            react
          </router-link>
          <router-link
            tag="div"
            @click.native="handleClick"
            to="/web/category/6"
            class="drawer-content-item
             child">
            php
          </router-link>
          <router-link
            tag="div"
            @click.native="handleClick"
            to="/web/category/7"
            class="drawer-content-item
             child">
            MySql
          </router-link>
          <router-link
            tag="div"
            @click.native="handleClick"
            to="/web/category/8"
            class="drawer-content-item
             child">
            mongodb
          </router-link>
          <router-link
            tag="div"
            @click.native="handleClick"
            to="/web/category/9"
            class="drawer-content-item
             child">
            其他
          </router-link>
        </div>
      </div>
    <router-link
      tag="div"
      @click.native="handleClick"
      to="/web/meitu"
      class="drawer-content-item">
      美图
    </router-link>
      <router-link
        tag="div"
        @click.native="handleClick"
        to="/web/course"
        class="drawer-content-item">
        历程
      </router-link>
    <router-link
      tag="div"
      @click.native="handleClick"
      to="/web/links"
      class="drawer-content-item">
      友链
    </router-link>
      <router-link
        tag="div"
        @click.native="handleClick"
        to="/web/message_board"
        class="drawer-content-item">
        留言
      </router-link>
      <router-link
        tag="div"
        @click.native="handleClick"
         to="/web/about"
         class="drawer-content-item">
        关于
      </router-link>
    <div
      @click="login"
      v-if="!user.userName"
      class="drawer-content-item">
      登录
    </div>
    <div
      @click="register"
      v-if="!user.userName"
      class="drawer-content-item">
      注册
    </div>
    <div class="drawer-content-item user flex ai-center"
         v-if="user.userName"
    >
      <div class="my-card1">
        <el-image  style="width: 50px; height: 50px" :src="user.avatar">
        </el-image>
      </div>
      <div class="info flex fc jc-between"
      >
        <div class="info-name">
          <i class="icon-yonghuming iconfont"></i> {{user.userName}}
        </div>
        <div
          @click="logout"
          class="">
          <i class="iconfont icon-ai-out"></i>
          退出
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 移动端侧边栏
   */
  export default {
    name: "DrawerContent",
    props:{
      user:{
        type:Object,
        default(){
          return {

          }
        }
      }
    },
    data(){
      return {
        show:false,
      }
    },
    methods:{
      showMenu(){
        this.show = !this.show
      },
      logout(){
        this.$bus.$emit('logout')
      },
      login(){
        this.$bus.$emit('loginShow','login')
        this.$bus.$emit('show')
      },
      register(){
        //在header隐藏login
        this.$bus.$emit('regsShow','register')
        this.$bus.$emit('show')
      },
      handleClick(){
        this.$bus.$emit('show')
      }
    }
  }
</script>

<style lang="scss">

  .drawer-content{
    color: #777;
    .drawer-content-item,.drawer-content-item-{
      padding: 13.75px 0px 13.75px 20px;
      border-bottom: 1px solid rgba(0,0,0,.1);
      &:nth-last-of-type(-n+2){
        color: #333;
      }
      &.user{
        background-color:#f9f9f9;
        img{
          border-radius: 5px;
        }
        .info{
          padding-left: 40px;
          div{
            padding: 5px 0;
          }
        }
      }
    }
    .item-menu{
      padding: 0;
      .menu{
        /*262.5*/
        padding: 13.75px 0px 13.75px 20px;
      }
    }
    .child-items{
      height: 0;
      overflow: hidden;
      transition: all .5s;
      .child{
        padding: 0 0 0 40px;
        height: 28px;
        line-height: 30px;
        border-bottom: none;
      }
    }
    .showMenu{
      height:252px;
    }
  }

  .drawer-content-item:active{
    background-color:#409EFF;
    color: #fff;
  }

  .active{
    background-color:#409EFF;
  }

</style>