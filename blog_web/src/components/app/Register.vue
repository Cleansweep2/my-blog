<template>
  <div class="register-cot animate__zoomInDown animate__animated">
    <div class="register-title">
      <div>用户注册</div>
      <i
        @click="cancel"
        class="el-icon-circle-close"></i>
    </div>
    <div class="register-body">
      <div class="username flex">
        <span class="required">*</span><el-input 
        @blur="blur('userName')" 
        v-model="userName" clearable 
        placeholder="用户名">
        </el-input>
      </div>
      <div class="email flex">
        <span class="required">*</span><el-input
         @blur="blur('emil')" 
          v-model="email"
          clearable
           placeholder="邮箱">
          </el-input>
      </div>
      <div class="email flex">
       <span class="no-require">*</span>
        <el-input @blur="blur('desc')"
          v-model="desc"
           clearable 
           placeholder="个人描述">
           </el-input>
      </div>
      <div class="password flex">
        <span class="required">*</span>
        <el-input
         @blur="blur('password')" 
          v-model="password"
           clearable
            show-password 
            placeholder="密码">
            </el-input>
      </div>
      <div class="login-type">
        <div class="social-head">
          选择一个头像吧
        </div>
        <div class="avatars flex fw">
          <div
            class="avatar el-icon-check"
            @click="checked(i)"
            :class="{ show: index === i }"
            :key="i"
            v-for="(item, i) in imgs"
          >
            <el-image
              style="width: 50px; height: 50px"
              :src="item.src"
              :title="item.title"
            >
            </el-image>
          </div>
        </div>
      </div>
      <div class="register-row flex jc-between">
        <div class="cursor" @click="login">登录账号</div>
<!--        <div>修改密码</div>-->
      </div>
      <div class="register-save">
        <el-button class="btn" @click="save" type="primary">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * APP注册
 */
export default {
  name: "Register",
  data() {
    return {
      userName: "",
      password: "",
      email: "",
      desc: "",
      index: 0,
      imgs: [
        {
          src: "https://s1.ax1x.com/2020/07/18/UgTfNq.jpg",
          title: "头像1",
        },
        {
          src: "https://s1.ax1x.com/2020/07/18/UgTqb9.jpg",
          title: "头像2",
        },
        {
          src: "https://s1.ax1x.com/2020/07/18/Ug7ibd.jpg",
          title: "头像4",
        },
        {
          src: "https://s1.ax1x.com/2020/07/18/Ug7e8f.jpg",
          title: "头像5",
        },
        {
          src:"https://s1.ax1x.com/2020/07/21/U5B41J.jpg",
          title: "头像6",
        }
        ,
        {
          src:"https://s1.ax1x.com/2020/07/21/U5BIXR.jpg",
          title: "头像7",
        }
        ,
        {
          src:"https://s1.ax1x.com/2020/07/21/U5BqAK.jpg",
          title: "头像8",
        }
        ,
        {
          src:"https://s1.ax1x.com/2020/07/21/U5BOhD.jpg",
          title: "头像9",
        }
        ,
        {
          src:"https://s1.ax1x.com/2020/07/21/U5Bv1H.jpg",
          title: "头像10",
        },
        {
          src:"https://s1.ax1x.com/2020/07/21/U5DCHP.jpg",
          title: "头像12",
        }
      ],
    };
  },
  methods: {
    //登录密码
    login(){
      this.$bus.$emit("cancle",'register');
      this.$bus.$emit("loginShow",'login')
    },
    //退出注册
    cancel(){
      this.$bus.$emit('cancle','re')
    },
    //失去焦点
    blur(type){
      if(type === 'userName'){
        
      }
    },
    async save() {
      const index = this.index;
      const userName = this.userName;
      const password = this.password;
      const email = this.email;
      const desc = this.desc
      const avatar = this.imgs[index].src;
      const emailR = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      const emilT = email.trim()
      if(!userName.trim().length)
      {
        return this.$message.error('用户名必须大于一位')
      }
      if(emilT.length)
      {
        if(!emailR.test(emilT))
        {
          return this.$message.error('邮箱格式不正确')
        }
      }else{
        return this.$message.error('邮箱不能为空')
      }
      const res = await this.$http.post("/user/register", {
        userName,
        password,
        email,
        avatar,
      });
      const { user, token, errCode } = res.data;
      if (errCode === 0) {
        localStorage.token = token;
        this.$store.commit("register", user);
        this.$message.success(`尊敬的${user.userName}注册成功`)
        this.$bus.$emit('cancle','123')
      }
    },
    checked(i) {
      this.index = i;
    },
  },
};
</script>

<style lang="scss">
.cover {
  margin-bottom: 25px;
}
.avatar {
  width: 20%;
  text-align: center;
  font-size: 20px;
}
.show {
  color: #67c23a;
  font-weight: 900;
}
//必须 登录 注册
.required{
  color: #f55845;
  line-height:40px;
  padding-right: 3px;
}
.no-require{
  color: #fff;
  padding-right: 3px;
}
</style>
