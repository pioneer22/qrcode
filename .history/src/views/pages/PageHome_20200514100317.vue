<template>
  <div style="width: 100%;">
    <el-card style="margin-top: 20px;">

    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'PageHome',
    data() {
      return {
        formInline: {
          param1: '条件1',
          param2: '选项1'
        },
        tableData: [],
        rules: {
          param1: [
            { required: true, message: '请输入', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          param2: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
        },
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
        dialogFormVisible: false,
        form: {
          name: '',
          date: '',
          address: '',
          index: 0
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            requestUserQuery(this.formInline).then(res => {
              this.$message({
                message: '查询成功！',
                type: 'success'
              })
              this.pageTotal = res.data.length
              this.tableData = res.data
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleEdit(index, row) {
        this.form.index = index + (this.currentPage - 1) * this.pageSize
        this.form.name = row.name
        this.form.date = row.date
        this.form.address = row.address
        this.dialogFormVisible = true
      },
      handleDelete(index, row) {
        this.tableData.splice(index + (this.currentPage - 1) * this.pageSize, 1)
        this.pageTotal = this.tableData.length
        this.$message({
          message: '删除' + row.name + '成功！',
          type: 'success'
        })
      },
      handleSizeChange(size) {
        this.pagesize = size
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      modifyUser() {
        this.tableData[this.form.index].name = this.form.name
        this.tableData[this.form.index].date = this.form.date
        this.tableData[this.form.index].address = this.form.address
        this.dialogFormVisible = false
        this.$message({
          message: '修改' + this.form.name + '成功！',
          type: 'success'
        })
      }
    }
  }
</script>

<style scoped>
</style>