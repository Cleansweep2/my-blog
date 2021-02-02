<template>
  <div class="recommend-column my-card1 body">
    <div class="title">本栏推荐</div>
    <div>
      <ul class="recommend-column-items">
        <li class="recommend-column-item flex"
            :key="i"
            v-for="(item,i) in recommendList"
        >
          <div class="recommend-avatar">
            <img v-lazy="item.cover"/>
          </div>
          <div class="column-item-body flex ai-between slh" :title="item.title">
            <router-link :to="`/web/article/${item._id}`" tag="div" class="body-title slh">{{item.title}}</router-link>
            <div class="body-info flex ai-center slh">
              <div>
                <i class="icon-yanjing iconfont"></i>
                <span>{{ item.read_num }}</span>
              </div>
              <div >
                <i class="iconfont icon-danyehuaban"></i>
                <span>{{ item.createdAt | time }}</span>
              </div>
            </div>
          </div>
        </li>
        <div class="no-data"
             style="padding: 25px 0"
             v-if="!recommendList.length"
        >
          暂时没有推荐哦 😊
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  /**
   * 本栏推荐
   */
  import dayjs from 'dayjs'
  export default {
    name: "RecommendColumn",
    props:{
      recommendList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    filters: {
      time(val) {
        return dayjs(val).format("YYYY-MM-DD");
      },
    },
  }
</script>

<style lang="scss">
.recommend-column,.hot-column{
  .recommend-column-items,.hot-column-items{
    .recommend-column-item,.hot-column-item{
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      .recommend-avatar,.hot-avatar{
        img{
          width: 106px;
          height: 86px;
          &:hover{
            transform: scale(1.2);
          }
        }
      }
      .column-item-body{
        flex:1;
        padding:0 10px;
        flex-wrap: wrap;
          width: 214px;
        .body-title{
          cursor: pointer;
          color: #409EFF;
          font-size:16px;
          &:hover{
            text-decoration:underline deeppink !important;
          }
        }
        .body-info{
          font-size: 14px;
          font-weight: 400;
          color: #666;
          div{
            margin-right: 10px;
            i{
              padding-right: 2px;
            }
          }
        }
      }
    }
  }
}
</style>