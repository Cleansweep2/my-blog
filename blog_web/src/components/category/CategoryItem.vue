<template>
  <div class="category-item  my-card1 left animate__animated animate__slideInLeft" v-if="Object.keys(item).length">
    <div class="item-main flex jc-between">
      <div class="item-left">
        <router-link tag="div" :to="`/web/article/${item._id}`" class="item-title">
          {{ item.title }}
        </router-link>
        <div class="item-desc eslh">
          {{ item.desc }}
        </div>
      </div>
      <router-link tag="div" :to="`/web/article/${item._id}`" class="item-right">
        <img class="" :title="item.title" v-lazy="item.cover" />
      </router-link>
    </div>
    <div class="item-row flex jc-between">
      <div class="row-left flex ai-center">
        <div>
          <i class="icon-wenjianjia iconfont"> </i>
          <span
            >{{
              item.category[0].name
            }}</span
          >
        </div>
        <div>
          <i class="icon-yanjing iconfont"></i>
          <span>{{ item.read_num }}</span>
        </div>
        <div >
          <i class="iconfont icon-danyehuaban"></i>
          <span>{{ item.createdAt | time }}</span>
        </div>
        <div>
          <i class="iconfont icon-dianzan2"></i>
          <span>{{item.favor}}赞</span>
        </div>
      </div>
      <div class="row-right">
        <router-link :to="`/web/article/${item._id}`">
          <el-button type="text">
            查看详情
          </el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 文章分类一项
 */
import dayjs from "dayjs";
export default {
  name: "CategoryItem",
  filters: {
    time(val) {
      return dayjs(val).format("YYYY-MM-DD");
    },
  },
  mounted() {},
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.category-item {
  margin-top: 10px;
  padding: 20px 15px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  i {
    padding-right: 2px;
  }
  .item-row {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #666;
    div {
      margin-right: 10px;
      &.row-left {
        div {
          a {
            color: black !important;
            font-weight: 500;
            &:hover {
              text-decoration: underline deeppink !important;
            }
          }
        }
      }
      &.row-right {
        color: #007bff;
        font-size: 14px;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
  .item-main {
    .item-left {
      padding-right: 15px;
      .item-title {
        cursor: pointer;
        margin-bottom: 15px;
        font-size: 22px;
        line-height: 30px;
        color: #444444;
        font-weight: 400;
        &:hover {
          text-decoration: underline deeppink !important;
        }
      }
      .item-desc {
        font-size: 15px;
        margin: 15px 0 25px 0;
        line-height: 25px;
        color: #444444;
      }
    }
    .item-right {
      cursor: pointer;
      img {
        width: 137px;
        height: 110px;
        &:hover{
          transform: scale(1.2);
        }
      }

    }
  }
}
@media (max-width: 992px) {
  .category-item {
    border-bottom: 1px solid #eaeaea;
    padding-left: 15px;
    padding-right: 0px;
    .item-row {
      div {
        &:nth-of-type(4) {
          display: none;
        }
        &.row-right {
          &:hover {
          }
        }
      }
    }
    .item-main {
      .item-left {
        .item-title {
          font-size: 18px;
          font-weight: 500;
        }
        .item-desc {
        }
      }
      .item-right {
        padding-right: 10px;
      }
    }
  }
}

</style>
