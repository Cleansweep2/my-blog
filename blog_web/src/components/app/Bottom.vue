<template>
  <div class="bottom">
    <div class="bottom-content">
      <div class="left flex">
        <div class="wx">
          <img src="https://yanxuan.nosdn.127.net/0fa0b76949cebe844a3a406fa743e3ee.png" />
          <p class="my-wx">我的微信</p>
        </div>
        <div class="qq">
          <img src="https://s1.ax1x.com/2020/07/27/aPFfLn.png" class="flex fc ai-center"/>
          <p class="my-qq">我的QQ</p>
        </div>
      </div>
      <div class="right flex fc">
        <div class="right-title">站点声明</div>
        <div :key="index" v-for="(item, index) in list" class="list-item">
          {{ item }}
        </div>
        <div class="list-item">
          <span class="copyright">Copyright © 2020 </span>鲁ICP备20031783号 - 1
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * APP底部
 */
export default {
  data() {
    return {
      list: [
        "1 、旧游无处不堪寻。无寻处，惟有少年心。",
        "2 、本站的文章均可转载,但要注明本博客地址。",
        "3 、欢迎大家在线撩我。",

      ],
    };
  },
};
</script>

<style lang="scss">
.bottom {
  margin-top: 15px;
  padding: 30px 0;
  width: 100vw;
  z-index: 666;
  border-top: 4px solid #448ef6;
  background-color: #373d41;
  .bottom-content {
    display: flex;
    .left {
      padding-left: 18vw;
      div{
        padding-left: 20px;
      }
      p{
        margin: 0;
        padding: 0;
        text-align: center;
        color: #73777a;
        padding-top: 5px;
      }
      img {
        box-sizing: content-box;
        width: 100px;
        height: 100px;
      }
    }
    .right {
      padding-left: 40px;
      color: #73777a;
      div {
        padding: 5px 0;
      }
      .right-title {
        color: #448ef6;
        font-weight: 500;
        font-size: 16px;
      }
    }
  }
}
@media (max-width: 992px) {
  .bottom {
    .bottom-content {
      display: flex;
      flex-direction: column;
      .left {
        justify-content: center;
        align-items: center;
        padding-left: 0;
        img {
          box-sizing: content-box;
          width: 100px;
          height: 100px;
          padding-left: 0;
        }
        img:nth-of-type(2) {
          padding-left: 20px;
        }
      }
      .right {
        padding-left: 40px;
        padding-top: 20px;
        color: #73777a;
        div {
          padding: 5px 0;
        }
        .right-title {
          color: #00c1de;
          font-weight: 500;
          font-size: 16px;
        }
      }
    }
  }
}

  .copyright{
    padding-right:10px;
  }
</style>
