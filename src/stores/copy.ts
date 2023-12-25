import { deepCopy, generateID } from "@/utils/util";
import { ref } from "vue";
import { defineStore } from "pinia";
import { reactive } from "vue";
import useComponentData from ".";
import useContextMenu from "./ContextMenu";
import toast from "@/utils/toast";

export default defineStore("copyStore", () => {
  let copyData = reactive({} as any);
  const isCut = ref(false);
  const componentStore = useComponentData();
  const menuStore = useContextMenu();

  // 恢复上一次的剪切数据
  const restorePreCutData = () => {
    if (isCut.value && copyData) {
      const data = deepCopy(copyData.data);
      const index = copyData.index;
      componentStore.addComponent(data, index);
    }
  };

  const copyDataOp = () => {
    copyData = {
      data: deepCopy(componentStore.curComponent),
      index: componentStore.componentData.findIndex(
        (com) => com.id === componentStore.curComponent.id
      ),
    };
  };

  const copy = () => {
    if (!componentStore.curComponent) {
      toast("请选中一个组件");
      return;
    }
    // 如果有剪切的数据，需要先还原
    restorePreCutData();
    copyDataOp();

    isCut.value = false;
  };

  const paste = (isMouse?: boolean) => {
    if (!(copyData && copyData.data)) {
      toast("请选中一个组件");
      return;
    }
    // 说明是通过右键菜单复制，将组件显示在菜单处
    if (isMouse) {
      copyData.data.style.top = menuStore.menuTop;
      copyData.data.style.left = menuStore.menuLeft;
    } else {
      // 通过快捷键复制。为了防止完全覆盖原组件，给复制后的组件一个偏移
      copyData.data.style.top += 10;
      copyData.data.style.left += 10;
    }
    const copyComponent = deepCopy(copyData.data);
    // 给复制的组件一个新的id
    copyComponent.id = generateID();
    componentStore.addComponent(copyComponent);
    if (isCut.value) {
      copyData = null;
    }
  };

  const cut = () => {
    if (!componentStore.curComponent) {
        toast("请选中一个组件");
        return;
    }
    // 如果重复剪切，需要恢复上一次剪切的数据
    restorePreCutData();
    copyDataOp();

    componentStore.deleteComponent();
    isCut.value = true;
  }

  return {
    copy,
    paste,
    cut,
  };
});
