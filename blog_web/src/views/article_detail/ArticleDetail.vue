<template>
  <div class="article-detail flex">
    <div class="left animate__animated animate__fadeInLeft">
      <div class="article-detail-body radius  my-card1">
        <div class="article-top">
          <div class="article-title ta">
            {{article_detail.title}}
          </div>
          <div class="row flex jc-between ai-center">
            <div class="row-left">
              <div class="article-info  flex ai-center">
                <div class="row-left-left flex">
                  <div class="article-auth flex ai-center">
                    <i class="iconfont icon-user1"></i>
                    <span>
            {{article_detail.author}}
          </span>
                  </div>
                  <div class="article-category flex ai-center">
                    <i class="iconfont icon-wenjianjia"></i>
                    <span>
            {{ article_detail.category && article_detail.category[0].name}}
          </span>
                  </div>
                  <div class="article-createtime flex ai-center">
                    <i class="iconfont icon-danyehuaban"></i>
                    <span>
            {{article_detail.createdAt | time}}
          </span>
                  </div>
                  <div class="article-watch flex ai-center">
                    <i class="iconfont icon-yanjing"></i>
                    <span>
                      {{article_detail.read_num}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="article-detail-index">
          <ArticleIndex />
        </div>
        <div class="article-content markdown-body">
          <div class="article-content-main">
            <div
              v-html="article_detail.content"
            >
            </div>
          </div>
        </div>
        <div class="article-bottom">
          <div class="award flex ai-center fc  jc-center">
        <div class="favor flex ai-center jc-center cursor"
             :class="{'favor-success':isShow}"
             @click="favor"
        >
          <i class="icon-dianzan2 iconfont"></i>
        </div>
            <div class="favor-num">赞 ({{favor_num}})</div>
          </div>
          <div class="share ai-center flex jc-between">
            <div>
              <Share
                :desc="article_detail.desc"
                :title="article_detail.title"
                :pics="article_detail.cover"
              ></Share>
            </div>
            <div>
              <el-button type="danger" size="small"
                         @click="show"
              >打赏</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="pub my-card1 ">
        <PubComment
          :article="id"
          :localtion="'文章' + article_detail.title"
        ></PubComment>
      </div>
      <div class="comment my-card1 animate__animated animate__fadeInUp">
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
    <div class="right animate__animated animate__fadeInRight">
      <Search />
      <div class="article-index-out">
        <ArticleIndex />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 文章详情
 */
  import Share from "@/components/article/Share";
  import PubComment from "@/components/article/PubComment";
  import Tit from "@/components/public/Tit";
  import Search from "@/components/public/Search";
  import ArticleIndex from "@/components/article/ArticleIndex";
  import Comment from "@/components/public/Comment";

  import {myMixin} from '@/util/mixins'


  import 'highlight.js/styles/atom-one-light.css'
  import dayjs from 'dayjs'

  export default {
    name: "ArticleDetail.vue",
    components:{
      Share,
      PubComment,
      Tit,
      Search,
      ArticleIndex,
      Comment
    },
    //混入
    mixins: [myMixin],
    data(){
      return {
        article_detail:{},
        id:'',
        commentList:[],
        total:1,
        start:0,
        end:10,
        isShow:false,
        favor_num:0
      }
    },
    mounted() {
       const {id} = this.$route.params
       this.id = id
       this.getArticleDetail(id)
       this.getCommentList(id)
       this.getFavor(id)
       this.getUserFavor(id)
       this.readNumAdd(id)
       this.$bus.$on('getCommentList',()=>{
       this.debounce(this.getCommentList,70)(id)
      })
    },
    methods:{
      //显示打赏
      show(){
        this.$bus.$emit("loginShow",'reward')
      },
      //判断该用户是否点赞
      async getUserFavor(id){
        const {_id} = this.$store.state.user
        if(!_id) return
        const res = await this.$http.get(`/crud/article/favor/${id}/${_id}/get`)
        const {is_favor} = res.data
        if(is_favor === 0)
        {
          this.isShow = true
        }else if(is_favor === 1)
        {
          this.isShow = false
        }
      },
      //点赞
      async favor(){
        const {_id} = this.$store.state.user
        if(!_id)
        {
          return this.$bus.$emit("loginShow", 'login');
        }
        const id = this.id
        const token = localStorage.token
        const res = await this.$http.post(`/crud/article/favor/${id}/${_id}/update`,{},{
          headers:{
            token
          }
        })
        const {errCode,message} = res.data
        if(errCode !== 0)
        {
          return this.$message.error(message)
        }
        //重新获取点赞数量
        this.getFavor(id)
        //重新获取用户
        this.getUserFavor(id)
        const isShow = this.isShow
        if(!isShow)
        {
          this.$message.success('点赞成功')
        }else{
          this.$message.success('已取消点赞')
        }
      },
      //留言分页
      currentChange(page){
        this.start = (page - 1) * 10
        this.end = page * 10
      },
      //浏览量加一
      async readNumAdd(id){
      await this.$http.post(`/crud/article/read/${id}/update`)
      },
      //获取文章点赞情况
      async getFavor(id){
        const res = await this.$http.get(`/crud/article/favor/${id}/get`)
        const {errCode} = res.data
        if(errCode === 0)
        {
          const result = res.data
          this.favor_num = result.favor
        }
      },
      //获取文章评论
      async getCommentList(id){
        const res = await this.$http.get(`/crud/comment/article/${id}/get`)
        console.log(res)
        const {errCode} = res.data
        if(errCode === 0)
        {
          const result = res.data.data
          this.commentList = result
          this.total = result.length
        }
      },
      //根据Id获取文章详情
      async getArticleDetail(id){
      const res = await this.$http.get(`/crud/article/article_detail/${id}/get`)
        const {errCode} = res.data
        if(errCode === 0)
        {
          const result = res.data
          document.querySelector('title').innerText = result.data.title
          this.article_detail = result.data
        }
      },
    },
    filters:{
      time(val){
        return dayjs(val).format('YYYY-MM-DD')
      }
    },
  }
</script>

<style lang="scss">
  @import "../../assets/scss/githun-markdown";
    .article-detail{
      width: 100%;
      .article-detail-body {
        background: #fff;
        padding: 10px 20px;
        /*顶部*/
        .article-top {
          .article-title {
            padding: 15px 0 5px 0;
            font-size: 28px;
            color:#000;
          }
          .row{
            border-bottom: 1px solid #E5E9EF;
          }
          .article-info {
            padding: 15px 0 10px 0;
            justify-content: center;
            font-size: 14px;
            .row-left-left {
              color:#666;
              div{
                padding-left: 50px;
                &:nth-of-type(1){
                  padding-left:0;
                }
                i{
                  padding-right: 2px;
                }
              }
            }
          }
        }
        .article-detail-index{
          display: none;
        }

        /*内容*/
        .article-content {
          padding: 15px 0;
        }
        /*底部*/
        .article-bottom {
          .award {
            border-top: 1px solid #EFEAEA;
            padding: 20px 0 10px 0;
            color: rgb(136, 136, 136);
            .favor-num{
              padding-top: 10px;
            }
            .favor {
              border-radius: 50%;
              height: 60px;
              width: 60px;
              border: 1px solid rgb(136, 136, 136);
              font-weight: 700;
              transition: all 1s;
              i{
                font-size: 30px;
                font-weight: 500;
              }
              &:hover {
                transform: rotateZ(360deg);
              }
            }
          }

          .share {
            padding: 10px 0;
            border-bottom: 4px solid #E5E9EF;
          }
        }

        .publish {
          margin: 10px 0;

          .publish-input {
            border: 1px solid #4398ed;
          }
        }
      }
      .comment-out{
        background-color: #fff;
      }
    }
    @media (max-width: 992px) {
      .article-detail {
        width: 96%;
      }
    }
  @media (max-width:768px ) {
    .article-detail{
      .article-detail-body{
        .article-top{
          .el-tag{
            line-height: 25px;
            height: 25px;
          }
          .article-info{
            .row-left-left{
              div{
                padding-left: 10px;
              }
            }
          }
          .article-createtime{
            display: none;
          }
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

  @media (max-width: 992px) {
    .article-detail{
      .article-detail-body{
        .article-detail-index{
          display: block;
        }
      }

    }
  }

  .favor-success{
    background-color: #ea6f5a;
    color: #fff;
  }


</style>

