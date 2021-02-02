<template>
  <div class="comment-main">
    <div class="publisher flex">
      <div class="main-left">
        <img class="radius" :src="comment.publisher.avatar" />
      </div>
      <div class="main-right flex flex-1 dir-col">
        <div class="r-1 flex jc-between ai-center">
          <span><el-tag  v-if="comment.publisher.isAdmin">博主</el-tag>{{ comment.publisher.userName }}</span>
          <span>{{ comment.createdAt | time }}</span>
        </div>
        <div class="r-2">
          {{ comment.content }}
        </div>
        <div class="r-3" v-if="isShow">
          <el-button type="primary" size="mini" @click="alter">回复</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "CommentItem",
  filters: {
    time(val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm");
    },
  },
  methods:{
    alter(){
      const {userName} = this.$store.state.user
      if(!userName)
      {
        return this.$message.info('请先登录')
      }
      const {_id} = this.comment
      const username = this.comment.publisher.userName
      this.$bus.$emit('reply',_id,username)
      console.log(document.querySelector('.pub').offsetTop )
      window.scrollTo(0,document.querySelector('.pub').offsetTop )
    }
  },
  mounted() {

  },
  props: {
    isShow:{
      type:Boolean,
      default:true
    },
    comment: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss">
.comment-main {
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0;
  &:nth-of-type(1) {
    border-top: none;
  }
  @media (max-width: 992px) {
    .reply {
      border-top: 1px dashed #f0f0f0;
      padding: 20px 0 20px 40px;
    }
  }
  .main-right {
    padding-left: 20px;
    div {
      padding: 5px 0;
    }
    .r-1 {
      span:nth-of-type(1) {
        color: #409EFF;
        font-weight: 700;
        .el-tag{
          height: 23px;
          line-height: 23px;
          margin-right: 5px;
          color: #409eff;
        }
      }
      span:nth-of-type(2) {
        color: #666;
      }
    }
    .r-2 {
      color: #333;
    }
    .r-3 {
      line-height: 100%;
      padding-bottom: 10px;
      text-align: end;
      color: #999999;
    }
  }
  .main-left {
    img {
      height: 50px;
      width: 50px;
      &:hover{
        transform: scale(1.2);
      }
    }
  }
}
</style>
