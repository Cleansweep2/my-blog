<template>
  <div class="block">
    <div class="block-body animate__slideInLeft animate__animated">
      <el-timeline>
        <el-timeline-item
          :color="item.is_finish === 0 ? '#67c23a' : null"
          :timestamp="getTime1(item.end)"
          placement="top"
          :key="item.id"
          v-for="item in courseList"
        >
          <el-card>
            <h2>{{ item.title }}</h2>
            <p style="font-size: 15px ;color:#444">{{ item.content }}</p>
            <p>{{ getTime(item.start) }} — {{ getTime(item.end) }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import Position from "@/components/public/Position";
import dayjs from "dayjs";
export default {
  name: "Course.vue",
  data(){
    return {

    }
  },
  components: {
    Position,
  },
  mounted() {
    document.querySelector('title').innerText = '历程'
    const { courseList } = this.$store.state;
    if (!courseList.length) {
      this.$store.dispatch("getCourse");
    }
  },
  methods: {
    //格式化开始时间和结束的时间
    getTime(val) {
      let time
        if(val)
      {
        time = dayjs(val).format("YYYY-MM-DD")
      }else{
          time = ''
        }
      return time
    },
    getTime1(val) {
      let time
      if(val)
      {
        time = dayjs(val).format("YYYY-MM-DD")
      }
      else{
        time = ''
      }
      return time
    },
  },
  computed: {
    courseList() {
      return this.$store.state.courseList;
    },
  },
};
</script>

<style lang="scss">
.block {
  width: 100%;
}
@media (max-width: 992px) {
  .block {
    width: 96%;
  }
}
</style>
