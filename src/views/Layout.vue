<template>
  <div>
    <template>
      <div>
        <el-container>
          <el-header style="background-color:#d0d0d0;">
            <img
                src="@/assets/logo.png"
                alt=""
                style="width: 40px; position: relative; top:10px;"
            >
            <span>工资管理系统</span>
            <el-dropdown style="float: right; height: 60px; line-height: 60px;">
              <span
                  class="el-dropdown-link"
                  style="font-size: 16px"
              >
                {{ user.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span @click="logout()">退出登录</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>
        </el-container>

        <el-container>
          <el-aside style="overflow: hidden; min-height: 100vh; background-color: #808080; width: 250px;">
            <el-menu
                :default-active="$route.path"
                router
                class="el-menu-vertical-demo"
                background-color="#808080"
                text-color="#fff"
                active-text-color="#ffd04b"
            >

              <el-menu-item index="/">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>

              <el-menu-item
                  index="/text"
                  v-if="user.sign === 1"
              >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>员工信息管理</span>
                </template>
              </el-menu-item>

              <el-menu-item
                  index="/Department"
                  v-if="user.sign === 1"
              >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>部门管理</span>
                </template>
              </el-menu-item>
              <el-submenu index="/Attendance" v-if="user.sign === 1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                      index="/Attendance"
                      v-if="user.sign === 1"
                  >
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>考勤管理</span>
                    </template>
                  </el-menu-item>
                  <el-menu-item
                      index="/OverTime"
                      v-if="user.sign === 1"
                  >
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>加班管理</span>
                    </template>
                  </el-menu-item>
                  <el-menu-item index="/Position" v-if="user.sign === 1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>职位信息</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item
                  index="/Salary"
                  v-if="user.sign ===1"
              >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>工资管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/OwnSal">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>个人工资</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/OwnMasg">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>个人信息</span>
                </template>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      user: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user"))
          : {},
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.el-menu {
  border-right: none !important;
}
</style>