<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup name="Shape">
import { nextTick, ref } from "vue";
import events from "@/utils/event";
import useComponentData from "../../stores/index";
import useSnapshot from '../../stores/snapShot';
import useContentMenu from '../../stores/ContextMenu';
import runAnimation from "@/utils/runAnimation";
const props = defineProps({
  active: {
    required: true,
    type: Boolean,
  },
  element: {
    required: true,
    type: Object,
  },
  defaultStyle: {
    required: true,
    type: Object,
  },
});
const pointList = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"]; // 八个方向
const store = useComponentData();
const snapshotStore = useSnapshot();
const contextMenuStore = useContentMenu();
const shapeRef = ref();
events.on('runAnimation', () => {
  if (props.element.id === store.curComponent.id && shapeRef.value) {
    runAnimation(shapeRef.value, store.curComponent.animations);
  }
});
events.on('removeAnimation', (anmiantName) => {
  shapeRef.value.classList.remove(anmiantName);
});
// 关闭右键的菜单
const selectCurComponent = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
  contextMenuStore.hideMenu();
}
// 组件在画布中移动
function handleMouseDownOnShape(e: any) {
  e.stopPropagation();
  store.setCurComponent(props.element);
  store.setClickComponent(true);
  const startY = e.clientY;
  const startX = e.clientX;
  const startTop = Number(props.defaultStyle.top);
  const startLeft = Number(props.defaultStyle.left);
  const pos = { ...props.defaultStyle };
  //是否需要保存快照
  let needSave = false;
  const move = (moveEvent: any) => {
    // 移动后需要保存快照
    needSave = true;
    const curX = moveEvent.clientX;
    const curY = moveEvent.clientY;
    const deltX = curX - startX;
    const deltY = curY - startY;
    pos.top = startTop + deltY;
    pos.left = startLeft + deltX;
    store.setShapeStyle(pos);

    nextTick(() => {
      // 触发元素移动事件，用于显示标线、吸附功能
      // 后面两个参数代表鼠标移动方向
      // curY - startY > 0 true 表示向下移动 false 表示向上移动
      // curX - startX > 0 true 表示向右移动 false 表示向左移动
      // events.emit("move", {isDownward: curY - startY, isRightward: curX - startX});
      events.emit("move");
    });
  };
  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    // 触发元素停止移动事件，用于隐藏标线
    events.emit('unmove')
    // 拖动组件结束时保存快照
    needSave && snapshotStore.recordSnapshot();
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}
// 组件边上的8个小圆点
function getPointStyle(point: string) {
  const { width, height } = props.defaultStyle;
  const hasT = /t/.test(point);
  const hasB = /b/.test(point);
  const hasL = /l/.test(point);
  const hasR = /r/.test(point);
  let newLeft = 0;
  let newTop = 0;

  // 四个角的点
  if (point.length === 2) {
    newLeft = hasL ? 0 - 4 : width - 4;
    newTop = hasT ? 0 - 4 : height - 4;
  } else {
    // 上下两点的点，宽度居中
    if (hasT || hasB) {
      newLeft = width / 2 - 4;
      newTop = hasT ? 0 - 4 : height - 4;
    }

    // 左右两边的点，高度居中
    if (hasL || hasR) {
      newLeft = hasL ? 0 - 4 : width - 4;
      newTop = Math.floor(height / 2) - 4;
    }
  }

  const style = {
    left: `${newLeft}px`,
    top: `${newTop}px`,
  };

  return style;
}
// 点击小圆点放大缩小
const handleMouseDownOnPoint = (point: string, event: any) => {
  store.setClickComponent(true);
  event.stopPropagation();
  event.preventDefault();

  const pos = { ...props.defaultStyle };
  const height = Number(pos.height);
  const width = Number(pos.width);
  const top = Number(pos.top);
  const left = Number(pos.left);
  const startX = event.clientX;
  const startY = event.clientY;
  console.log("point");
  //是否需要保存快照
  let needSave = false;
  const move = (moveEvent: any) => {
    // 移动后需要保存快照
    needSave = true;
    const currX = moveEvent.clientX;
    const currY = moveEvent.clientY;
    const disY = currY - startY;
    const disX = currX - startX;
    const hasT = /t/.test(point);
    const hasB = /b/.test(point);
    const hasL = /l/.test(point);
    const hasR = /r/.test(point);
    const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
    const newWidth = width + (hasL ? -disX : hasR ? disX : 0);
    pos.height = newHeight > 0 ? newHeight : 0;
    pos.width = newWidth > 0 ? newWidth : 0;
    pos.left = left + (hasL ? disX : 0);
    pos.top = top + (hasT ? disY : 0);
    store.setShapeStyle(pos);
  };

  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    // 拖动组件结束时保存快照
    needSave && snapshotStore.recordSnapshot();
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
</script>

<template>
  <div
    class="shape"
    :class="{ active: props.active }"
    @mousedown="handleMouseDownOnShape"
    @click="selectCurComponent"
    ref="shapeRef"
  >
    <div
      v-for="item in props.active ? pointList : []"
      :key="item"
      class="shape-point"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.shape {
  position: absolute;
  box-sizing: border-box;

  &:hover {
    cursor: move;
  }
}
.active {
  user-select: none;
  outline: 1px solid red;
}

.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
  box-sizing: border-box;
}
</style>
