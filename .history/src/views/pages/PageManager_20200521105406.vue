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
        <el-table-column label="用户ID" sortable prop="admin_id">
          <template slot-scope="scope">
            <span>{{ scope.row.admin_id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户名">
          <template slot-scope="scope">
            <span>{{ scope.row.user_name }}</span>
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
  import { insertUser, deleteUser, editUser, requestUser } from '@/api/user'
  export default {
    name: 'PageQrcodeManage',
    data() {
      return {
        tableData: [],
        title: '',
        dialogFormVisible: false,
        form: {
          username: '',
          password: ''
        },
        formLabelWidth: '120px',
        userid: ''
      }
    },

    created() {
      this.getUser()
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
                  this.getUser()
                  this.dialogFormVisible = false
                }
              }).catch(err => {
                this.$message.error('添加用户失败~')
                this.dialogFormVisible = false
              })

            } else {
              // 编辑用户
              let params = {
                username: this.form.username,
                password: this.form.password
              }
              editUser(params).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '编辑用户成功~'
                  })
                  this.getUser()
                  this.dialogFormVisible = false
                }
              }).catch(err => {
                this.$message.error('编辑用户失败~')
                this.dialogFormVisible = false
              })

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

      handleDelete(index, row) {
        // 删除用户
        console.log(row)
        this.$MessageBox.confirm('确定移除' + row.username + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除操作
          let params = {
            status: del,
            id: row.admin_id
          }
          deleteUser(params).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除用户成功~'
              });
              this.getUser()
            }
          }).catch(err => {
            this.$message.error('删除用户失败~')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      async getUser() {
        let res = await requestUser()
        if (res.code === 200) {
          this.tableData = res.data
        }
      },

      openInsert() {
        this.dialogFormVisible = true
        this.title = '新增用户'
        this.form.username = ''
        this.form.password = ''
      },

      handleEdit(index, row) {
        // 编辑用户
        this.dialogFormVisible = true
        this.title = '编辑用户'
        this.form.username = row.username
        this.form.password = row.password
        this.userid = row.admin_id
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