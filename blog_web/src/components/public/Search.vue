<template>
  <div class="search radius my-card1">
    <i
      @click="search"
      class="iconfont icon-sousuo"
    ></i>
    <input
      @focus="handleFocus"
      @blur="handleBlur"
      v-model="keyword"
      placeholder="输入关键字搜索文章" />
    <el-card
      :class="{dn:show}"
    >
      <div v-if="!history.length" class="text item">
        暂无搜索记录
      </div>
      <div class="text item"
           @mouseenter="handleEnter"
           v-for="(item,i) in history"
      >
        {{item}}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Search",
  data(){
    return {
      keyword:'',
      history:[],
      show:true
    }
  },
  methods:{
    handleEnter(e){
      this.keyword = e.target.innerText
    },
    //当失去焦点的时候
    handleBlur(){
      this.show = true
    },
    //当产生焦点的时候
    handleFocus(){
      let history = localStorage.history
      if(!!!history)
      {
        history = []
      }else{
        history = JSON.parse(history)
      }
      this.history = history.slice(0,6)
      this.show = false
    },
    search(){
      const keyword = this.keyword
      let history = localStorage.history
      if(!!!history)
      {
        history = []
      }else{
        history = JSON.parse(history)
      }
      const index = history.findIndex((h)=>{
        return h === keyword
      })
      if(index < 0){
        history.push(keyword)
      }
      localStorage.history = JSON.stringify(history)
      if(!keyword.trim()){
        return this.$message.info('请输入关键字')
      }
      this.$router.push(`/web/search/${keyword}`)
    }
  }
};
</script>

<style lang="scss">
.search {
  background-color: #fff;
  width: 100%;
  position: relative;
  i {
    cursor: pointer;
    padding: 10px;
    color: rgba(0, 0, 0, 0.2);
  }
  input {
    height: 33px;
    outline: none;
    border: none;
  }
  .el-card{
   position: absolute;
    width: 60%;
    left: 0;
    box-shadow: none !important;
    z-index: 100;
  }
  .el-card__body{
    padding: 0;
  }
  .item{
    padding: 10px 20px;
    cursor: pointer;
    &:hover{
      background-color: #EAEAEA;

    }
  }
}
</style>
