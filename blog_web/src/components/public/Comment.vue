<template>
  <div class="comment-">
    <CommentItem
      :comment="comment"
    />
    <div class="reply"
         v-if="comment.froms.length"
         :key="item.id"
         v-for="item in comment.froms"
    >
      <CommentItem
        :comment="item"
      />
      <div class="reply-child"
           v-if="item.froms"
           :key="item1.id"
           v-for="item1 in item.froms"
      >
        <CommentItem
          :is-show="false"
          :comment="item1"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import CommentItem from "./CommentItem";
  export default {
    name: "Comment",
    components:{
      CommentItem
    },
    props:{
      comment:{
        type:Object,
        default(){
          return {

          }
        }
      }
    }
  }
</script>

<style lang="scss">
.comment-{
  .reply {
    padding: 20px 0 20px 80px;
    .reply-child{
      padding: 20px 0 20px 120px;
    }
  }
  @media (max-width: 992px) {
    .reply {
      padding: 20px 0 20px 40px;
      .reply-child{
        padding: 20px 0 20px 40px;
      }
    }
  }
}
</style>