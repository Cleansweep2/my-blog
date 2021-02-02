<template>
  <div class="website body radius my-card1">
    <div class="title">网站统计</div>
    <div>
      <ul class="website-column-items">
        <li>
          <span>网站名称 : </span><span>少年已老</span>
        </li>
        <li>
          <span>本站托管 : </span><span>阿里云ECS</span>
        </li>
        <li>
          <span>文章总数 : </span><span>{{articleCount}}</span>
        </li>
        <li>
          <span>留言总数 : </span><span>{{commentCount}}</span>
        </li>
        <li>
          <span>网站运行 : </span><span>{{time}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import timeDifference from "../../util/time_difference";

  export default {
    name: "Website",
    data(){
      return {
        articleCount: 0,
        commentCount:0,
        time:0
      }
    },
    mounted() {
      const {articleCount} = this.$store.state
      this.articleCount = articleCount
      this.getCommentCount()
      setInterval(()=>{
       this.time = timeDifference('2020-08-01 00:00:00')
      },1000)
    },
    methods: {
      //文章评论数量
      async getCommentCount(context){
        const res = await this.$http.get('/crud/comment/count/get')
        const {errCode} = res.data
        if(errCode === 0)
        {
         this.commentCount = res.data.count
        }
      },
    }
  }
</script>

<style lang="scss">
  .website{
    .website-column-items{
      color: #333;
      margin-left: 25px;
      li{

        font-size: 14px;
        padding: 6px 0;
      }
    }
  }
</style>