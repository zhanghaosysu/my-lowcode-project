<!-- eslint-disable vue/multi-word-component-names -->
<!--右侧属性列表-->
<template>
  <el-tabs v-if="store.isClickComponent" v-model="activeName">
    <el-tab-pane label="属性" name="attr">
      <!--组件对应的右侧属性栏，在初始化时已注册-->
      <component :is="store.curComponent.component + 'Attr'" />
    </el-tab-pane>
    <el-tab-pane label="动画" name="animation" style="padding-top: 20px;">
      <AnimationList />
    </el-tab-pane>
    <el-tab-pane label="事件" name="events" style="padding-top: 20px;">
      <EventList />
    </el-tab-pane>
  </el-tabs>
  <CanvansAttr v-else></CanvansAttr>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useComponentData from "../../stores/index";
import CanvansAttr from "./CanvansAttr.vue";
import EventList from "./EventList.vue";
import AnimationList from "./AnimationList.vue";
const store = useComponentData();
const activeName = ref("attr");
</script>

<style lang="scss" scoped></style>
