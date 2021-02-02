<template>
  <div
    @click="handleClick"
    class="el-backtop"
    style="right: 40px; bottom: 40px;">
    <i class="el-icon-caret-top"></i>
  </div>
</template>

<script>
  /**
   * 回到顶部
   */
  export default {
    name: "GoTop",
    mounted() {
      this.$bus.$on('top',()=>{
        this.handleClick()
      })
    },
    methods:{
      handleClick(){
        let top = window.scrollY
        const bs = setInterval(()=>{
          top = top - 500
          window.scrollTo(0,top)
          if(top <= 0)
          {
            clearInterval(bs)
          }
        },50)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-backtop{
    right: 20px !important;
  }
</style>