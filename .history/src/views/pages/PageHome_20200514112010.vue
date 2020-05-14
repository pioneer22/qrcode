<template>
  <div style="width: 100%;">
    <el-card shadow="hover" ref="card">
      <el-carousel :interval="4000" arrow="always" height="600px">
        <el-carousel-item v-for="item in images" :key="item" class="carousel-item">
          <img :src="item" class="carousel-img" />
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
        images: [
          require('@/assets/img/banner1.png'),
          require('@/assets/img/banner2.jpg'),
          require('@/assets/img/banner3.jpg'),
        ]
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

  .carousel-item {
    background: white !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .carousel-img {
    max-width: 100%;
    max-height: 100%;
  }
</style>