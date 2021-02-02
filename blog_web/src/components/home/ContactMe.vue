<template>
  <div class="contace-me body radius my-card1">
    <div class="title">联系我</div>
      <div class="contace-type  flex">
        <div class="type-wx radius flex ai-center jc-center">
          <i class="iconfont icon-weixin"></i>
          <div class="msg">
            <el-card class="box-card">
              <div class="text item">
                <img v-lazy="'https://yanxuan.nosdn.127.net/0fa0b76949cebe844a3a406fa743e3ee.png'">
              </div>
            </el-card>
          </div>
        </div>
        <div class="type-qq radius flex ai-center jc-center">
          <i class="icon-qq iconfont"></i>
          <div class="msg">
            <el-card class="box-card">
              <div class="text item">
                <img v-lazy="'https://s1.ax1x.com/2020/07/27/aPFfLn.png'">
              </div>
            </el-card>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "ContactMe"
  }
</script>

<style lang="scss">
  .contace-me{
    .contace-type{
      padding: 10px 0;
      .type-wx,.type-qq{
        width: 54px;
        height: 54px;
        cursor: pointer;
        transition: all .5s;
        position: relative;
        .msg{
          position: absolute;
          top:54px;
          height: 0;
          overflow: hidden;
          img{
            width: 198px;
            height: 198px;
          }
        }
        &:hover .msg{
          height: 238px;
        }
        &:hover{
          border-radius: 50%;
        }
        i{
          font-size: 36px;
          color: #fff;
        }
        &.type-qq{
          background-color: #33CCFF;
        }
        &.type-wx{
          background-color: #4AD84D;
          margin-right: 8px;
        }
      }
    }
  }
</style>