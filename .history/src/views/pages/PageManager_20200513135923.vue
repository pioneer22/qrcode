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
      <el-form :model="form">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },

    computed: {
      rules() {
        return {
          title: [
            { required: true, message: '请输入子码标题', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 个字符以上', trigger: 'blur' }
          ],
          sortid: [
            { required: true, message: '请输入排序值', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ]
        }
      }
    },

    methods: {
      // 新增用户
      handleAddUser() {

      },

      // 编辑活码，修改标题
      handleEdit(index, row) {

      },

      // 编辑子码
      handleEditChild(index, row) {
        this.childDatas = this.tableData
        this.show = 2
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

      // 编辑选中子码
      handleEditCurrentChild(index, row) {
        this.childTitle = '编辑子码'
        this.childData = row
        this.childData['name'] = this.childData['title']
        this.childData['url'] = this.childData['img']
        this.show = 3
      },

      // 删除选中子码
      handleDeleteChild(index, row) {
        let id = row.id
        this.$MessageBox.confirm(`此操作将永久删除ID为${id}的子码, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.childDatas.splice(index, 1)
        }).catch(() => { });
      },

      // 提交更改
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 手动上传文件,当点击确定再上传图片
            this.$refs.upload.submit();

            // 将数据图片传到后台处理
            // console.log("submitForm", this.fileList)
            // alert('submit!')
          } else {
            return false
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

  .el-table th>>>.cell {
    text-align: center;
  }

  .el-table>>>.cell {
    text-align: center;
  }
</style>