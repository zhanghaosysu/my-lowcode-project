<template>
  <div
    v-show="menuShow"
    :style="{ top: `${menuTop}px`, left: `${menuLeft}px` }"
    class="contextMenu"
  >
    <ul @mouseup="handleMouseUp">
      <template v-if="componentDataStore.curComponent">
        <li @click="copy">复制</li>
        <li @click="paste">粘贴</li>
        <li @click="cut">剪切</li>
        <li @click="deleteComponent">删除</li>
        <li @click="topComponent">置顶</li>
        <li @click="bottomComponent">置底</li>
        <li @click="upComponent">上移</li>
        <li @click="downComponent">下移</li>
      </template>
      <li v-else @click="paste">粘贴</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useComponentData from "@/stores";
import useContextMenu from "@/stores/ContextMenu";
import useCopy from "@/stores/copy";
import useSnapshot from "@/stores/snapShot";
import useLayer from "@/stores/layer";
import { storeToRefs } from "pinia";
const contextMenuStore = useContextMenu();
const componentDataStore = useComponentData();
const copyStore = useCopy();
const snapshotStore = useSnapshot();
const layerStore = useLayer();
// 必须用 storeToRefs 否则会中断响应性
const { menuShow, menuLeft, menuTop } = storeToRefs(contextMenuStore);

// 点击菜单时不取消当前组件的选中状态
const handleMouseUp = () => {
  if (componentDataStore.curComponent) {
    componentDataStore.setClickComponent(true);
  }
};

const copy = () => {
  copyStore.copy();
};

const cut = () => {
  copyStore.cut();
};

const paste = () => {
  // 通过鼠标右键粘贴
  copyStore.paste(true);
  snapshotStore.recordSnapshot();
};

const deleteComponent = () => {
  componentDataStore.deleteComponent();
  snapshotStore.recordSnapshot();
};

const topComponent = () => {
  layerStore.topComponent();
  snapshotStore.recordSnapshot();
};

const bottomComponent = () => {
  layerStore.bottomComponent();
  snapshotStore.recordSnapshot();
};

const upComponent = () => {
  layerStore.upComponent();
  snapshotStore.recordSnapshot();
};

const downComponent = () => {
  layerStore.downComponent();
  snapshotStore.recordSnapshot();
};
</script>

<style lang="scss" scoped>
.contextMenu {
  position: absolute;
  z-index: 1000;
  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
