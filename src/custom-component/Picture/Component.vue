<!--画布上显示的组件-->
<template>
  <div ref="PictureRef">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const props = defineProps(["element"]);
const PictureRef = ref();
const canvasRef = ref();
//显式指定在 <script setup> 组件中要暴露出去的属性
defineExpose({ PictureRef });
let ctx;

const drawImage = () => {
  const { width, height } = props.element.style;
  canvasRef.value.width = width;
  canvasRef.value.height = height;
  const image = document.createElement("img");
  image.src = props.element.propValue.url;
  image.onload = () => {
    ctx.drawImage(image, 0, 0, width, height);
  };
};

onMounted(() => {
  ctx = canvasRef.value.getContext("2d");
  drawImage();
});

watch(
  [() => props.element.style.width, () => props.element.style.height],
  () => {
    drawImage();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
