<template>
  <div>
    <a @click="qqFriend" class="iconfont cursor icon-QQ"></a>
    <a @click="sinaWeiBo" class="iconfont cursor icon-weibo"></a>
  </div>
</template>

<script>
/**
 * 转发
 */
export default {
  name: "Share.vue",
  props:{
    desc:{
      type:String,
      default:''
    },
    title:{
      type:String,
      default:''
    },
    pics:{
      type:String,
      default:''
    },
    site:{
      type:String,
      default:''
    }
  },
  methods: {
    //QQ好友
    qqFriend() {
      const {desc,title,pics} = this
      var p = {
        /*获取URL，可加上来自分享到QQ标识，方便统计*/
        url: "https://blog.csdn.net/qq_39135287/article/details/80897631",
        desc,
        /*分享标题(可选)*/
        title,
        /*分享摘要(可选)*/
        summary: "还不赶紧点击进来观看",
        /*分享图片(可选)*/
        pics,
        /*视频地址(可选)*/
        flash: "",
        /*分享来源(可选) 如：QQ分享*/
        site: "",
        style: "201",
        width: 32,
        height: 32,
      };
      var s = [];
      for (var i in p) {
        s.push(i + "=" + encodeURIComponent(p[i] || ""));
      }
      var url =
        "http://connect.qq.com/widget/shareqq/index.html?" + s.join("&");
      window.open(url);
    },
    //新浪微博
    sinaWeiBo() {
      const {desc,title,pics} = this
      var p = {
        // 表示是否显示当前页面被分享数量(1 显示)(可选， 允许为空)
        count: "1",
        //将页面地址转成短域名， 并显示在内容文字后面。(可选， 允许为空)
        url: "https://blog.csdn.net/qq_39135287/article/details/80897631",
        //用于发布微博的来源显示， 为空则分享的内容来源会显示来自互联网。(可选， 允许为空)
        appkey: "",
        //分享时所示的文字内容， 为空则自动抓取分享页面的title值(可选， 允许为空)
        title,
        //自定义图片地址， 作为微博配图(可选， 允许为空)
        pic: pics,
        //转发时会 @相关的微博账号(可选， 允许为空)
        ralateUid: "",
        //语言设置(zh_cn | zh_tw)(可选)
        language: "zh_cn",
      };

      var s = [];
      for (var i in p) {
        s.push(i + "=" + encodeURIComponent(p[i] || ""));
      }
      var url = "http://service.weibo.com/share/share.php?" + s.join("&");
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  a {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    display: inline-block;
    font-size: 20px;
    border-radius: 50%;
    border: 1px solid;
    margin-left: 10px;
  }
  .icon-QQ {
    color: #56b6e7;
    border-color: #56b6e7;
    margin-left: 0px;
    transition: all 0.5s;
    &:hover {
      background-color: #56b6e7;
      color: #fff;
    }
  }
  .icon-weibo {
    color: #d32024;
    border-color: #d32024;
    transition: all 0.5s;
    &:hover {
      background-color: #d32024;
      color: #fff;
    }
  }
  .icon-kongjian {
    color: #f5c01c;
    border-color: #f5c01c;
    transition: all 0.5s;
    &:hover {
      background-color: #f5c01c;
      color: #fff;
    }
  }
  .icon-baidu {
    color: #306cff;
    border-color: #306cff;
    transition: all 0.5s;
    &:hover {
      background-color: #306cff;
      color: #fff;
    }
  }
}
</style>
