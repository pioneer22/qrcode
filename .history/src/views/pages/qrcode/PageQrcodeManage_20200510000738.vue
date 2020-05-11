<template>
  <div>
    <el-card class="card" v-if="show===1">
      <div slot="header" style="text-align: center">
        <b>活码列表</b>
      </div>

      <el-table :data="tableData" :default-sort="{prop: 'id',order: 'ascending'}" style="width: 100%">
        <el-table-column label="ID" width="150" prop="id" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="二维码" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width: 80px;height: 80px;" />
          </template>
        </el-table-column>
        <el-table-column label="活码标题" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="今日扫码次数" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.dayNum || '未知' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总扫码次数" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.allNum || '未知' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="活码创建日期" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑活码</el-button>
            <el-button size="mini" @click="handleEditChild(scope.$index, scope.row)">编辑子码</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除活码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="card" v-if="show===2">
      <div slot="header">
        <el-button size="mini" @click="handleAddChild">新增子码</el-button>
        <el-button size="mini" @click="backPage">返回上一页</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="ID" width="150" sortable prop="id">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="150" sortable prop="sortid">
          <template slot-scope="scope">
            <span>{{ scope.row.sortid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="二维码" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width: 80px;height: 80px;" />
          </template>
        </el-table-column>
        <el-table-column label="子码标题" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="识别量" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.dayNum || '未知' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="子码上传日期" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEditCurrentChild(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteChild(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="card" v-if="show===3">
      <el-form :model="childData" :rules="rules" ref="childData" label-width="100px">
        <el-form-item label="子码标题" prop="title">
          <el-input v-model="childData.title" style="width:212px;"></el-input>
        </el-form-item>

        <el-form-item label="子码排序" prop="sortid">
          <el-input v-model="childData.sortid" style="width:212px;"></el-input>
        </el-form-item>

        <div style="padding-left: 20px;">
          <el-upload 
            class="upload-demo" 
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
          <div style="padding: 20px 0;">
            <img :src="childData.url" style="width: 80px;height: 80px;"/>
          </div>
          <br />
        </div>


        <el-form-item>
          <el-button type="primary" @click="submitForm('childData')">立即提交</el-button>
          <el-button @click="backPage">返回上一页</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
  import { changeTitle } from '@/api/qrcode'
  export default {
    name: 'PageQrcodeManage',
    data() {
      return {
        show: 1,
        tableData: [{
          id: 1,
          date: '2020-05-01',
          img: require('@/assets/img/about/my-logo.png'),
          title: '活码1',
          sortid: 2
        },
        {
          id: 2,
          date: '2020-05-02',
          img: require('@/assets/img/about/my-logo.png'),
          title: '活码2',
          sortid: 1
        }],

        childDatas: [],
        childData: {},

        ruleForm: {
          title: '子码标题',
          num: 100,
          region: 7
        },



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

    watch: {
      'childData.sortid': {
        handler(){
          this.childData.sortid = parseInt(this.childData.sortid)
        }
      }
    },

    methods: {
      // 编辑活码，修改标题
      handleEdit(index, row) {
        let id = row.id
        this.$MessageBox.prompt(`请输入ID为${id}的活码要更新的标题~`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: (value) => { return value.length < 2 ? '标题长度小于2' : true },
        }).then(({ value }) => {
          let params = { title: value, id }
          changeTitle(params).then(data => {
            console.log("changeTitle:", data)
          }).catch(err => {
            console.log("changeTitleErr:", err)
          })
        }).catch(() => { });
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

      // 新增子码
      handleAddChild() {

      },

      // 编辑选中子码
      handleEditCurrentChild(index, row) {
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

      // 返回上一页
      backPage() {
        this.show = this.show - 1
        if (this.show === 2) {
          // 重新请求，刷新数据
        }
      },

      // 提交更改
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 将数据图片传到后台处理
            console.log("this.fileList:", this.fileList)
            alert('submit!')
          } else {
            return false
          }
        })
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$MessageBox.confirm(`确定移除 ${file.name}？`);
      }
    }
  }
</script>

<style scoped>
  .card {
    width: 1200px;
  }

  .el-table th>>>.cell {
    text-align: center;
  }

  .el-table>>>.cell {
    text-align: center;
  }
</style>