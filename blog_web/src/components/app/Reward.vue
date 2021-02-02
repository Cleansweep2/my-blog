<template>
  <div class="reward-cot animate__zoomInDown animate__animated">
    <h3 class="reward-cot-title">
      亲! 支持博主一下吧  😊
      <i
        @click="cancel"
        class="el-icon-circle-close"></i>
    </h3>
    <div class="reward-cot-body flex">
      <div class="body-zfb flex fc ai-center">
        <span class="demonstration">支付宝打赏</span>
        <el-image
          src="https://yanxuan.nosdn.127.net/ea90f6f237fc690b241d7b0f2ffbcc25.png"
          fit="fill"></el-image>
      </div>
      <div class="body-wx flex fc ai-center">
        <span class="demonstration">微信打赏</span>
        <el-image
          src="https://yanxuan.nosdn.127.net/0fa0b76949cebe844a3a406fa743e3ee.png"
          fit="fill"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Reward",
    methods:{
      cancel(){
        this.$bus.$emit('cancle','reward')
      },
    }
  }
</script>

<style lang="scss">
  .reward-cot
  {
    background-color: #fff;
    position: fixed;
    top: 50vh;
    left: 50%;
    width: 550px;
    transform: translate(-50%, -50%);
    .reward-cot-title{
      font-size: 18px;
      color: #555;
      text-align: center;
      position: relative;
      .el-icon-circle-close{
        font-size: 18px;
        color: #555 !important;
        position: absolute;
        right: 10px;
        top:2px;
      }
    }
    .reward-cot-body{
      padding-bottom:30px ;
      justify-content: center;
      .body-zfb,.body-wx{
        color: #555;
        font-weight: 700;
        font-size: 15px;
        .el-image{
          width: 200px;
          height: 200px;
          border: 3px solid #f1f1f1;
        }
        .demonstration{
          padding-bottom: 10px;
        }
      }
      .body-zfb{
        padding-right: 20px;
      }
      .body-wx{
        padding-left: 20px;
      }
    }
  }

  @media (max-width: 768px) {
    .reward-cot
    {
      background-color: #fff;
      width: 300px;
      .reward-cot-title{
        font-size: 16px;
      }
      .reward-cot-body{
        flex-direction: column;
        align-items: center;
        .body-zfb,.body-wx{
          font-size: 14px;
          .el-image{
            width: 150px;
            height: 150px;
          }
        }
        .body-zfb{
          padding-right: 0;
        }
        .body-wx{
          padding-top: 20px;
          padding-left: 0;
        }
      }
    }
  }
</style>

<!--微信-->
<!--https://yanxuan.nosdn.127.net/0fa0b76949cebe844a3a406fa743e3ee.png-->
<!--支付宝-->
<!--https://yanxuan.nosdn.127.net/ea90f6f237fc690b241d7b0f2ffbcc25.png-->