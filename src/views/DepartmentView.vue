<template>
  <div>
    <div style="margin-bottom:10px">
      <el-input
          v-model="params2.departmentName"
          style="width: 200px;"
          placeholder="部门名称"
      ></el-input>
      <el-input
          v-model="params2.email"
          style="width: 200px; margin-left:5px"
          placeholder="邮箱"
      ></el-input>
      <el-button
          style="margin-left:10px"
          @click="Find()"
      >查找
      </el-button>
      <el-button
          style="margin-left:10px"
          @click="reset()"
      >清空
      </el-button>
      <el-button
          style="margin-left:10px"
          @click="add()"
      >添加
      </el-button>
      <el-button
          style="margin-left:10px"
          @click="exp()"
      >导出
      </el-button>
      <el-upload
          action="http://localhost:8085/api/department/upload"
          style="display: inline-block; margin-left: 70px;"
          :show-file-list="false"
          :on-success="uploadSuccess"
      >
        <el-button size="small">点击上传</el-button>
      </el-upload>
      <div class="demo-input-suffix"></div>
    </div>
    <div>
      <el-table
          :data="tableData"
          stripe
          style="width: 100%"
      >
        <el-table-column
            prop="id"
            label="部门ID"
        >
        </el-table-column>
        <el-table-column
            prop="departmentName"
            label="部门名称"
        >
        </el-table-column>
        <el-table-column
            prop="departmentSize"
            label="人数"
        >
        </el-table-column>
        <el-table-column
            prop="contactNumber"
            label="联系方式"
        >
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
        >
        </el-table-column>
        <el-table-column
            prop="oneHourPay"
            label="加班费/小时"
        >
        </el-table-column>
        <el-table-column
            prop="deductionAmount"
            label="缺勤扣款/天"
        >
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-popconfirm
                title="这是一段内容确定删除吗？"
                @confirm="del(scope.row.id)"
            >
              <el-button
                  slot="reference"
                  style="margin-left:5px"
              >删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 10px;">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="params2.pageNum"
          :page-sizes=[5,10,15,20]
          :page-size="params2.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total"
      >
      </el-pagination>
    </div>

    <div>
      <el-dialog
          title="部门编辑"
          :visible.sync="dialogFormVisible"
          width="630px"
      >
        <el-form
            label-width="90px"
            :model="form"
            :label-position="labelPosition"
        >
          <el-form
              :inline="true"
              class="demo-form-inline"
              label-width="90px"
          >
            <el-form-item
                label-width="90px"
                label="部门名称"
            >
              <el-input
                  v-model="form.departmentName"
                  autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="人数">
              <el-input
                  v-model="form.departmentSize"
                  autocomplete="off"
                  style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form
              :inline="true"
              class="demo-form-inline"
              label-width="90px"
              margin-bottom="20px"
              margin-top="30px"
          >
            <el-form-item
                label-width="90px"
                label="联系方式"
            >
              <el-input
                  v-model="form.contactNumber"
                  autocomplete="off"
                  style="width: 100%"
              ></el-input>

            </el-form-item>
            <el-form-item
                label-width="90px"
                label="邮箱"
            >
              <el-input
                  v-model="form.email"
                  autocomplete="off"
                  style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form
              :inline="true"
              class="demo-form-inline"
              label-width="90px"
              margin-bottom="20px"
              margin-top="30px"
          >
            <el-form-item
                label-width="90px"
                label="加班费/小时"
            >
              <el-input
                  v-model="form.oneHourPay"
                  autocomplete="off"
                  style="width: 100%"
              ></el-input>

            </el-form-item>
            <el-form-item
                label-width="90px"
                label="缺勤扣款/天"
            >
              <el-input
                  v-model="form.deductionAmount"
                  autocomplete="off"
                  style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-form>
        <div
            slot="footer"
            class="dialog-footer"
        >
          <el-button @click="Cancel">取 消</el-button>
          <el-button
              type="primary"
              @click="submit()"
          >确 定
          </el-button>
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
      //绑定
      params2: {
        departmentName: "",
        email: "",
        pageNum: 1,
        pageSize: 5,
      },
      departments: [],
      tableData: [],
      form: {},
      total: 0,
      dialogFormVisible: false,
      labelPosition: "right",
      value: "",
    };
  },
  //加载过程的动作
  created() {
    this.Find();
  },
  //页面控件的事件方法
  methods: {
    add() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    edit(obj) {
      this.form = obj;
      this.dialogFormVisible = true;
    },
    del(id) {
      request.delete("/department/" + id).then((res) => {
        if (res.code === "0") {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.Find();
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    Find() {
      request
          .get("/department/search", {params: this.params2})
          .then((res) => {
            if (res.code === "0") {
              this.tableData = res.data.list;
              this.total = res.data.total;
            } else {
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          });
    },
    reset() {
      this.params2 = {
        pageNum: 1,
        pageSize: 5,
      };
      this.Find();
    },
    handleSizeChange(pageSize) {
      this.params2.pageSize = pageSize;
      this.Find();
    },
    handleCurrentChange(pageNum) {
      this.params2.pageNum = pageNum;
      this.Find();
    },
    submit() {
      request.post("/department/add", this.form).then((res) => {
        if (res.code === "0") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.Find();
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    Cancel() {
      this.dialogFormVisible = false;
    },
    exp() {
      let user = localStorage.getItem("user");
      location.href =
          "http://localhost:8085/api/department/export?token=" + JSON.parse(user).token;
    },
    uploadSuccess(res) {
      if (res.code === "0") {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.Find();
      } else {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
  },
};
</script>