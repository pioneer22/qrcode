<template>
  <div>
    <el-card class="card" shadow="hover">
      <div slot="header">
        <el-button size="mini" type="primary" @click="openInsert">新增用户</el-button>
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
            <span>{{ scope.row.username }}</span>
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
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" class="input"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" class="input"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button type="primary" @click="submitUser('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { changeTitle } from '@/api/qrcode'
  import { insertUser } from '@/api/user'
  export default {
    name: 'PageQrcodeManage',
    data() {
      return {
        tableData: [{
          id: 1,
          date: '2020-05-01',
          username: "门店1",
          password: '123456',

        },
        {
          id: 2,
          date: '2020-05-02',
          username: "门店2",
          password: '654321',
        }],

        title: '',
        dialogFormVisible: false,
        form: {
          username: '',
          password: ''
        },
        formLabelWidth: '120px'
      }
    },

    computed: {
      rules() {
        return {
          username: [
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
      openInsert() {
        this.dialogFormVisible = true
        this.title = '新增用户'
        this.form.username = ''
        this.form.password = ''
      },

      // 取消添加
      cancelSubmit() {
        this.dialogFormVisible = false
        this.form.username = ''
        this.form.password = ''
      },

      // 提交添加/编辑
      submitUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.title == '新增用户') {
              // 添加用户
              let params = {
                username: this.form.username,
                password: this.form.password
              }
              insertUser(params).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '添加用户成功~'
                  })
                }
              }).catch(err => {
                this.$message.error('用户添加失败~')
              })

            } else {
              // 编辑用户

            }
          } else {
            this.$message({
              showClose: true,
              message: '请输入用户信息~',
              type: 'error'
            });
          }
        })
      },

      // 删除用户
      handleDelete(index, row) {
        console.log(row)
        this.$MessageBox.confirm('确定移除' + row.username + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除操作

          /*  this.$message({
             type: 'success',
             message: '删除成功!'
           }); */
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      // 编辑用户
      handleEdit(index, row) {
        this.dialogFormVisible = true
        this.title = '编辑用户'
        this.form.username = row.username
        this.form.password = row.password
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