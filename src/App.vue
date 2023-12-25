<template>
  <div class="app">
    <!-- <router-view></router-view> -->
    <Home></Home>
  </div> 
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import listenGlobalKeyDown from './utils/shortcutKey';
import Home from '@/views/Home';

onBeforeMount(() => {
  // 监听用户的按键操作，在按下特定按键时触发对应的操作
  listenGlobalKeyDown();
});
</script>

<style scoped>
  .app {
    position: relative;
    height: 100vh;
    width: 100%;
    background: #fff;
  }
</style>
