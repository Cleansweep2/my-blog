<template>
  <div class="diary flex">
    <div class="left">
      <div :key="start" class="animate__animated animate__slideInLeft">
        <ContentDesc class="mt-0" title="个人日记"/>
        <div class="diary-body motto-article-items">
          <div
            class="diary-item my-card1"
            :key="i"
            :class="{'mt-0':i === 0}"
            v-for="(item, i) in diaryList.slice(start,end)"
          >
            <div class="diary-item-row flex ai-center">
              <div class="diary-img">
                <el-image
                  style="width: 50px; height: 50px" :src="item.author.avatar">
                </el-image>
              </div>
              <div class="diary-time">
                <div>{{item.author.userName}}</div>
                <div class="time">{{ item.createdAt | time }}</div>
              </div>
            </div>
            <div class="diary-item-content">
              {{ item.content }}
            </div>
          </div>
        </div>
        <div class="no-data"
             v-if="!diaryList.length"
        >
           暂时没有日记哦 😊
        </div>
      </div>
      <div class="pagination flex jc-center"
           v-if="diaryList.length"
      >
        <el-pagination
          @current-change="currentChange"
          background
          layout="prev, pager, next"
          :page-size="8"
          :total="diaryList.length"
        >
        </el-pagination>
      </div>
    </div>
    <div :key="end" class="right col-right animate__animated animate__fadeInRight">
      <Search />
      <ArticleFile />
      <TagCloud />
      <Website />
    </div>
  </div>
</template>
<script>

import dayjs from "dayjs";
import Search from "@/components/public/Search";
import ArticleFile from "@/components/home/ArticleFile";
import TagCloud from "@/components/home/TagCloud";
import ContentDesc from "@/components/public/ContentDesc";
import Website from "@/components/home/Website";
export default {
  name: "Diary",
  computed:{
    diaryList(){
      return this.$store.state.diaryList
    }
  },
  components: {
    Search,
    ArticleFile,
    TagCloud,
    ContentDesc,
    Website
  },
  data(){
    return {
      start:0,
      end:8
    }
  },
  mounted() {
    document.querySelector('title').innerText = '日记'
    //获取日记列表
    const { diaryList } = this.$store.state;
    if (!diaryList.length) {
      this.$store.dispatch("getDiary");
    }
  },
  methods:{
    currentChange(page){
      this.start = (page - 1) * 8
      this.end = page * 8
    },
  },
  filters: {
    //格式化时间
    time(value) {
      return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style lang="scss">
.diary {
  width: 100%;
  .diary-body {
    color: #444;
    .diary-item {
      margin-top: 10px;
      border-bottom: 1px solid #f0f0f0;
      background-color: #fff;
      padding: 30px;
      .diary-item-row {
        padding-bottom: 20px;
        .diary-item{
          flex-direction: column;
        }
      }
      .diary-time{
        padding-left: 20px;
        div{
          padding: 5px 0;
          &:nth-of-type(1){
            font-size: 15px;
          }
        }
      }
      .diary-item-content {
        line-height: 20px;
      }
    }
  }
}

@media (max-width: 992px) {
  .diary {
    width: 96%;
  }
}
@media (max-width: 768px) {
  .diary {
    .diary-body {
      .diary-item {
        border-bottom: 1px solid #eaeaea;
        &:nth-of-type(1) {
          border-top: none;
        }
      }
    }
  }
}
</style>
