<template>
  <div>
    <el-card class="card" shadow="hover">
      <div slot="header">
        <el-button size="mini" type="primary" @click="dialogFormVisible = true">新增用户</el-button>
        <div style="text-align: center;padding-top: 20px;">
          <b>用户列表</b>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="ID" sortable prop="id">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户名">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="密码">
          <template slot-scope="scope">
            <span>{{ scope.row.password }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户添加日期">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="handleEditCurrentChild(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDeleteChild(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" class="input"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" class="input"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUser('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { changeTitle } from '@/api/qrcode'
  export default {
    name: 'PageQrcodeManage',
    data() {
      return {
        tableData: [{
          id: 1,
          date: '2020-05-01',
          // img: require('@/assets/img/about/my-logo.png'),
          name: "门店1",
          password: '123456',

        },
        {
          id: 2,
          date: '2020-05-02',
          // img: require('@/assets/img/about/my-logo.png'),
          name: "门店2",
          password: '654321',
        }],

        dialogFormVisible: false,
        form: {
          name: '',
          password: ''
        },
        formLabelWidth: '120px'
      }
    },

    computed: {
      rules() {
        return {
          name: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 个字符以上', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入用户密码', trigger: 'blur' },
            { min: 6, max: 24, message: '长度在 6 个字符以上', trigger: 'blur' }
          ]
        }
      }
    },

    methods: {

      // 编辑子码
      handleEditChild(index, row) {
        this.childDatas = this.tableData
      },

      // 删除活码
      handleDelete(index, row) {
        let id = row.id
        this.$MessageBox.confirm(`此操作将永久删除ID为${id}的活码, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1)
          /* this.$message({
            type: 'success',
            message: '删除成功!'
          }); */
        }).catch(() => { });
      },


      // 提交添加
      submitUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {


          } else {
            this.$message({
              showClose: true,
              message: '请输入添加的用户信息~',
              type: 'error'
            });
          }
        })
      }

    }
  }
</script>

<style scoped>
  .card {
    /* min-width: fit-content; */
    max-width: 100%;
  }

  .input {
    width: 250px;
  }

  .el-table th>>>.cell {
    text-align: center;
  }

  .el-table>>>.cell {
    text-align: center;
  }
</style>