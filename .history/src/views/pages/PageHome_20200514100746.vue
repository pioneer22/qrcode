<template>
  <div style="width: 100%;">
    <el-card style="margin-top: 20px;">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'PageHome',
    data() {
      return {

      }
    },
    methods: {



    }
  }
</script>

<style scoped>

</style>