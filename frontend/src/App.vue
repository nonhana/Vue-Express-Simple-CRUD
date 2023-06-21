<template>
  <div class="app-wrap">
    <el-row type="flex" justify="center" style="width: 100%;">
      <router-view></router-view>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="less">
.app-wrap {
  position: relative;
  width: 100%;
}
</style>