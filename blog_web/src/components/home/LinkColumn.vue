<template>
  <div class="link-column my-card1 body radius">
    <div class="title">友情链接</div>
    <ul class="flex link-column-items">
      <li class="link-column-item"
          :key="item._id"
          v-for="item in linkList"
      >
        <el-button>
          <a :title="item.name" :href="item.link">
            {{item.name}}
          </a>
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "LinkColumn",
    computed:{
      linkList(){
        return this.$store.state.linkList
      }
    }
  }
</script>

<style lang="scss">
.link-column{
  width: 100%;
  .link-column-items{
    flex-wrap: wrap;
    .link-column-item{
      padding: 5px;
      width: 33.33%;
      a{
        color: #606266;
      }
      .el-button{
        width: 100%;
        padding: 10px 12px;
      }
    }
  }
}
</style>