<template>
  <div  class="article-desc-list flex">
    <div :key="item._id" v-for="item in recommentList"
                 class="article-desc-item" >

      <div class="item-img cursor">
          <img  class="scale1"  v-lazy="item.cover">
      </div>
      <div class="item-body">
        <div class="item-desc eslh">
          <router-link tag="div" class="cursor" :to="`/web/article/${item._id}`">
            {{item.title}}
          </router-link>
        </div>
        <div class="item-row  flex ai-center">
          <span class="item-row-category flex ai-center">
            <i class="icon-wenjianjia iconfont"> </i>
            <span
            >{{item.category[0].name}}</span
            >
          </span>
        <span class="item-row-watch flex ai-center">
          <i class="icon-yanjing iconfont"></i>
                    &nbsp;
                    <span>{{item.read_num}}</span>
        </span>
          <span class="item-row-favor flex ai-center">
          <i class="iconfont icon-dianzan2"></i>
          &nbsp;
          <span>{{item.favor}}赞</span>
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 推荐文章
   */
  export default {
    name: "ContentDescList1.vue",
    props:{
      recommentList:{
        type:Array,
        default(){
          return []
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .article-desc-list{
    padding: 0 10px 20px 10px;
    background-color: #fff;
    .article-desc-item{
      width: 25%;
      margin: 10px 0;
      padding: 0 10px ;
      border-left: #eee 1px solid;
      &:nth-of-type(1){
        border-left:0;
      }
      .item-body{
        .item-desc{
          color: #444;
          font-size: 15px;
          padding-top:10px ;
          &:hover{
            text-decoration:underline deeppink !important;
          }
        }
        .item-row{
          font-size: 14px;
          margin-top: 5px;
          padding: 5px 0;
          color: #666;
          .item-row-watch,.item-row-category{
            padding-right:11px;
          }
          i{
            padding-right: 3px;
            font-size:14px;
          }
        }
      }
      .item-img{
        position: relative;
        img{
          width: 100%;
          height: 160px;
        }
      }
    }
  }



  @media (max-width: 768px){
    .article-desc-list{
      flex-wrap: wrap;
      .article-desc-item{
        &:nth-of-type(2n - 1){
          border-right: #eee 1px solid;
          padding:0 10px;
        }
        &:nth-of-type(2n){
          padding:0 10px;
          border-left: 0;
        }
        &:nth-of-type(-n + 2){
          margin-bottom: 0;
          padding-bottom:10px ;
          border-bottom: #eee 1px solid;
        }
        &:nth-of-type(3){
          margin-top: 0;
          border-left: none;
          margin-bottom: 10px !important;
          padding-top: 10px;
        }
        width: 50%;
        .item-desc{
          font-size: 15px;
          padding-top:10px ;
        }
        .item-img{
          img{
            width: 100%;
            height: 180px;
          }
        }
      }
    }
  }

  @media (max-width: 480px){
    .article-desc-list{
      .article-desc-item{
        .item-body{
          .item-row{
            .item-row-watch{
             display: none;
            }
          }
        }
        .item-img{
          img{
            width: 100%;
            height: 150px;
          }
        }
      }
    }
  }

  .el-badge__content{
    height: 30px !important;
  }
</style>