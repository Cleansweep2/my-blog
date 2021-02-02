<template>
  <div class="meitu animate__animated animate__slideInLeft">
    <div class="meitu-cover">
      <div>让您愉悦一下好心情</div>
      <span>美图欣赏</span>
    </div>
    <div class="meitu-items flex">
      <div class="meitu-item"
           @click="watchAdd(item._id)"
           :key="item._id"
           v-for="(item,i) in imageList"
           title="点击图片能够预览O"
      >
        <div class="caption">
          <div class="img-count">{{item.count}}张</div>
          <div class="like">{{item.images[i].watch_num}}次观看</div>
          <div class="img-title">{{item._id}}</div>
        </div>
       <div class="img">
         <viewer :images="item.images | images">
           <img :key="item1.imgUrl" v-for="item1 in item.images"
                v-show="item1.isCover"
                :src="item1.imgUrl"/>
         </viewer>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Position from "@/components/public/Position";
  export default {
    name: "Meitu",
    components:{
      Position
    },
    data(){
      return {
        imageList:[]
      }
    },
    mounted() {
      document.querySelector('title').innerText = '美图'
      this.getImageList()
    },
    methods:{
      watchAdd(author){
        this.$http.post(`/crud/image/watch/${author}/update`).then(res=>{
        })
      },
      //获取图片列表
      async getImageList(){
        const res = await this.$http.get('/crud/image/美图/get')
        const {errCode} = res.data
        if(errCode === 0)
        {
          this.imageList = res.data.data
        }
      }
    },
    filters:{
      images(val){
        const newVal = val.map((v)=>{
          return v.imgUrl
        })
        return newVal
      }
    },
  }
</script>

<style lang="scss">
  .meitu{
    width: 100%;
    .meitu-cover{
      background-image: url(https://s1.ax1x.com/2020/07/24/UvcWUx.jpg);
      position: relative;
      height: 150px;
      color:#fff;
      margin-bottom: 15px;
      div{
        font-size: 20px;
        position: absolute;
        transform: translate(-50%,-50%);
        left: 50%;
        top:50%;
      }
      span{
        position: absolute;
        left:20px;
        bottom: 20px;
        font-size: 22px;
      }
    }
    .meitu-items{
      flex-wrap: wrap;
      .meitu-item{
        cursor: pointer;
        padding: 7px;
        width: 20%;
        height: 236px;
        position: relative;
        .caption{
          color: #FFF;
          position: absolute;
          left:12px;
          bottom: 10px;
          z-index: 10;
          .img-count{
            font-size: 12px;
            bottom: 12px;
            padding-bottom: 2px;
          }
          .like{
            font-size: 12px;
          }
        }
        .img{
          height: 100%;
          width: 100%;
          box-shadow: 0 2px 3px rgba(0,0,0,0.18);
          background: linear-gradient(to top, rgba(0,0,0,.2) 0, rgba(0,0,0,0.5) 100%);
        }
        div:nth-of-type(2){
          img{
            object-fit: contain;
            width: 100%;
            background-color: #000;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .meitu{
      width: 96%;
      .meitu-items{
        .meitu-item{
          width: 100%;
          height: auto;
          padding: 0;
          margin: 5px 0;
          img{
            height: auto;
          }
          .caption{
            left:20px;
            bottom: 20px;
            }
        }
      }
    }
  }


  @media (max-width: 480px) {
    .meitu{
      width: 96%;
      .meitu-items{
        .meitu-item{
          width: 100%;
          height: auto;
          padding: 0;
          margin: 5px 0;
          img{
            height: auto;
          }
          .caption{
            left:20px;
            bottom: 20px;
          }
        }
      }
    }
  }


</style>

