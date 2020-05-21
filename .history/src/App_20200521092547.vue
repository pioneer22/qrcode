<template>
  <div id="app" v-cloak>
    <router-view />
  </div>
</template>

<style lang="scss">
  #app {
    height: 100%;
  }

  [v-cloak] {
    display: none !important;
  }
</style>