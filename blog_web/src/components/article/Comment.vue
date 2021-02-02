<template>
  <div class="comment-in">
    <Tit />
    <CommentItem v-for="item in commentList" :key="item" />
  </div>
</template>

<script>
/**
 * 文章的评论
 */
import Tit from "../public/Tit";
import CommentItem from "../public/CommentItem";
export default {
  name: "Comment",
  props:{
    commentList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  mounted() {

  },
  components: {
    Tit,
    CommentItem,
  },
};
</script>

<style lang="scss" scoped>
.comment-in {
  padding: 15px;
  margin-top: 20px;
}
</style>
