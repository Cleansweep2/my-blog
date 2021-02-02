<template>
  <div class="message-board flex">
    <div class="left animate__animated animate__slideInLeft">
      <div class="pub my-card1">
        <PubComment
          localtion="留言板"
        />
      </div>
      <div class="comment my-card1">
        <Tit tit="评论" />
        <Comment
          :comment="item" :key="i" v-for="(item,i) in commentList.slice(start,end)"
        />
        <div
          v-if="!commentList.length"
          class="no-comment">
          暂没有评论,来说两句吧 😊
        </div>
      </div>
      <div class="pagination flex jc-center"
           v-if="commentList.length"
      >
        <el-pagination
          @current-change="currentChange"
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="right col-right animate__animated animate__fadeInRight">
      <Search />
      <ArticleFile />
      <TagCloud />
      <Website />
    </div>
  </div>
</template>

<script>
import Tit from "@/components/public/Tit";
import Search from "@/components/public/Search";
import ArticleFile from "@/components/home/ArticleFile";
import TagCloud from "@/components/home/TagCloud";
import CommentItem from "@/components/public/CommentItem";
import PubComment from "@/components/article/PubComment";
import Comment from "@/components/public/Comment";
import Website from "@/components/home/Website";
import {myMixin} from '@/util/mixins'



export default {
  name: "MessageBoard",
  data(){
    return {
      commentList:[],
      total:1,
      start:0,
      end:10
    }
  },
  components: {
    Tit,
    CommentItem,
    PubComment,
    Comment,
    Search,
    ArticleFile,
    TagCloud,
    Website
  },
  //混入
  mixins: [myMixin],
  mounted() {
    document.querySelector('title').innerText = '留言板'
    this.getCommentList()
    this.$bus.$on('getCommentList',()=>{
      this.debounce(this.getCommentList,70)()
    })
  },
  methods:{
    async getCommentList(){
     const res = await this.$http.get('/crud/comment/留言板/get')
      const  {errCode,message} = res.data
      if(errCode === 0)
      {
        const result = res.data.data
        this.commentList = result
        this.total = result.length
      }
    },
    //分页功能实现
    currentChange(page){
      this.start = (page - 1) * 10
      this.end = page * 10
    },
  }
};
</script>

<style lang="scss">
.message-board ,.about{
  width: 100%;
  .pub-comment-out {
    margin-top: 0;
  }
  .comment {
    padding: 15px;
    background-color: #fff;
    margin-top: 20px;
  }
  .pub {
    background-color: #fff;
    .msg-board-body {
      .item {
        width: 50%;
      }
      .tetxa {
        width: 80%;
      }
      .save {
        text-align: end;
      }
    }
  }
}

@media (max-width: 992px) {
  .message-board {
    width: 96%;
    .pub {
      .msg-board-body {
        .item {
          width: 90%;
        }
        .Pagination {
          .index {
            width: 70vw;
          }
        }
      }
    }
  }
}



@media (max-width: 768px) {
  .message-board {
    .pub {
      border: 1px solid #eaeaea;
    }
    .comment {
      border: 1px solid #eaeaea;
    }
  }
}
</style>
