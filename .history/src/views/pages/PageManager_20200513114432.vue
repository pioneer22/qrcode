<template>
  <div>
    <el-card class="card" shadow="hover">
      <div slot="header">
        <el-button size="mini" @click="handleAddChild">新增用户</el-button>
        <div style="text-align: center;padding-top: 20px;">
          <b>用户列表</b>
        </div>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="ID" width="150" sortable prop="id">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户名" width="150" sortable prop="name">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="密码" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.password }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户添加日期" width="150">
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
          img: "https://s1.ax1x.com/2020/05/11/YJubOe.jpg",
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

        childImg: '',
        childTitle: ''
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
        handler() {
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

      // 下载活码
      handleDownload(index, row) {
        const image = new Image();
        // 解决跨域 canvas 污染问题
        image.setAttribute('crossOrigin', 'anonymous');
        image.onload = function () {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, image.width, image.height);
          const url = canvas.toDataURL('image/png');
          // 生成一个 a 标签
          const a = document.createElement('a');
          // 创建一个点击事件
          const event = new MouseEvent('click');
          // 将 a 的 download 属性设置为我们想要下载的图片的名称，若 name 不存在则使用'图片'作为默认名称
          a.download = row.title || '图片';
          // 将生成的 URL 设置为 a.href 属性
          a.href = url;
          // 触发 a 的点击事件
          a.dispatchEvent(event);
        };
        image.src = row.img
      },

      // 新增子码
      handleAddChild() {
        this.childTitle = '新增子码'
        this.show = 3
        this.childData = {
          title: '子码标题',
          sortid: 1,
          url: ''
        }
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

      // 返回上一页
      backPage() {
        this.show = this.show - 1
        if (this.show === 2) {
          // 重新请求，刷新数据
          this.childData = {}
        }
      },

      handleChange(file, fileList) {
        this.$refs.upload.clearFiles();
        let fileName = file.name;
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.childImg = URL.createObjectURL(file.raw)  // 获取URL
        } else {
          this.$message.error('请选择图片文件');
        }
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
      },

      beforeUpload(file) {
        console.log("beforeUpload:", file)
      },

      // 图片上传成功
      handleSuccess(response, file, fileList) {
        // this.childImg = res.data
        // this.childData = fileList[0]
        this.childImg = fileList[0].url
        console.log("file:", fileList)
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