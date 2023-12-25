import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("contentMenu", () => {
  const menuTop = ref(0); // 右键菜单时的坐标
  const menuLeft = ref(0);
  const menuShow = ref(false);

  const showMenu = (top: number, left: number) => {
    menuTop.value = top;
    menuLeft.value = left;
    menuShow.value = true;
  };

  const hideMenu = () => {
    menuShow.value = false;
  };

  return {
    menuTop,
    menuLeft,
    menuShow,
    showMenu,
    hideMenu,
  };
});
