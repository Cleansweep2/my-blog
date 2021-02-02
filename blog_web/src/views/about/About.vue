<template>
  <div class="about animate__slideInLeft animate__animated">
    <div class="about-introduce  my-card1">
      <Tit tit="关于我" />
      <div class="about-introduce-body flex">
        <div class="cover">
          <img src="https://s1.ax1x.com/2020/07/14/UNmPKS.jpg" />
          <span>我的家乡</span>
        </div>
        <div v-html="$store.state.info" class="about-body-content"></div>
      </div>
    </div>
    <div class="pub my-card1">
      <PubComment
        localtion="个人"
      />
    </div>
    <div class="pub comment my-card1">
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
</template>

<script>
import Tit from "@/components/public/Tit";
import PubComment from "@/components/article/PubComment";
import Comment from "@/components/public/Comment";

import {myMixin} from '@/util/mixins'
export default {
  name: "About",
  components: {
    Tit,
    PubComment,
    Comment
  },
  data() {
    return {
      info: "",
      commentList:[],
      total:1,
      start:0,
      end:10
    };
  },
  //混入
  mixins: [myMixin],
  mounted() {
    document.querySelector('title').innerText = '关于我'
    //获取个人区评论列表
    this.getCommentList()
    //重新获取留言列表
    this.$bus.$on('getCommentList',()=>{
      this.debounce(this.getCommentList,70)()
    })
    //获取博主信息
    const info = this.$store.state.info;
    if (!info) {
      this.$store.dispatch("getInfo");
    }
  },
  methods: {
    async getCommentList() {
      const res = await this.$http.get('/crud/comment/个人/get')
      const {errCode} = res.data
      if(errCode === 1)
      {
        const result = res.data.data
        this.commentList = result
        this.total = result.length
      }
    },
    //分页功能实现
    currentChange(page) {
      this.start = (page - 1) * 10
      this.end = page * 10
    }
  },
};
</script>

<style lang="scss">
.about {
  width: 100%;
  .pub{
    margin-top: 20px;
  }
  .about-introduce{
    background-color: #fff;
    padding: 15px 15px 60px 15px;
    width: 100%;
    .about-introduce-body {
      padding-top: 20px;
      .cover {
        text-align: center;
        position: relative;
        img {
          border-radius: 50%;
        }
        span {
          color: #fff;
          font-size: 24px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          top: 70%;
          transform: translate(-50%);
        }
      }
      .about-body-content {
        color: #555;
        font-size: 15px;
        padding: 15px;
        line-height: 25px;
        flex: 1;
      }
    }
  }
}

.comment {
  padding: 15px;
  background-color: #fff;
  margin-top: 20px;
  .Pagination {
    margin-top: 20px;
  }
}

@media (max-width: 1220px) {
  .about {
    .about-introduce{
      .about-introduce-body {
        flex-direction: column;
        .about-body-content {
          padding: 0 200px;
        }
      }
    }
  }
}

@media (max-width: 992px) {
  .about {
    width: 96%;
    .about-introduce{
      .about-introduce-body {
        .cover {
          font-size: 13px;
          img {
            width: 70%;
          }
        }
        .about-body-content {
          padding: 15px;
        }
      }
    }
  }
}
</style>
