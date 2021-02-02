<template>
  <div class="pub-comment-out radius">
    <Tit tit="留言" />
    <div class="pub-comment-in radius">
      <div class="pub-content">
        <div class="publish-input radius">
          <el-input
            :value="tx_value"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="可以说两句哦 。。。"
            v-model="tx_value"
          >
          </el-input>
          <div class="ta-row jc-between flex ai-center">
            <div class="flex">
              <span class="icon-biaoqing iconfont" @click="show"
                >&nbsp;<span>表情</span></span
              >
              <span @click="preview" class="icon-yulan iconfont"
                >&nbsp;<span>预览</span></span
              >
            </div>
            <div class="ta-row-login">
              <el-button
                v-if="!user.userName"
                type="primary" @click="showLogin" size="mini"
                >登录</el-button
              >
              <el-button v-if="user.userName" type="primary" size="mini" @click="save">评论</el-button>
            </div>
          </div>
          <div :class="{ dn: isShow1 }" class="preview flex-1 flex jc-center">
            <el-input :value="tx_value" readOnly> </el-input>
          </div>
          <expression @handleClcik="handleClick" :class="{ dn: isShow }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 发表评论
 */
import expression from "../public/expression";
import Tit from "../public/Tit";
export default {
  name: "Comment",
  components: {
    expression,
    Tit,
  },
  props:{
    article:{
      type:String,
      default:'无'
    },
    localtion:{
      type:String,
      default:'留言板'
    }
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  mounted() {
    this.$bus.$on('reply',(to,username)=>{
      console.log(to,username)
      this.to = to
      this.tx_value = `@${username}`
    })
  },
  methods: {
    errCode(res){
      const {errCode,message} = res.data
      if(errCode === 0)
      {
        this.tx_value = ''
        this.$bus.$emit('getCommentList')
        this.$message.success('留言成功')
      }else{
        this.$message.error(message)
      }
    },
    async save(){
      const content = this.tx_value
      const {token} = localStorage
      const {_id} = this.user
      const localtion = this.localtion
      const article = this.article
      const to = this.to
      let res
      if(localtion === '留言板' || localtion === '个人')
      {
        if(to)
        {
          res = await this.$http.post('/crud/comment/add',{
            content,
            publisher:_id,
            localtion,
            to,
          },{headers:{token}})
          this.errCode(res)
          this.to = ''
        }else{
          res = await this.$http.post('/crud/comment/add',{
            content,
            publisher:_id,
            localtion
          },{headers:{token}})
          this.errCode(res)
        }
      } else
        {
          if(to)
          {
            res = await this.$http.post('/crud/comment/add',{
              content,
              publisher:_id,
              localtion,
              article,
              to
            },{headers:{token}})
            this.errCode(res)
          }else{
            res = await this.$http.post('/crud/comment/add',{
              content,
              publisher:_id,
              localtion,
              article
            },{headers:{token}})
            this.errCode(res)
          }
      }
    },
    //添加表情
    handleClick(item) {
      this.tx_value += item;
    },
    show() {
      this.isShow = !this.isShow;
    },
    send() {
      this.tx_value = "";
    },
    //关闭和显示预览
    preview() {
      if (!this.tx_value.trim()) return;
      this.isShow1 = !this.isShow1;
    },
    //显示登录
    showLogin() {
      this.$bus.$emit("loginShow", "login");
    },
  },
  data() {
    return {
      tx_value: "",
      isShow: true,
      isShow1: true,
      to:''
    };
  },
};
</script>

<style lang="scss">
.pub-comment-out {
  margin-top: 15px;
  background: #fff;
  padding: 15px;
  .pub-comment-in {
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 10px 5px;
    .pub-content {
      margin-top: 10px;
      textarea:focus {
        outline: none;
        box-shadow: none;
        border-radius: 0;
      }
      .publish-input {
        textarea {
          border: 1px solid #ccc;
        }
        .preview {
          margin: 10px 0;
          padding: 4px 0;
          border: 1px solid #ccc;
          .el-input {
            width: 98%;
          }
        }
        .ta-row {
          color: #495057;
          .ta-row-login {
            padding-top: 5px;
          }
          div {
            .iconfont {
              cursor: pointer;
              padding: 5px 10px;
            }
            .icon-yulan {
              font-size: 14px;
            }
            .icon-biaoqing {
              span {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .pub-comment-in {
    .pub-top {
      flex-direction: column;
    }
  }
}
</style>
