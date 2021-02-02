<template>
  <div class="links about">
    <div class="links-over my-card1 animate__slideInLeft animate__animated">
        <Tit tit="优秀个人博客"/>
      <div class="links-over-body flex">
        <div class="link"
             :key="item._id"
             v-for="item in linkList"
        >
          <el-button>
            <a :href="item.link">
              {{item.name}}
            </a>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tit from "@/components/public/Tit";
  export default {
    name: "Links",
    components:{
      Tit
    },
    computed:{
      linkList(){
        return this.$store.state.linkList
      }
    }
  }
</script>

<style lang="scss">
  .links{
    width: 100%;
    .links-over{
      padding: 15px 15px 30px 15px;
      background-color: #fff;
      .links-over-body{
        flex-wrap: wrap;
        .link{
          text-align: start;
          width: 14.3%;
          padding: 5px;
          .el-button{
            width: 100%;
          }
          a{
            color: #606266;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .links{
      width: 96%;
      .links-over{
        padding: 15px 15px 30px 15px;
        background-color: #fff;
        .links-over-body{
          flex-wrap: wrap;
          .link{
            text-align: start;
            width: 33.33%;
          }
        }
      }
    }
  }
</style>