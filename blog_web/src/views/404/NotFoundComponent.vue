<template>
  <div class="err-html">
    <div class="err-body">
    <div class="err-body-msg">你找的页面不存在</div>
    <div class="err-body-404">
      404
    </div>
    <div>
      <el-button>
        <router-link to="/web">返回首页</router-link>
        </el-button>
     </div> 
    </div> 
  </div>
</template> 

<script>
export default {
  name:'NotFoundComponent',
  mounted(){
    document.querySelector('title').innerText = '找不到了'
  }
}
</script>

<style lang="scss">
  .err-html{
    position:absolute;
    left:0; 
    top:0;
    width:100vw;
    height:100vh;
    z-index: 100000;
    background-color: #f9f9f9;
    .err-body{
      position: absolute;
      left: 50%;
      top:30%;
      transform: translateX(-50%);
      div{
        padding: 5px;
        text-align: center;
        &.err-body-404{
          font-size: 16px;
        }
      }
    }
  }
</style>