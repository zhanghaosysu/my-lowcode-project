<template>
  <div
    v-for="line in lines"
    v-show="lineStatus[line] || false"
    :key="line"
    :ref="(ref: any) => handleRef(ref, line)"
    class="line"
    :class="line.includes('x') ? 'xline' : 'yline'"
  ></div>
</template>

<script setup lang="ts" name="MarkLine">
import events from "@/utils/event";
import useComponentData from "@/stores/index";
import { reactive } from "vue";
// 监听元素移动和不移动的事件
events.on("move", () => {
  showLine();
});
events.on("unmove", () => {
  hideLine();
});
const store = useComponentData();
const lines = reactive(["xt", "xc", "xb", "yl", "yc", "yr"]);
const linesRef = reactive({} as any);
const diff = 3; // 相距 dff 像素将自动吸附
const lineStatus: any = reactive({
  xt: false,
  xc: false,
  xb: false,
  yl: false,
  yc: false,
  yr: false,
});

const handleRef = (lineRef: any, line: string) => {
  if (lineRef) {
    linesRef[line] = lineRef;
  }
};

const hideLine = () => {
  Object.keys(lineStatus).forEach((key) => {
    lineStatus[key] = false;
  });
};

const showLine = () => {
  const {
    top: dragTop,
    left: dragLeft,
    height: dragHeight,
    width: dragWidth,
  } = store.curComponent.style;
  const dragHalfwidth = dragWidth / 2;
  const dragHalfHeight = dragHeight / 2;
  hideLine();
  store.componentData.forEach((com) => {
    if (com.id === store.curComponent.id) return;
    const { top, left, width, height } = com.style;
    const comHalfWidth = width / 2;
    const comHalfHeight = height / 2;
    // 出现辅助线的情况
    const conditions: any = {
      // 水平辅助线
      top: [
        {
          isNearly: isNearly(dragTop + dragHeight, top), //辅助线出现条件
          lineNode: linesRef["xt"], // 辅助线的引用
          line: "xt", // 辅助线名称
          dragShift: top - dragHeight, // 拖拽的元素自动向目标元素靠拢
          lineShift: top, // 辅助线坐标
        },
        {
          isNearly: isNearly(dragTop, top),
          lineNode: linesRef["xt"],
          line: "xt",
          dragShift: top,
          lineShift: top,
        },
        {
          isNearly: isNearly(dragTop + dragHalfHeight, top + comHalfHeight),
          lineNode: linesRef["xc"],
          line: "xc",
          dragShift: top + (comHalfHeight - dragHalfHeight),
          lineShift: top + comHalfHeight, 
        },
        {
          isNearly: isNearly(dragTop + dragHeight, top + height),
          lineNode: linesRef["xb"],
          line: "xb",
          dragShift: top + (height - dragHeight),
          lineShift: top + height,
        },
        {
          isNearly: isNearly(dragTop, top + height),
          lineNode: linesRef["xb"],
          line: "xb",
          dragShift: top + height,
          lineShift: top + height,
        },
      ],
      // 垂直辅助线
      left: [
        {
          isNearly: isNearly(dragLeft + dragWidth, left),
          lineNode: linesRef["yl"],
          line: "yl",
          dragShift: left -  dragWidth,
          lineShift: left,
        },
        {
          isNearly: isNearly(dragLeft, left),
          lineNode: linesRef["yl"],
          line: "yl",
          dragShift: left,
          lineShift: left,
        },
        {
          isNearly: isNearly(dragLeft + dragHalfwidth, left + comHalfWidth),
          lineNode: linesRef["yc"],
          line: "yc",
          dragShift: left + (comHalfWidth - dragHalfwidth),
          lineShift: left + comHalfWidth,
        },
        {
          isNearly: isNearly(dragLeft + dragWidth, left + width),
          lineNode: linesRef["yr"],
          line: "yr",
          dragShift: left + (width - dragWidth),
          lineShift: left + width,
        },
        {
          isNearly: isNearly(dragLeft, left + width),
          lineNode: linesRef["yr"],
          line: "yr",
          dragShift: left + width,
          lineShift: left + width,
        },
      ],
    };
    console.log(conditions, 'condition-----');
    Object.keys(conditions).forEach((key: string) => {
      // 遍历符合的条件并设置辅助线的样式
      conditions[key].forEach((condition: any) => {
        if (condition.isNearly) {
          // 设置辅助线
          condition.lineNode.style[key] = `${condition.lineShift}px`;
          lineStatus[condition.line] = true;
          // 吸附
          store.setShapeStyle({[key]: condition.dragShift});
        }
      });
    });
  });
};

const isNearly = (dragValue: number, targetValue: number) => {
  return Math.abs(dragValue - targetValue) <= diff;
};
</script>

<style lang="scss" scoped>
.line {
  background: #59c7f9;
  position: absolute;
  z-index: 1000;
}
.xline {
  width: 100%;
  height: 1px;
}

.yline {
  width: 1px;
  height: 100%;
}
</style>
