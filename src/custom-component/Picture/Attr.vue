<!-- eslint-disable vue/multi-word-component-names -->
<!--组件对应的右边属性栏-->
<template>
    <div class="attr-list">
      <CommonAttr></CommonAttr>
    </div>
  </template>
  
  <script setup lang="ts">
  import CommonAttr from '../common/CommonAttr.vue';
  </script>
  <style lang="scss" scoped>
  .attr-list {
    overflow: auto;
    padding: 10px 14px;
    padding-top: 0;
    height: 100%;
    .content {
      margin-bottom: 8px;
    }
  }
  </style>
  