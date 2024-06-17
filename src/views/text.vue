<template>
  <div>
    <div style="margin-bottom:10px">
      <el-input
          v-model="params.userName"
          style="width: 200px;"
          placeholder="姓名"
      ></el-input>
      <el-input
          v-model="params.departmentName"
          style="width: 200px; margin-left:5px"
          placeholder="部门"
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
      <el-popconfirm
          title="确定删除吗？"
          @confirm="delMuch()"
      >
        <el-button
            slot="reference"
            style="margin-left:10px"
        >批量删除
        </el-button>
      </el-popconfirm>
      <el-button
          style="margin-left:10px"
          @click="exp()"
      >导出
      </el-button>
      <el-upload
          action="http://localhost:8085/api/test/upload"
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
          ref="table"
          :row-key="rowKey"
          @selection-change="handleSelectionChange"
      >
        <el-table-column
            type="selection"
            width="55"
            :reserve-selection="true"
        >
        </el-table-column>
        <el-table-column
            prop="id"
            label="ID"
        >
        </el-table-column>
        <el-table-column
            prop="userName"
            label="姓名"
        >
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
        >
        </el-table-column>
        <el-table-column
            prop="departmentName"
            label="部门"
        >
        </el-table-column>
        <el-table-column
            prop="joinDate"
            label="入职时间"
        >
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.joinDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="phone"
            label="联系方式"
        >
        </el-table-column>
        <el-table-column
            prop="password"
            label="密码"
        >
        </el-table-column>
        <el-table-column
            prop="sign"
            label="权限"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sign === 1 ? '管理员' : '员工' }}</span>
          </template>
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
          :current-page.sync="params.pageNum"
          :page-sizes=[5,10,15,20]
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next"
          :total="total"
      >
      </el-pagination>
    </div>

    <div>
      <el-dialog
          title="信息编辑"
          :visible.sync="dialogFormVisible"
          width="600px"
      >
        <el-form
            label-width="80px"
            :model="form"
            :label-position="labelPosition"
        >
          <el-form-item
              label-width="80px"
              label="名字"
          >
            <el-input
                v-model="form.userName"
                autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input
                v-model="form.phone"
                autocomplete="off"
                style="width: 100%"
            ></el-input>
          </el-form-item>
          <el-form-item
              label-width="80px"
              label="部门"
          >
            <el-select
                v-model="form.departmentName"
                clearable
                placeholder="请选择部门"
            >
              <el-option
                  v-for="item in departments"
                  :key="item.departmentId"
                  :label="item.departmentName"
                  :value="item.departmentName"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
              label="性别"
              style="margin-left:-25px"
          >
            <el-radio
                v-model="form.sex"
                label="男"
            >男
            </el-radio>
            <el-radio
                v-model="form.sex"
                label="女"
            >女
            </el-radio>
          </el-form-item>
          <el-form-item
              label="权限"
              label-width="80px"
          >
            <el-radio
                v-model="form.sign"
                label="1"
            >管理员
            </el-radio>
            <el-radio
                v-model="form.sign"
                label="0"
            >员工
            </el-radio>
          </el-form-item>
          <el-form-item
              label="textlabel"
              label-width="80px"
          >
            <el-radio
                v-model="thtis.xl"
                label="1"
            >管理员
            </el-radio>
            <el-radio
                v-model="this.xl"
                label="0"
            >员工
            </el-radio>
          </el-form-item>
          <el-form-item
              label-width="80px"
              label="入职时间"
          >
            <el-row>
              <el-col :span="7">
                <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.joinDate"
                    style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col :span="7">
                <el-time-picker
                    placeholder="选择时间"
                    v-model="form.joinDate"
                    style="width: 100%; margin-left: 10px"
                ></el-time-picker>
              </el-col>
            </el-row>
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
          >确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import request from "@/utils/request";
import moment from "moment"; //引入时间格式化插件moment
export default {
  data() {
    return {
      //绑定
      params: {
        userName: "",
        departmentName: "",
        pageNum: 1,
        pageSize: 5,
      },
      departments: [],
      tableData: [],
      form: {
        sign: 1,
      },
      total: 0,
      textfol: 1,
      dialogFormVisible: false,
      labelPosition: "right",
      value: "",
      multipleSelection: [],
      xl: 1,
    };
  },
  //加载过程的动作
  created() {
    //this.load()
    //this.load();
    this.Find();
    this.FindDepartment();
  },
  //页面控件的事件方法
  methods: {
    load() {
      request.get("/test").then((res) => {
        if (res.code === "0") {
          this.tableData = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    add() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    edit(obj) {
      console.log(typeof obj.sign);
      this.form = obj;
      this.dialogFormVisible = true;
    },
    del(id) {
      request.delete("/test/" + id).then((res) => {
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
    FindDepartment() {
      request.get("/department/findDepartment").then((res) => {
        if (res.code === "0") {
          this.departments = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    Find() {
      request.get("/test/search", {params: this.params}).then((res) => {
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
      this.params = {
        userName: "",
        departmentName: "",
        pageNum: 1,
        pageSize: 5,
      };
      this.Find();
    },
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize;
      this.Find();
    },
    handleCurrentChange(pageNum) {
      this.params.pageNum = pageNum;
      this.Find();
    },
    submit() {
      if (this.form.phone.length > 11) {
        this.$message({
          message: "手机号长度不能超过11位",
          type: "error",
        });
        return;
      }
      request.post("/test/add", this.form).then((res) => {
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
    delMuch() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择要删除的行",
          type: "error",
        });
        return;
      }
      request.put("/test/deleteMuch", this.multipleSelection).then((res) => {
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    rowKey(row) {
      return row.id;
    },
    exp() {
      let user = localStorage.getItem("user");
      location.href =
          "http://localhost:8085/api/test/export?token=" + JSON.parse(user).token;
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
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>