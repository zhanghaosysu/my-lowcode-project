<!--画布上显示的组件-->
<template>
  <div class="rect-shape" ref="RectShapeRef">
    {{ props.element.propValue }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["element"]);
const RectShapeRef = ref();
//显式指定在 <script setup> 组件中要暴露出去的属性
defineExpose({ RectShapeRef });
</script>

<style lang="scss" scoped>
.rect-shape {
  width: 100%;
  height: 100%;
}
</style>
