<template>
  <div class="Regist-container">
    <div style="width:400px; height: 350px; margin:150px auto; background-color:whitesmoke; border-radius:10px ;">
      <div style="width:100%; height: 100px; font-size: 30px;line-height: 100px; text-align: center; color:black">注册</div>
      <div style="margin-top: 25px; text-align: center;height: 320px;">
        <el-form :model='admain'>
          <el-form-item>
            <el-input
              v-model="admain.phone"
              prefix-icon="el-icon-user"
              style="width: 80%;"
              placeholder="请输入手机号"
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="admain.password"
              show-password
              prefix-icon="el-icon-lock"
              style="width:80%"
              placeholder="请设置密码"
              maxlength="16"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width:80%; margin-top:10px"
              type="primary"
              @click="register()"
            >注册</el-button>
          </el-form-item>
          <a href="/login"><span style="color:black; font-size: small;">登录</span></a>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../utils/request";
export default {
  name: "Regist",
  data() {
    return {
      admain: {},
    };
  },
  created() {},
  methods: {
    register() {
      request.post("/test/register", this.admain).then((res) => {
        if (res.code === '0') {
          this.$message.success({
            message: "注册成功",
            type: "success",
          });  
          this.$router.push("/login");
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
</script>
<style scoped>
.Regist-container {
  background-image: url('@/assets/backhep.jpg' );
width:100%;		
height: 100%;;	
position:fixed;
background-size:100% 100%;}
</style>
