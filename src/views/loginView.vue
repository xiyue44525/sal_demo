<template>
  <div class="login-container">
    <div style="width:400px; height: 350px; margin:150px auto; background-color:whitesmoke; border-radius:10px ;">
      <div style="width:100%; height: 100px; font-size: 30px;line-height: 100px; text-align: center; color:black">登录
      </div>
      <div style="margin-top: 25px; text-align: center;height: 320px;">
        <el-form :model='admain'>
          <el-form-item>
            <el-input
                v-model="admain.phone"
                prefix-icon="el-icon-user"
                style="width: 80%;"
                placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
                v-model="admain.password"
                show-password
                prefix-icon="el-icon-lock"
                style="width:80%"
                placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                style="width:80%; margin-top:10px"
                type="primary"
                @click="login()"
            >登录
            </el-button>
          </el-form-item>
          <a href="/register"><span style="color:black; font-size: small;">注册账号</span></a>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../utils/request";

export default {
  name: "Login",
  data() {
    return {
      admain: {},
      MaxLeagthofPhone: 11,
      MaxLeagthofPassword: 8,
    };
  },
  created() {
  },
  methods: {
    login() {
      if (this.admain.phone.length > this.MaxLeagthofPhone) {
        this.$message.error({
          message: "手机号长度不能超过11位",
          type: "error",
        });
        return;
      }
      if (this.admain.password.length > this.MaxLeagthofPassword) {
        this.$message.error({
          message: "密码长度不能超过8位",
          type: "error",
        });
        return;
      }
      request.post("/test/login", this.admain).then((res) => {
        if (res.code === '0') {
          this.$message.success({
            message: "登录成功",
            type: "success",
          });
          localStorage.setItem("user", JSON.stringify(res.data));//字符串转json存入本地存储localStorage
          this.$router.push("/");
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
      });

    }
  }
}
</script>
<style scoped>
.login-container {
  background-image: url('@/assets/backhep.jpg');
  width: 100%;
  height: 100%;;
  position: fixed;
  background-size: 100% 100%;
}
</style>

