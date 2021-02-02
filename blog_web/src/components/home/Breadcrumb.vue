<template>
  <div class="breadcrumb body my-card1">
    <div class="title">当前位置</div>
    <div class="breadcrumb-items">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
/**
 * 当前位置
 */
import Tit from "../public/Tit";
export default {
  name: "Breadcrumb",
  components: {
    Tit,
  },
};
</script>

<style lang="scss">
.breadcrumb {
  background-color: #fff;
  .breadcrumb-items {
    padding-top: 20px;
  }
}
</style>
