<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <!-- Users -->
        <el-tab-pane :label="$t('permissions.user')" name="first" :lazy="true">


        </el-tab-pane>
        <!-- Roles -->
        <el-tab-pane :label="$t('permissions.role')" name="second" :lazy="true">

        </el-tab-pane>
        <!-- Pages -->
        <el-tab-pane :label="$t('permissions.page')" name="third" :lazy="true">

        </el-tab-pane>
        <!-- Database -->
        <el-tab-pane :label="$t('permissions.db')" name="fourth" :lazy="true">

        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import { requestPermissionsQuery } from '@/api/user'

  export default {
    name: 'PageUserPermissions',
    data() {
      return {
        activeName: 'first',
        selectOptions: {
          roleOption: [],
          pageOption: [],
          pathOption: [],
          dirOption: [],
          pageDirective: {}
        },
        users: {
          query: {
            id: '',
            name: '',
            role: []
          },
          table: [],
          tableAll: [],
          currentPage: 1,
          pageSize: 10,
          pageTotal: 0,
          dialogShow: false,
          dialogType: 'add',
          dialogForm: {
            id: '',
            name: '',
            roles: []
          },
          dialogRules: {
            name: [{ required: true, message: '请输入用户名字', trigger: 'blur' }]
          }
        },
        roles: {
          query: {
            id: '',
            name: '',
            page: '',
            path: '',
            directive: ''
          },
          table: [],
          tableAll: [],
          currentPage: 1,
          pageSize: 10,
          pageTotal: 0,
          dialogShow: false,
          dialogType: 'add',
          dialogForm: {
            id: '',
            name: '',
            pages: []
          },
          dialogRules: {
            name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
          }
        },
        pages: {
          query: {
            id: '',
            name: '',
            paths: [],
            directive: []
          },
          table: [],
          tableAll: [],
          currentPage: 1,
          pageSize: 10,
          pageTotal: 0,
          dialogShow: false,
          dialogType: 'add',
          dialogForm: {
            id: '',
            name: '',
            path: '',
            directive: []
          },
          dialogRules: {
            name: [{ required: true, message: '请输入页面名称', trigger: 'blur' }],
            path: [{ required: true, message: '请输入页面路径', trigger: 'change' }]
          }
        },
        dbData: {
          users: [],
          roles: [],
          pages: [],
          directive: []
        }
      }
    },
    methods: {
      dbDataToWebData() {
        let dbData = this.dbData
        let rolesJson = {}
        let pagesJson = {}
        let directiveJson = {}
        this.selectOptions.dirOption = []
        dbData.directive.forEach(directive => {
          if (!this.selectOptions.dirOption.includes(directive.name)) {
            this.selectOptions.dirOption.push(directive.name)
          }
          if (!directiveJson.hasOwnProperty(directive.pageId)) {
            directiveJson[directive.pageId] = []
          }
          directiveJson[directive.pageId].push({ id: directive.id, name: directive.name })
        })
        this.selectOptions.pageOption = []
        this.selectOptions.pathOption = []
        dbData.pages.forEach(page => {
          this.selectOptions.pageOption.push(page.name)
          this.selectOptions.pathOption.push(page.path)
          pagesJson[page.id] = {
            id: page.id,
            name: page.name,
            path: page.path,
            directive: directiveJson[page.id] || []
          }
          let directives = []
          pagesJson[page.id].directive.forEach(directive => {
            directives.push(directive.name)
          })
          this.selectOptions.pageDirective[page.name] = directives
          this.pages.tableAll.push({
            id: page.id,
            name: page.name,
            path: page.path,
            directive: directives
          })
        })
        this.pageTableFilter()
        this.selectOptions.roleOption = []
        dbData.roles.forEach(role => {
          this.selectOptions.roleOption.push(role.name)
          role.pageIds = role.pageIds || []
          role.directiveIds = role.directiveIds || []
          rolesJson[role.id] = {
            id: role.id,
            name: role.name,
            pages: role.pageIds.reduce((pagesArr, pageId) => {
              pagesArr.push(pagesJson[pageId] || { id: -1, name: 'Error', path: '/error/404', directive: [] })
              return pagesArr
            }, []),
            directive: role.directiveIds.reduce((directive, directiveId) => {
              directive.push(directiveJson[directiveId] || { id: -1, name: 'Error', path: '/error/404' })
              return directive
            }, [])
          }
          this.roles.tableAll.push({
            id: role.id,
            name: role.name,
            permission: role.pageIds.reduce((pagesArr, pageId) => {
              pagesArr.push({
                id: pagesJson[pageId].id,
                name: pagesJson[pageId].name,
                path: pagesJson[pageId].path,
                directive: pagesJson[pageId].directive.filter(dir => role.directiveIds.includes(dir.id))
              })
              return pagesArr
            }, [])
          })
          this.roles.pageTotal += 1
        })
        this.roleTableFilter()
        dbData.users.forEach(user => {
          this.users.tableAll.push({
            id: user.id,
            name: user.name,
            roles: user.roleIds.reduce((roles, roleId) => {
              roles.push(rolesJson[roleId].name)
              return roles
            }, [])
          })
        })
        this.userTableFilter()
      },
      /* Users */
      userTableFilter() {
        this.users.table = []
        this.users.pageTotal = 0
        this.users.tableAll.forEach(user => {
          if (this.users.query.id && user.id.toString() !== this.users.query.id) {
            return
          }
          if (user.name.indexOf(this.users.query.name) === -1) {
            return
          }
          if (this.users.query.role.length !== 0 &&
            this.users.query.role.filter(role => user.roles.includes(role)).length === 0) {
            return
          }
          this.users.table.push(user)
          this.users.pageTotal += 1
        })
      },
      userHandleAdd() {
        this.users.dialogType = 'add'
        this.users.dialogForm.id = ''
        this.users.dialogForm.name = ''
        this.users.dialogForm.roles = []
        this.users.dialogShow = true
      },
      userHandleEdit(index, row) {
        this.users.dialogType = 'modify'
        this.users.dialogForm.id = this.users.table[index].id
        this.users.dialogForm.name = this.users.table[index].name
        this.users.dialogForm.roles = this.users.table[index].roles
        this.users.dialogShow = true
      },
      userDialogSubmit() {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            if (this.users.dialogType === 'add') {
              this.$message({
                message: '（假消息）添加用户成功！',
                type: 'success'
              })
            } else {
              this.$message({
                message: '（假消息）修改用户成功！',
                type: 'success'
              })
            }
            this.users.dialogShow = false
          } else {
            return false
          }
        })
      },
      userHandleDelete(index, row) {
        this.$message({
          message: '（假消息）删除git用户成功！',
          type: 'success'
        })
      },
      userHandleSizeChange(size) {
        this.users.pagesize = size
      },
      userHandleCurrentChange(currentPage) {
        this.users.currentPage = currentPage
      },
      /* Roles */
      roleTableFilter() {
        this.roles.table = []
        this.roles.pageTotal = 0
        this.roles.tableAll.forEach(role => {
          if (this.roles.query.id && role.id.toString() !== this.roles.query.id) {
            return
          }
          if (role.name.indexOf(this.roles.query.name) === -1) {
            return
          }
          let accordPage = false
          let accordPath = false
          let accordDir = false
          role.permission.forEach(per => {
            if (this.roles.query.page.length === 0 || this.roles.query.page.includes(per.name)) {
              accordPage = true
            }
            if (this.roles.query.path.length === 0 || this.roles.query.path.includes(per.path)) {
              accordPath = true
            }
            if (this.roles.query.directive.length === 0 ||
              per.directive.filter(_dir => this.roles.query.directive.includes(_dir.name)).length !== 0) {
              accordDir = true
            }
          })
          if (accordPage && accordPath && accordDir) {
            this.roles.table.push(role)
            this.roles.pageTotal += 1
          }
        })
      },
      roleHandleAdd() {
        this.roles.dialogType = 'add'
        this.roles.dialogForm.id = ''
        this.roles.dialogForm.name = ''
        this.roles.dialogForm.pages = []
        this.roles.dialogShow = true
      },
      roleHandleEdit(index, row) {
        this.roles.dialogType = 'modify'
        this.roles.dialogForm.id = this.roles.table[index].id
        this.roles.dialogForm.name = this.roles.table[index].name
        this.roles.dialogForm.pages = this.roles.table[index].permission.reduce((pages, per) => {
          pages.push(per.name)
          return pages
        }, [])
        this.roles.dialogShow = true
      },
      roleDialogSubmit() {
        this.$refs['roleForm'].validate((valid) => {
          if (valid) {
            if (this.roles.dialogType === 'add') {
              this.$message({
                message: '（假消息）添加角色成功！',
                type: 'success'
              })
            } else {
              this.$message({
                message: '（假消息）修改角色成功！',
                type: 'success'
              })
            }
            this.roles.dialogShow = false
          } else {
            return false
          }
        })
      },
      roleHandleDelete(index, row) {
        this.$message({
          message: '（假消息）删除角色成功！',
          type: 'success'
        })
      },
      roleHandleSizeChange(size) {
        this.roles.pagesize = size
      },
      roleHandleCurrentChange(currentPage) {
        this.roles.currentPage = currentPage
      },
      /* Pages */
      pageTableFilter() {
        this.pages.table = []
        this.pages.pageTotal = 0
        this.pages.tableAll.forEach(page => {
          if (this.pages.query.id && page.id.toString() !== this.pages.query.id) {
            return
          }
          if (page.name.indexOf(this.pages.query.name) === -1) {
            return
          }
          if (this.pages.query.paths.length !== 0 && !this.pages.query.paths.includes(page.path)) {
            return
          }
          if (this.pages.query.directive.length !== 0 &&
            this.pages.query.directive.filter(dir => page.directive.includes(dir)).length === 0) {
            return
          }
          this.pages.table.push(page)
          this.pages.pageTotal += 1
        })
      },
      pagePathSuggest(queryString, cb) {
        let results = this.selectOptions.pathOption.reduce((paths, _pathName) => {
          if (_pathName.indexOf(queryString) !== -1) {
            paths.push({ value: _pathName })
          }
          return paths
        }, [])
        cb(results)
      },
      pageHandleAdd() {
        this.pages.dialogType = 'add'
        this.pages.dialogForm.id = ''
        this.pages.dialogForm.name = ''
        this.pages.dialogForm.path = ''
        this.pages.dialogForm.directive = []
        this.pages.dialogShow = true
      },
      pageHandleEdit(index, row) {
        this.pages.dialogType = 'modify'
        this.pages.dialogForm.id = this.pages.table[index].id
        this.pages.dialogForm.name = this.pages.table[index].name
        this.pages.dialogForm.path = this.pages.table[index].path
        this.pages.dialogForm.directive = this.pages.table[index].directive
        this.pages.dialogShow = true
      },
      pageDialogSubmit() {
        this.$refs['pageForm'].validate((valid) => {
          if (valid) {
            if (this.pages.dialogType === 'add') {
              this.$message({
                message: '（假消息）添加页面成功！',
                type: 'success'
              })
            } else {
              this.$message({
                message: '（假消息）修改页面成功！',
                type: 'success'
              })
            }
            this.pages.dialogShow = false
          } else {
            return false
          }
        })
      },
      pageHandleDelete(index, row) {
        this.$message({
          message: '（假消息）删除页面成功！',
          type: 'success'
        })
      },
      pageHandleSizeChange(size) {
        this.pages.pagesize = size
      },
      pageHandleCurrentChange(currentPage) {
        this.pages.currentPage = currentPage
      },
      onSubmit() {
        console.log(1)
      }
    },
    mounted() {
      requestPermissionsQuery().then(data => {
        this.dbData = data.permissions
        this.dbDataToWebData()
      })
    }
  }
</script>

<style scoped lang="scss">
  .my-role-permission {
    margin-top: 5px;
    display: block;
    height: auto;
    white-space: normal;
  }

  .my-db-instruction {
    margin-top: 20px;
    display: block;
    height: auto;

    ol {
      margin-left: 20px;
    }
  }
</style>