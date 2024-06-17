<template>
  <div>
    <div>
      <el-descriptions
        title="个人信息"
        direction="vertical"
        :column="4"
        border
      >
        <template slot="extra">
          <el-button
            size="small"
            @click="edit(user)"
          >操作</el-button>
        </template>
        <el-descriptions-item label="用户名">{{user.userName}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ user.sex}}</el-descriptions-item>
        <el-descriptions-item
          label="入职时间"
          :span="2"
        >{{ user.joinDate }}</el-descriptions-item>
        <el-descriptions-item label="部门">
          <el-tag size="small">{{ user.departmentName }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="联系方式">{{ user.phone }}</el-descriptions-item>
        <el-descriptions-item label="密码">{{ user.password }}</el-descriptions-item>
        <el-descriptions-item label="头像">
          <template>
            <el-image
              style="width: 60px; height: 60px ; border-radius: 50%; "
              :src="'http://localhost:8085/api/file/' + user.img"
              :preview-src-list="['http://localhost:8085/api/file/' + user.img]"
            >
            </el-image>
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div>
      <el-dialog
        title="信息编辑"
        :visible.sync="dialogFormVisible"
        width="600px"
      >
        <el-form
          label-width="80px"
          :model="user"
          :label-position="labelPosition"
        >
          <el-form
            :inline="true"
            class="demo-form-inline"
            label-width="80px"
            margin-bottom="20px"
            margin-top="30px"
          >
            <el-form-item
              label-width="80px"
              label="名字"
            >
              <el-input
                v-model="user.userName"
                autocomplete="off"
                style="width: 100%"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="性别"
              style="margin-left:-25px"
            >
              <el-radio
                v-model="user.sex"
                label="男"
              >男</el-radio>
              <el-radio
                v-model="user.sex"
                label="女"
              >女</el-radio>
            </el-form-item>
          </el-form>
          <el-form-item label="密码">
            <el-input
              v-model="user.password"
              autocomplete="off"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              action="http://localhost:8085/api/file/upload"
              :on-success="uploadSuccess"
            >
              <el-button size="small">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submit()"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      size: "",
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {},
      labelPosition: "right",
      dialogFormVisible: false,
    };
  },
  created() {},
  methods: {
    edit(obj) {
      this.user = obj;
      this.dialogFormVisible = true;
    },
    submit() {
      if (this.user.password.length > 8) {
        this.$message({
          message: "密码长度不能超过8位",
          type: "error",
        });
        return;
      }
      request.post("/test/updateUser", this.user).then((res) => {
        if (res.code === "0") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.dialogFormVisible = false;
          localStorage.setItem("user", JSON.stringify(this.user));
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    uploadSuccess(res) {
      console.log(res);
      this.user.img = res.data;
    },
  },
};
</script>

