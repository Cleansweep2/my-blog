<template>
  <div class=" my-card1 hot-column body radius">
    <div class="title">热门文章</div>
    <ul class="hot-column-items">
      <li class="hot-column-item flex"
          :key="i"
          v-for="(item,i) in rankingList"
      >
        <div class="hot-avatar">
          <img v-lazy="item.cover"/>
        </div>
        <div class="column-item-body flex slh ai-between" :title="item.title">
          <router-link :to="`/web/article/${item._id}`" tag="div" class="body-title slh">{{item.title}}</router-link>
          <div class="body-info flex ai-center ">
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
           v-if="!rankingList.length"
      >
        暂时没有热门o 😊
      </div>
    </ul>
  </div>
</template>
<script>
/**
 * 随机文章
 */
import dayjs from 'dayjs'
export default {
  name: "RandomArticles",
  data() {
    return {
      rankingList: [],
    };
  },
  mounted() {
    this.getRanking();
  },
  methods: {
    async getRanking() {
      const res = await this.$http.get("/crud/article/ranking/get");
      this.rankingList = res.data.data;
    },
  },
  filters: {
    time(val) {
      return dayjs(val).format("YYYY-MM-DD");
    },
  },
};
</script>

<style lang="scss">
.random-article {
  .column-item-body{
    width: 214px;
  }
  .article-items {
    .item {
      padding: 8px 0;
      &:nth-last-of-type(1) {
        padding-top: 0;
      }
    }
    a:hover {
      text-decoration: underline deeppink !important;
    }
    .col {
      padding: 0 10px 0 25px;
      line-height: 22px;
      color: #444;
      font-size: 14px;
      .col-tit {
        position: relative;
        span.watch {
          height: 18px;
          line-height: 18px;
          display: inline-block;
          margin-left: 7px;
          color: #999;
          font-size: 12px;
          background: #f5f5f5;
          border-radius: 2px;
          padding: 0 6px;
        }
        span.index {
          position: absolute;
          left: -25px;
          top: 5px;
          width: 20px;
          height: 14px;
          background: #ecf5ff;
          cursor: pointer;
          line-height: 14px;
          text-align: center;
          color: #409eff;
          font-size: 12px;
          border-radius: 2px;
        }
      }
    }
  }
}

.title {
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0;
  font-size: 18px;
}

.body {
  width: 100%;
  padding: 5px 10px 10px 10px;
  background-color: #fff;
  margin-top: 20px;
}
</style>
