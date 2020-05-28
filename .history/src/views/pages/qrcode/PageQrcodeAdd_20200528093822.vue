<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="新建活码" name="first">
          <el-card shadow="hover" style="width: 100%;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="活码标题" prop="title">
                <el-input v-model="ruleForm.title" class="input" placeholder="请输入活码标题"></el-input>
              </el-form-item>

              <el-form-item label="设置阈值" prop="num">
                <el-input v-model="ruleForm.num" class="input" placeholder="请输入有效扫码次数"></el-input> 次
              </el-form-item>

              <el-form-item label="有效时间" prop="validity">
                <!--  <el-select v-model="ruleForm.validity" placeholder="请输入二维码有效时间">
                  <el-option v-for="day in 7" :label="day+' 天'" :value="day" :key="day"></el-option>
                </el-select> -->
                <el-input v-model="ruleForm.validity" class="input" placeholder="请输入二维码有效时间"></el-input> 天
              </el-form-item>

              <div class="upload-content">
                <el-upload class="upload-demo" ref="upload" :auto-upload="false" drag :action="url" list-type="picture"
                  :before-upload="beforeUpload" multiple :http-request="uploadFile">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip upload-tips" slot="tip">
                    只能上传jpg/png文件，且不超过2M</div>
                </el-upload>
                <br />
              </div>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :disabled="isable">生成活码</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>

        <!--       <el-tab-pane label="Upload" name="second">
          <el-card shadow="hover">
          </el-card>
        </el-tab-pane> -->
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import { uploadQrcode } from "@/api/qrcode"
  export default {
    name: 'PageQrcodeAdd',
    data() {
      return {
        url: process.env.VUE_APP_URL + "/qrcode/index/index",
        activeName: 'first',
        formData: 1,
        params: new FormData(),
        ruleForm: {
          title: '',
          num: 100,
          validity: 7
        },
        rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 个字符以上', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '请输入二维码阈值', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ],
          validity: [
            { required: true, message: '请输入二维码有效期', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ]
        },
        isable: false
      }
    },

    watch: {
      'ruleForm.num': {
        handler() {
          let num = parseInt(this.ruleForm.num)
          // this.ruleForm.num = isNaN(num) ? 0 : (num > 100 ? 100 : num)
          this.ruleForm.num = isNaN(num) ? 0 : num
        }
      },

      'ruleForm.validity': {
        handler() {
          let num = parseInt(this.ruleForm.validity)
          this.ruleForm.validity = isNaN(num) ? 7 : num
        }
      }
    },

    methods: {
      // 覆盖掉默认上传方法,触发开始上传文件事件（ this.$refs.upload.submit()）后，
      // 组件会遍历当前文件列表的的文件，并调用上传(uploadFile())方法，在(uploadFile())方法里会传入一个file参数
      uploadFile(file) {
        let index = this.formData
        this.params.append(`file${index}`, file.file)
        this.formData = parseInt(this.formData) + 1
      },

      // 生成活码
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isable = true
            if (this.$refs.upload.uploadFiles.length === 0) {
              this.$message({
                type: 'warning',
                message: '没有选择上传的二维码'
              })
            } else {
              // 将数据图片传到后台处理
              this.$refs.upload.submit();
              this.params.append('title', this.ruleForm.title);
              this.params.append('num', this.ruleForm.num);
              this.params.append('validity', this.ruleForm.validity);
              this.params.append('filesNum', this.formData - 1)

              uploadQrcode(this.params).then(res => {
                if (res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '新建活码成功~'
                  })
                  this.$router.push('/qrcode/manageCode')
                }
              }).catch(err => {
                console.log(err)
              })
            }
          } else {
            return false
          }
        })
      },

      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.$refs.upload.uploadFiles = []
        this.isable = false
      },

      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是JPG/PNG格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style scoped>
  .input {
    width: 212px;
  }

  .upload-content {
    padding-left: 20px;
  }

  .upload-tips {
    font-size: 15px;
    font-weight: bold;
  }
</style>