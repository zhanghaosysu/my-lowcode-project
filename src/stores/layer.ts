import { defineStore, storeToRefs } from "pinia";
import useComponentData from ".";
import toast from "@/utils/toast";
import { swap } from "@/utils/util";

export default defineStore("layerStore", () => {
  const componentStore = useComponentData();
  const { componentData, curComponent } = storeToRefs(componentStore);
  const upComponent = () => {
    const curIndex = componentData.value.findIndex(
      (com) => com.id === curComponent.value.id
    );
    if (curIndex < componentData.value.length - 1) {
      swap(componentData.value, curIndex, curIndex + 1);
    } else {
      toast("已经到顶了");
    }
  };

  const downComponent = () => {
    const curIndex = componentData.value.findIndex(
      (com) => com.id === curComponent.value.id
    );
    if (curIndex > 0) {
      swap(componentData.value, curIndex, curIndex - 1);
    } else {
      toast("已经到底了");
    }
  };

  const topComponent = () => {
    const curIndex = componentData.value.findIndex(
      (com) => com.id === curComponent.value.id
    );
    if (curIndex < componentData.value.length - 1) {
      componentData.value.splice(curIndex, 1);
      componentData.value.push(curComponent);
    } else {
      toast("已经到顶了");
    }
  };

  const bottomComponent = () => {
    const curIndex = componentData.value.findIndex(
      (com) => com.id === curComponent.value.id
    );
    if (curIndex > 0) {
      componentData.value.splice(curIndex, 1);
      componentData.value.unshift(curComponent);
    } else {
      toast("已经到底了");
    }
  };

  return {
    upComponent,
    downComponent,
    topComponent,
    bottomComponent
  };
});
