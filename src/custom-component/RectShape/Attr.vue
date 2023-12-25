<!-- eslint-disable vue/multi-word-component-names -->
<!--组件对应的右边属性栏-->
<template>
  <div class="attr-list">
    <CommonAttr></CommonAttr>
    <div class="content">
      <el-text class="mx-1">内容</el-text>
    </div>
    <el-form>
      <el-form-item>
        <el-input
          v-model="store.curComponent.propValue"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import CommonAttr from "../common/CommonAttr.vue";
import useComponentData from "../../stores/index";
const store = useComponentData();
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
