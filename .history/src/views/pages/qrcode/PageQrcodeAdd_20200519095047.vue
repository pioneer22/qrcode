<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="上传二维码" name="first">
          <el-card shadow="hover" style="width: 100%;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="活码标题" prop="title">
                <el-input v-model="ruleForm.title" class="input"></el-input>
              </el-form-item>

              <el-form-item label="设置阈值" prop="num">
                <el-input v-model="ruleForm.num" class="input"></el-input> 次
              </el-form-item>

              <el-form-item label="有效时间" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请输入二维码有效时间">
                  <el-option v-for="day in 7" :label="day+' 天'" :value="day" :key="day"></el-option>
                </el-select>
              </el-form-item>

              <div class="upload-content">
                <el-upload class="upload-demo" ref="upload" :auto-upload="false" drag :action="url" list-type="picture"
                  :on-success="handleSuccess" :file-list="fileList" :before-upload="beforeUpload" multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip upload-tips" slot="tip">
                    只能上传jpg/png文件，且不超过2M</div>
                </el-upload>
                <br />
              </div>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">生成活码</el-button>
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
  export default {
    name: 'PageQrcodeAdd',
    data() {
      return {
        url: process.env.VUE_APP_URL + "/qrcode/index/create_qrcode",
        activeName: 'first',
        ruleForm: {
          title: '微信活码',
          num: 100,
          region: 7
        },
        rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 个字符以上', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '请输入二维码阈值', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择二维码有效期', trigger: 'change' }
          ]
        },

        fileList: [],

        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1
        }
      }
    },
    methods: {
      // 生成活码
      submitForm(formName) {
        console.log("??:", this.$refs.upload.uploadFiles)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 将数据图片传到后台处理
            this.$refs.upload.submit();
            /*  if (this.fileList.length === 0) {
               this.$message({
                 type: 'warning',
                 message: '没有选择上传的二维码'
               })
             } else {
               this.$refs.upload.submit();
             } */
          } else {
            return false
          }
        })
      },

      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields()
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
      },

      handleSuccess(response, file, fileList) {
        console.log("fileList:", fileList)
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