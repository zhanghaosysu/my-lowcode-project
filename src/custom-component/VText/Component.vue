<!--画布上显示的组件-->
<template>
  <div ref="VTextRef">
    {{ props.element.propValue }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["element"]);
const VTextRef = ref();
defineExpose({ VTextRef });
</script>

<style lang="scss" scoped></style>
