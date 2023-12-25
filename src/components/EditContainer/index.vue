<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts" name="EditContainer">
import useComponentData from "@/stores/index";
import Shape from "./Shape.vue";
import { getComponentStyle, getShapeStyle} from "@/utils/util";
import { storeToRefs } from "pinia";
import MarkLine from "./MarkLine.vue";
import ContextMenu from "./ContextMenu.vue";
import useContextMenu from "@/stores/ContextMenu";
const store = useComponentData();
const contextMenuStore = useContextMenu();
const { componentData, curComponent } = storeToRefs(store);

const handleContentMenu = (e: any) => {
  e.stopPropagation();
  e.preventDefault();

  // 计算菜单相对于编辑器的位移
  let target = e.target;
  let top = e.offsetY;
  let left = e.offsetX;
  while (target instanceof SVGElement) {
    target = target.parentNode;
  }

  // 右键时的top 与 left 必须以 container 画布为基准，如果在container 画布上的元素右键，则 target 是画布上的元素，
  // 所以需要一直往上找，知道找到最顶层的元素
  while (!target.className.includes("editor")) {
    left += target.offsetLeft;
    top += target.offsetTop;
    target = target.parentNode;
  }
  contextMenuStore.showMenu(top, left);
};
</script>

<template>
  <div class="editor" @contextmenu="handleContentMenu">
    <Shape
      v-for="(item, index) in componentData"
      :key="item.id"
      :default-style="item.style"
      :element="item"
      :active="item.id === (curComponent || {}).id"
      :style="getShapeStyle(item.style, index)"
    >
      <!--画布上的组件，在初始化时已注册-->
      <component
        :is="item.component"
        :id="'component' + item.id"
        :style="getComponentStyle(item.style, index)"
        :element="item"
      />
    </Shape>
    <MarkLine></MarkLine>
    <ContextMenu></ContextMenu>
  </div>
</template>

<style scoped lang="scss">
.editor {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
