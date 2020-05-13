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

      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'PageUserPermissions',
    data() {
      return {
        activeName: 'first',
      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">

</style>