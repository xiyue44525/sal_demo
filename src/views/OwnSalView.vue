<template>
  <div>
    <div>
      <div>
        <el-descriptions
            title="个人工资"
            direction="vertical"
            :column="3"
            border
        >
          <template slot="extra">
            <el-button
                size="small"
                @click="checkSalary()"
            >查看明细
            </el-button>
          </template>
          <el-descriptions-item label="员工Id">
            <el-tag size="small">{{ form.employeeId }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="基本工资">
            <el-tag size="small">{{ form.baseSalary }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="补贴">
            <el-tag size="small">{{ form.allowance }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="扣除">
            <el-tag size="small">{{ form.deduction }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="加班费">
            <el-tag size="small">{{ form.overtimePay }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="实际工资">
            <el-tag size="small">{{ form.netIncome }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
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
      form: {},
      te: {},
      leaveDays: 0,
      overtimeHours: 0,
    };
  },
  created() {
    this.GetOwnsal(this.user.id);
  },
  methods: {
    GetOwnsal(id) {
      request.post("/salary/ownSal/" + id).then((response) => {
        if (response.code === "0") {
          this.form = response.data;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    checkSalary() {
      const id = this.user.id;
      request.post("/salary/OwnMsgForSal/" + id).then((response) => {
        if (response.code === "0") {
          this.te = response.data;
          console.log(this.te);
          if (this.te.attendance === null) {
            this.leaveDays = 0;
          } else {
            this.leaveDays = this.te.attendance.leaveDays;
          }
          if (this.te.overTime === null) { 
            this.overtimeHours = 0; 
          } else {
            this.overtimeHours = this.te.overTime.overtimeHours;
          }
          alert("缺勤信息：" + this.leaveDays + "天\n" + "加班信息：" + this.overtimeHours + "小时");
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
  },
};
</script>

