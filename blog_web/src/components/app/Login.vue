<template>
  <div class="login-cot animate__zoomInDown animate__animated">
    <div class="login-title">
      <div>用户登录</div>
      <i
        @click="cancel"
        class="el-icon-circle-close"></i>
    </div>
    <div class="register-body">
      <div class="username flex">
        <span class="required">*</span><el-input v-model="userName" clearable placeholder="用户名/邮箱"></el-input>
      </div>
      <div class="email flex">
        <span class="required">*</span><el-input v-model="password" clearable show-password placeholder="密码"></el-input>
      </div>
      <div class="password flex">
        <span class="required">*</span><el-input v-model="password1" clearable show-password placeholder="请确认密码"></el-input>
      </div>
      <div class="register-row flex jc-between">
        <div class="cursor" @click="register">注册账号</div>
<!--        <div>忘记密码</div>-->
      </div>
      <div class="register-save">
        <el-button class="btn" type="primary" @click="save">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * APP登录
 */
export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      password1: "",
    };
  },
  methods: {
    //注册账号
    register(){
      this.$bus.$emit("cancle",'login');
      this.$bus.$emit("regsShow",'register')
    },
    //
    cancel(){
      this.$bus.$emit('cancle','login')
    },
    async save() {
      const userName = this.userName;
      const password = this.password;
      const password1 = this.password1;
      if(!userName.trim().length)
      {
        return this.$message.error('请输入用户名')
      }
      if(password !== password1)
      {
        return this.$message.error('两次密码不匹配')
      }
      const res = await this.$http.post("/user/login", {
        userName,
        password,
      });
      const { user, token, errCode ,message} = res.data;
      if (errCode === 0) {
        localStorage.token = token;
        this.$store.commit("login", user);
        this.$message.success(`尊敬的${user.userName}登陆成功`)
        this.$bus.$emit('cancle','login')
      }else{
        this.$message.error(message)
      }
    },
  },
};
</script>

<style lang="scss">
.login-title,
.register-title {
  position: relative;
  color: #fff;
  padding: 15px 10px;
  font-size: 21px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  i{
    font-size: 21px;
    position: absolute;
    top:20px;
    right: 10px;
  }
}
.login-body,
.register-body {
  padding: 20px;
  background-color: #fff;
  .el-input__inner {
    border: 1px solid #7e8993;
  }
  .password {
    margin-bottom: 25px;
  }
  .login-row,
  .register-row {
    padding-left: 13px;
    color: #111;
    div:hover{
      text-decoration: underline;
    }
  }
  .login-type,
  .register-cover {
    .social-head {
      text-align: center;
      color: #000;
      font-size: 14px;
      position: relative;
      margin-bottom: 15px;
      &:after,
      &:before {
        background-color: #9b9b9b;
        content: "";
        width: 53px;
        height: 2px;
        display: inline-block;
        position: relative;
        vertical-align: middle;
        margin-left: 12px;
        margin-right: 12px;
      }
    }
    i {
      border-radius: 50%;
      color: #56b6e7;
      border: 1px solid #56b6e7;
      display: inline-block;
      text-align: center;
      line-height: 35px;
      width: 35px;
      font-size: 25px;
      transition: all 0.5s;
      &:hover {
        color: #fff;
        background-color: #56b6e7;
      }
    }
  }
  .logon-save,
  .register-save {
    .btn {
      background-color: #009688;
      width: 100%;
    }
  }
  .username,
  .email,
  .login-row,
  .login-type,
  .register-row {
    margin-bottom: 15px;
  }
}
</style>
