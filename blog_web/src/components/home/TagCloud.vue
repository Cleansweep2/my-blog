<template>
  <div class="tag-cloud my-card1 body radius">
    <div class="title">标签云</div>
    <div>
      <ul class="tags flex fw">
        <router-link :title="item.tag_name" tag="li" :to="`/web/category/${item.index}`" class="tag radius"
            :key="i"
            v-for="(item,i) in $store.state.tagList"
        >
          <el-button type="primary" class="border" plain>{{item.tag_name}}</el-button>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  /**
   * 标签云
   */
  export default {
    name: "TagCloud",
    data(){
      return {

      }
    }
  }
</script>

<style lang="scss">
  .tag-cloud{
    .tags{
      flex-wrap: wrap;
      .tag{
        width: 33.33%;
        cursor: pointer;
        text-align: center;
        transition: all .5s;
        padding: 2.5px 5px;
          .el-button{
            cursor: pointer;
            padding: 10px 12px;
            width: 100%;
            border:none;
            border-radius: 7px;
            &:hover{
             background-color: #409EFF;
            }
          }
      }
    }
  }

</style>