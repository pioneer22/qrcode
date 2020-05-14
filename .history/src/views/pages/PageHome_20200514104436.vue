<template>
  <div style="width: 100%;">
    <el-card shadow="hover" ref="card">
      <el-carousel :interval="4000" type="card" height="600px">
        <el-carousel-item v-for="item in 3" :key="item">
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
    mounted() {
      this.$nextTick(() => {
        // 获取elementui元素宽高
        // console.log(this.$refs.card.$el.clientHeight)
      })
    },
    methods: {



    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>