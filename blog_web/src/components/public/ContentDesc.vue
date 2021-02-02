<template>
  <div
    :class="{mt:isTrue}"
    class="content-desc my-card1">
    <div class="content-desc-header">
      <div class="header-row">
        <div class="header-row-title">
          <i class="iconfont">
            {{title}}
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components:{

  },
  props:{
    isTrue:{
      type:Boolean,
      default: true
    },
    title:{
      type:String,
    }
  }
}
</script>

<style lang="scss">
  .mt{
    /*margin-top: 45px;*/
  }
  .content-desc{
    width: 100%;
    .content-desc-header{
      background-color: #fff;
      align-items: center;
      position: relative;
      .header-row{
        padding:15px 10px 10px 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f0f0f0;
      }
      .header-row-title{
        i{
          font-size: 18px;
        }
      }
    }
  }

  @media (max-width: 992px) {
    .content-desc{
      padding: 0 0;
      margin-top:20px;
    }
  }

  @media (max-width: 768px) {
    .content-desc{
      border-bottom: 1px solid #EAEAEA;
      .content-desc-header{
        .header-row-title{
          margin: 0 2vw;
        }
      }
    }
    .header-row{
      border-bottom: 0 !important;
    }
  }
</style>