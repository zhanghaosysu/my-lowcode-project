<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div ref="container" class="bg" v-if="previewStore.previewIsVisible">
    <el-button class="close" @click="close">关闭</el-button>
    <el-button class="htmlToImage" @click="htmlToImage">保存为图片</el-button>
    <div class="canvas-container">
      <div
        class="canvas"
        :style="getCanvansStyle(canvansStore.canvansStyleData)"
      >
        <ComponentWrapper
          v-for="(item, index) in deepCopy(componentStore.componentData)"
          :key="index"
          :index="index"
          :config="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toPng } from "html-to-image";
import { ref } from "vue";
import { getCanvansStyle } from "@/utils/util";
import useCanvansData from "@/stores/canvansData";
import useComponentData from "@/stores";
import ComponentWrapper from "./ComponentWrapper.vue";
import { deepCopy } from "@/utils/util";
import usePreview from "@/stores/preview";

const canvansStore = useCanvansData();
const componentStore = useComponentData();
const previewStore = usePreview();
const container = ref();
const close = () => {
  previewStore.setPreviewVisible(false);
};
const htmlToImage = () => {
  toPng(container.value.querySelector(".canvas"))
    .then((dataUrl) => {
      const a = document.createElement("a");
      a.setAttribute("download", "screenshot");
      a.href = dataUrl;
      a.click();
    })
    .catch((error) => {
      console.error("oops, something went wrong!", error);
    })
    .finally(close);
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  background: rgb(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 20px;

  .canvas-container {
    width: calc(100% - 40px);
    height: calc(100% - 120px);
    overflow: auto;

    .canvas {
      background: #fff;
      position: relative;
      margin: auto;
    }
  }

  .close {
    position: absolute;
    right: 200px;
    top: 20px;
  }

  .htmlToImage {
    position: absolute;
    right: 80px;
    top: 20px;
  }
}
</style>
