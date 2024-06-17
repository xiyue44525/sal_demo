<template>
  <div>
    <div style="margin-bottom:10px">
      <el-input
        v-model="params3.employeeId"
        style="width: 220px; margin-left:5px"
        placeholder="id"
      ></el-input>
      <el-button
        style="margin-left:10px"
        @click="Find()"
      >查找</el-button>
      <el-button
        style="margin-left:10px"
        @click="reset()"
      >清空</el-button>
      <el-button
        style="margin-left:10px"
        @click="add()"
      >添加</el-button>

      <div class="demo-input-suffix"></div>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="employeeId"
          label="员工ID"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="overtimeHours"
          label="加班小时数"
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
              >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="params3.pageNum"
        :page-sizes=[5,10,15,20]
        :page-size="params3.pageSize"
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
              label="员工ID"
            >
              <el-input
                v-model="form.employeeId"
                autocomplete="off"
                :disabled = change
              ></el-input>
            </el-form-item>
            <el-form-item
              label="加班小时数"
              label-width="100px"
            >
              <el-input
                v-model="form.overtimeHours"
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
      //绑定
      params3: {
        employeeId: "",
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
      change:true,
    };
  },
  //加载过程的动作
  created() {
    //this.load()
    this.Find();
  },
  //页面控件的事件方法
  methods: {
    add() {
      this.form = {};
      this.change=false;
      this.dialogFormVisible = true;
    },
    edit(obj) {
      this.form = obj;
      this.change=true;
      this.dialogFormVisible = true;
    },
    del(id) {
      request.delete("/overtime/" + id).then((res) => {
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
      request.get("/overtime/search", { params: this.params3 }).then((res) => {
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
      this.params3 = {
        employeeId: "",
        pageNum: 1,
        pageSize: 5,
      };
      this.Find();
    },
    handleSizeChange(pageSize) {
      this.params3.pageSize = pageSize;
      this.Find();
    },
    handleCurrentChange(pageNum) {
      this.params3.pageNum = pageNum;
      this.Find();
    },
    submit() {
      request.post("/overtime/add", this.form).then((res) => {
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
  },
};
</script>