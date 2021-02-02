<template>
  <div class="new-comment body my-card1 radius">
    <div class="title">最新评论</div>
    <ul class="new-comment-items">
      <li :key="item.id" v-for="item in newCommentList">
        <CommentItem :comment="item" :isShow="false" />
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * 最新评论
 */
import CommentItem from "../public/CommentItem";
export default {
  name: "NewComment",
  components: {
    CommentItem,
  },
  data(){
    return {
      newCommentList:[]
    }
  },
  mounted() {
    this.getNewCommentList()
  },
  methods:{
    //获取评论
    async getNewCommentList(context) {
      const res = await this.$http.get('/crud/comment/new/get')
      const {errCode} = res.data
      if(errCode === 0)
      {
        this.newCommentList = res.data.data
      }
    },
  },
};
</script>

<style lang="scss">
.new-comment {
  .new-comment-items {
    .comment-item {
      border-bottom: 1px solid #f0f0f0;
      padding: 8px 8px 0 0;
      &:nth-last-of-type(1) {
        border-bottom: 0;
      }
    }
  }
}
</style>
