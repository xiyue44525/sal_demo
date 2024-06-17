<template>
  <div>
    <div style="margin-bottom:10px">
      <el-input
          v-model="params4.position"
          style="width: 220px; margin-left:5px"
          placeholder="职称"
      ></el-input>
      <el-button
          style="margin-left:10px"
          @click="FindPosition()"
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
          action="http://localhost:8085/api/position/upload"
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
            label="编号"
            width="150"
        >
        </el-table-column>
        <el-table-column
            prop="position"
            label="职位"
            width="150"
        >
        </el-table-column>
        <el-table-column
            prop="baseSalary"
            label="基础工资"
            width="150"
        >
        </el-table-column>
        <el-table-column
            prop="allowance"
            label="补贴"
            width="150"
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
          :current-page.sync="params4.pageNum"
          :page-sizes=[5,10,15,20]
          :page-size="params4.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total"
      >
      </el-pagination>
    </div>

    <div>
      <el-dialog
          title="信息编辑"
          :visible.sync="dialogFormVisible"
          width="750px"
      >
        <el-form
            :model="form"
            :label-position="labelPosition"
        >
          <el-form
              :inline="true"
              class="demo-form-inline"
          >
            <el-form-item
                label-width="80px"
                label="职称"
            >
              <el-input
                  v-model="form.position"
                  autocomplete="off"
                  :disabled=change
              ></el-input>
            </el-form-item>
            <el-form-item
                label="基础工资"
                label-width="80px"
            >
              <el-input
                  v-model="form.baseSalary"
                  autocomplete="off"
                  style="width: 100%"
              ></el-input>
            </el-form-item>
            <el-form-item
                label="补贴"
                label-width="80px"
            >
              <el-input
                  v-model="form.allowance"
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
          <el-button @click="dialogFormVisible = false">取 消</el-button>
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
      params4: {
        position: "",
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
      change: true,
    };
  },
  //加载过程的动作
  created() {
    this.FindPosition();
  },
  //页面控件的事件方法
  methods: {
    add() {
      this.form = {};
      this.change = false;
      this.dialogFormVisible = true;
    },
    edit(obj) {
      this.form = obj;
      this.change = true;
      this.dialogFormVisible = true;
    },
    del(id) {
      request.delete("/position/" + id).then((res) => {
        if (res.code === "0") {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.FindPosition();
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    FindPosition() {
      request.get("/position/search", {params: this.params4}).then((res) => {
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
      this.params4 = {
        position: "",
        pageNum: 1,
        pageSize: 5,
      };
      this.FindPosition();
    },
    handleSizeChange(pageSize) {
      this.params4.pageSize = pageSize;
      this.FindPosition();
    },
    handleCurrentChange(pageNum) {
      this.params4.pageNum = pageNum;
      this.FindPosition();
    },
    submit() {
      request.post("/position/add", this.form).then((res) => {
        if (res.code === "0") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.FindPosition();
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    exp() {
      let user = localStorage.getItem("user");
      location.href =
          "http://localhost:8085/api/position/export?token=" + JSON.parse(user).token;
    },
    uploadSuccess(res) {
      if (res.code === "0") {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.FindPosition();
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