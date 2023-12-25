import { deepCopy } from "@/utils/util";
import { defineStore } from "pinia";
import { ref } from "vue";
import useComponentData from ".";

export default defineStore('snapshot', () => {
    const snapshotData = ref([] as any[]);
    const snapshotIndex = ref(-1);
    const comDataStore = useComponentData();
  
    //新增组件
    //删除组件
    //改变图层层级
    //拖动组件结束时 需要触发保存快照操作
    //将当前的编辑器数据推入 snapshotData 数组，并增加快照索引
    const recordSnapshot = () => {
      // 添加新的快照
      snapshotData.value[++snapshotIndex.value] = deepCopy(comDataStore.componentData);
      // 在 undo 过程中，添加新的快照时，要将它后面的快照清理
      if (snapshotIndex.value < snapshotData.value.length - 1) {
          snapshotData.value = snapshotData.value.slice(0, snapshotIndex.value + 1)
      }
    }
  
    // 撤销
    const undo = () => {
      if (snapshotIndex.value >= 0) {
        snapshotIndex.value--;
        const components = deepCopy(snapshotData.value[snapshotIndex.value])|| [];
        comDataStore.setComponentData(components);
      }
    }
  
    // 重做
    const redo = () => {
      if (snapshotIndex.value < snapshotData.value.length - 1) {
        snapshotIndex.value++;
        comDataStore.setComponentData(deepCopy(snapshotData.value[snapshotIndex.value]));
      }
    }
  
    return {
      recordSnapshot,
      undo,
      redo,
    };
  })