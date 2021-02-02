<template>
  <div class="motto my-card1">
    <div class="motto-top-row flex">
      <div class="row-avatar">
        <el-image
          style="width: 50px; height: 50px"
          :src="sentence.blogger && sentence.blogger.avatar"
          fit="fill"></el-image>
      </div>
      <div class="row-info">
        <div class="row-info-title">
          {{sentence.blogger && sentence.blogger.userName}}
        </div>
        <div class="row-info-time">
          {{sentence.createdAt | time}}
        </div>
      </div>
    </div>
    <div class="motto-body">
      <div class="motto-body-content">
        <div class="motto-body-content-c">
          {{sentence.content}}
        </div>
        <div class="motto-body-content-author" :class="{'no-author':!sentence.author}">
          <span v-if="sentence.author" >---</span> {{sentence.author}}​​
        </div>
      </div>
    </div>
    <div class="motto-bottom flex">
      <viewer :images="sentence.images">
        <img v-for="item in sentence.images" title="点击大图预览o"
             :key="item" :src="item"/>
      </viewer>
    </div>
  </div>
</template>

<script>
/**
 * 每日一句
 */
import dayjs from "dayjs";
export default {
  name: "Motto",
  props:{
    sentence:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters: {
    time(value) {
      return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style lang="scss">
.motto {
  margin-top: 10px;
  background: #fff;
  padding: 20px;
  .motto-top-row{
    position: relative;
    .row-avatar{
      img:hover{
        transform: scale(1.2);
      }
    }
    .row-info{
      padding-left: 10px;
      .row-info-title{
        font-size: 16px;
        color: #444;
        padding:0 0 7px 0 ;
      }
      .row-info-time{
        color: #808080;
        padding-top: 5px;
      }
    }
  }
  .motto-body{
    padding-top: 10px;
    padding-left: 60px;
    font-size: 14px;
    color: #333;
    .motto-body-content-author{
      padding: 20px 40px 10px 0;
      text-align: end;
    }
    .no-author{
      padding: 0;
    }
  }
  .motto-bottom{
    flex-wrap: wrap;
    padding-left: 60px;
    img{
      cursor: pointer;
      font-size: 0;
      width: auto;
      height: 167px;
      border: 1px solid #eaeaea;
      margin-left: 5px;
      object-fit: cover;
    }
  }
}

@media (max-width: 768px) {
  .motto {
    .motto-body{
      padding-left: 0;
      .motto-body-content-author{
        padding-right: 0;
      }
    }
    .motto-bottom{
      padding-left: 0;
      img {
        height: 150px;
      }
    }
  }
}
</style>
