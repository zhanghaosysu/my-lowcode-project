import { defineStore } from "pinia";
import { ref } from "vue";
// 设置全局画布样式
export default defineStore("canvansData", () => {
  const canvansStyleData = ref({
    width: 1920,
    height: 740,
    scale: 100,
    color: "#000",
    opacity: 1,
    backgroundColor: "#fff",
    fontSize: 14,
  });
  const setCanvasStyle = (style: any) => {
    canvansStyleData.value = style;
  };
  return {
    canvansStyleData,
    setCanvasStyle,
  };
});
