<template>
  <div>
    <el-card class="card" v-if="show===1" shadow="hover">
      <div slot="header" class="title1">
        <b>活码列表</b>
      </div>

      <el-table :data="tableData" :default-sort="{prop: 'id',order: 'ascending'}" style="width: 100%"
        v-if="tableData.length > 0">
        <el-table-column label="ID" sortable prop="id" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="二维码" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.url" class="image" />
          </template>
        </el-table-column>
        <el-table-column label="活码标题" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="扫码总数" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.sum }}</span>
          </template>
        </el-table-column>

        <el-table-column label="活码创建日期" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="活码更新日期" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.update_time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="400">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="handleEditChild(scope.$index, scope.row)">子码列表</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑活码</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除活码</el-button>
            <el-button size="mini" type="warning" @click="handleDownload(scope.$index, scope.row)">下载活码</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-else>
        还没有生成的活码~
      </div>
    </el-card>

    <el-card class="card" v-if="show===2" shadow="hover">
      <div slot="header">
        <el-button size="mini" @click="handleAddChild">新增子码</el-button>
        <el-button size="mini" @click="backPage">返回上一页</el-button>
        <div class="title1">
          <b>子码列表</b>
        </div>
      </div>

      <el-table :data="childDatas" style="width: 100%">
        <el-table-column label="ID" sortable prop="id" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序" sortable prop="sortid" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.subcode_sort }}</span>
          </template>
        </el-table-column>
        <el-table-column label="二维码" width="150">
          <template slot-scope="scope">
            <img :src="scope.row.subcode_url" class="image" />
          </template>
        </el-table-column>
        <el-table-column label="子码标题" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.subcode_title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="识别量" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.usage_count }}</span>
          </template>
        </el-table-column>

        <el-table-column label="子码上传日期" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="子码到期日期" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.update_time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="阈值" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.toplimit }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="400">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEditCurrentChild(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteChild(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="card" v-if="show===3" shadow="hover">
      <div class="title">
        <b>{{ childTitle }}</b>
      </div>
      <el-form :model="childData" :rules="rules" ref="childData" label-width="100px">
        <el-form-item label="子码标题" prop="subcode_title">
          <el-input v-model="childData.subcode_title" class="input"></el-input>
        </el-form-item>

        <el-form-item label="子码排序" prop="subcode_sort">
          <el-input v-model="childData.subcode_sort" class="input"></el-input>
        </el-form-item>

        <div v-if="childTitle != '编辑子码'">
          <el-form-item label="设置阈值" prop="toplimit">
            <el-input v-model="childData.toplimit" class="input" placeholder="请输入有效扫码次数"></el-input> 次
          </el-form-item>

          <el-form-item label="有效时间" prop="validity">
            <el-select v-model="childData.validity" placeholder="请输入二维码有效时间">
              <el-option v-for="day in 7" :label="day+' 天'" :value="day" :key="day"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div style="padding-left: 20px;" v-if="childTitle != '编辑子码'">
          <el-upload ref="upload" class="upload-demo" :action="url" :show-file-list="false" :on-change="handleChange"
            :limit="1" :auto-upload="false" list-type="picture-card" :http-request="uploadFile">
            <img v-if="childImg" :src="childImg" style="width: 100%;height: 100%;">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M，且只能上传一张二维码图片</div>
          </el-upload>
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
  import { changeTitle, editChildQrcode, requestQrcode, requestChildQrcode, deleteQrcode, deleteChildQrcode, addChildQrcode } from '@/api/qrcode'
  import utils from '@/utils/globalVal'
  export default {
    name: 'PageQrcodeManage',
    data() {
      return {
        url: process.env.VUE_APP_URL + "/qrcode/index/index",
        show: 1,
        tableData: [],
        childDatas: [],

        childData: {
          subcode_title: '',
          subcode_sort: '',
          toplimit: '',
          validity: ''
        },
        childImg: '',
        childTitle: '',
        formData: new FormData(),
        topid: 0
      }
    },

    created() {
      this.getData()
    },

    computed: {
      rules() {
        return {
          subcode_title: [
            { required: true, message: '请输入子码标题', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 个字符以上', trigger: 'blur' }
          ],
          subcode_sort: [
            { required: true, message: '请输入排序值', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ],
          toplimit: [
            { required: true, message: '请输入二维码阈值', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ],
          validity: [
            { required: true, message: '请选择二维码有效期', trigger: 'change' }
          ]
        }
      }
    },

    watch: {
      'childData.subcode_sort': {
        handler() {
          this.childData.subcode_sort = isNaN(parseInt(this.childData.subcode_sort)) ? 0 : parseInt(this.childData.subcode_sort)
        }
      },
      'childData.toplimit': {
        handler() {
          this.childData.toplimit = isNaN(parseInt(this.childData.toplimit)) ? 0 : parseInt(this.childData.toplimit)
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
          changeTitle(params).then(res => {
            if (res.code === 200) {
              let i = this.tableData.indexOf(row)
              this.tableData[i]['title'] = value
              this.$message({
                type: 'success',
                message: '更新成功~'
              });
            }
          }).catch(err => {
            this.$message.error('更新失败~')
          })
        }).catch(() => { });
      },

      // 编辑子码
      handleEditChild(index, row) {
        let params = {
          primary_key_id: row.id
        }
        this.topid = row.id // 保存活码id
        this.getChildQrcode(params)
      },

      // 删除活码
      handleDelete(index, row) {
        let _self = this
        let params = {
          id: row.id
        }
        this.$MessageBox.confirm(`此操作将永久删除ID为${row.id}的活码, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteQrcode(params).then(res => {
            if (res.code == 200) {
              _self.getData()
              this.$message({
                type: 'success',
                message: '删除成功~'
              });
            }
          }).catch(err => {
            this.$message.error('删除失败~')
          })
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
          subcode_title: '',
          subcode_sort: '',
          toplimit: '',
          validity: ''
        }
      },

      // 编辑选中子码
      handleEditCurrentChild(index, row) {
        this.childTitle = '编辑子码'
        this.childData = row
        this.show = 3
      },

      // 删除选中子码
      handleDeleteChild(index, row) {
        let params = {
          'admin_id': row.primary_key_id,
          'id': row.id
        }
        this.$MessageBox.confirm(`此操作将永久删除ID为${row.id}的子码, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteChildQrcode(params).then(res => {
            if (res.code === 200) {
              let paramsdata = {
                primary_key_id: row.primary_key_id
              }
              this.getChildQrcode(paramsdata)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }).catch(err => {
            this.$message.error('删除失败~')
          })
        }).catch(() => { });
      },

      // 返回上一页
      backPage() {
        this.show = this.show - 1
        if (this.show === 2) {
          this.childData = {}
        }
      },

      // 子码提交更改
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 编辑子码
            if (this.childTitle == '编辑子码') {
              let params = {
                'subcode_title': this.childData.subcode_title,
                'subcode_sort': this.childData.subcode_sort,
                'admin_id': this.childData.id,
                'id': this.childData.primary_key_id
              }
              editChildQrcode(params).then(res => {
                if (res.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '编辑子码成功~'
                  })
                  let paramsdata = {
                    primary_key_id: this.childData.primary_key_id
                  }
                  this.getChildQrcode(paramsdata)
                }
              }).catch(err => {
                this.$message.error('编辑子码失败~')
              })
            } else { // 新增子码
              if (this.$refs.upload.uploadFiles.length === 0) {
                this.$message({
                  type: 'warning',
                  message: '没有选择上传的二维码'
                })
              } else {
                this.$refs.upload.submit();
                this.formData.append('subcode_title', this.childData.subcode_title)
                this.formData.append('subcode_sort', this.childData.subcode_sort)
                this.formData.append('toplimit', this.childData.toplimit)
                this.formData.append('validity', this.childData.validity)
                this.formData.append('id', this.topid)

                addChildQrcode(this.formData).then(res => {
                  console.log("addChildQrcode:", res)
                  if (res.data.code === 200) {
                    this.$message({
                      type: 'success',
                      message: '新增子码成功~'
                    })
                    let paramsdata = {
                      primary_key_id: this.topid
                    }
                    this.getChildQrcode(paramsdata)
                  }
                }).catch(err => {
                  this.$message.error('新增子码失败~')
                })
              }
            }
          } else {
            return false
          }
        })
      },

      // 获取活码列表
      getData() {
        let params = {
          admin_id: this.$store.state.user.admin_id,
        }
        requestQrcode(params).then(res => {
          if (res.code === 200) {
            this.tableData = res.data
            this.tableData.map(v => {
              v.create_time = utils.getDate(new Date(v.create_time * 1000))
              v.update_time = v.update_time == 0 ? '无' : utils.getDate(new Date(v.update_time * 1000))
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },

      // 获取子码列表
      getChildQrcode(params) {
        requestChildQrcode(params).then(res => {
          if (res.code === 200) {
            this.childDatas = res.data
            this.childDatas.map(v => {
              v.create_time = utils.getDate(new Date(v.create_time * 1000))
              v.update_time = v.update_time == 0 ? '无' : utils.getDate(new Date(v.update_time * 1000))
            })
            this.show = 2
          }
        }).catch(err => {
          console.log("requestChildQrcode:", err)
        })
      },

      uploadFile(file) {
        this.formData = new FormData()
        this.formData.append('file', file.file)

        console.log("file:", file.file)
      },

      handleChange(file, fileList) {
        // this.$refs.upload.clearFiles();
        console.log('QQ:', file)
        console.log('QQ1:', fileList)
        let fileName = file.name;
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.childImg = URL.createObjectURL(file.raw)  // 获取URL
        } else {
          this.$message.error('请选择图片文件');
        }
      }
    }
  }
</script>

<style scoped>
  .card {
    /* min-width: fit-content; */
    max-width: 100%;
  }

  .image {
    max-width: 120px;
    max-height: 180px;
  }

  .title {
    text-align: center;
    padding-bottom: 20px;
    font-size: 20px;
  }

  .title1 {
    text-align: center;
    padding-top: 20px;
    font-size: 20px;
  }

  .input {
    width: 212px;
  }

  .el-table th>>>.cell {
    text-align: center;
  }

  .el-table>>>.cell {
    text-align: center;
  }
</style>