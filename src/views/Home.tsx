/* eslint-disable vue/multi-word-component-names */
import EditLeft from "../components/EditLeft.vue";
import EditRight from "../components/EditRight/index.vue";
import EditContainer from "../components/EditContainer/index.vue";
import TopToolBar from "@/components/TopToolBar.vue";
import styles from "./Home.module.scss";
import { defineComponent, ref } from "vue";
import { deepCopy, generateID, getCanvansStyle } from "../utils/util";
import useComponentData from "../stores/index";
import useSnapshot from "../stores/snapShot";
import useCanvansData from "../stores/canvansData";
import useContextMenu from "../stores/ContextMenu";
import { data } from "@/data";
import Preview from "@/components/Preview/index.vue";

export default defineComponent({
  setup() {
    const store = useComponentData();
    const snapshotStore = useSnapshot();
    const canvansStore = useCanvansData();
    const contextMenuStore = useContextMenu();
    const contentref = ref();
    const handleDrop = (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      const index = Number(e.dataTransfer.getData("index"));
      const rectInfo = contentref.value.getBoundingClientRect();
      if (index >= 0) {
        const component = deepCopy(data.blocks[index]);
        component.style.top = e.clientY - rectInfo.y - component.style.height / 2;
        component.style.left = e.clientX - rectInfo.x - component.style.width / 2;
        component.id = generateID();
        store.addComponent(component);
        // 保存快照
        snapshotStore.recordSnapshot();
      }
    };
    const handleDragOver = (e: any) => {
      e.preventDefault();
    };
    const handleDragEnter = (e: any) => {
      e.preventDefault();
    };
    const deselectCurComponent = (e: any) => {
      if (!store.isClickComponent) {
        store.setCurComponent(null);
      }
      // 0 左击 1 滚轮 2 右击
      if (e.button !== 2) {
        contextMenuStore.hideMenu();
      }
    };
    const handleMouseDown = (e: any) => {
      e.stopPropagation();
      store.setClickComponent(false);
    };
    return () => (
      <div class={styles.editor}>
        <div class={styles["editor-left"]}>
          <EditLeft data={data.blocks}></EditLeft>
        </div>
        <div class={styles["editor-top"]}>
          <TopToolBar></TopToolBar>
        </div>
        <div class={styles["editor-right"]}>
          <EditRight></EditRight>
        </div>
        <div class={styles["editor-container"]}>
          <div class={styles["editor-container-canvas"]}>
            <div
              class={styles["editor-container-canvas-content"]}
              onDrop={handleDrop}
              onDragover={handleDragOver}
              onDragenter={handleDragEnter}
              onMousedown={handleMouseDown}
              onMouseup={deselectCurComponent}
              ref={contentref}
              style={getCanvansStyle(canvansStore.canvansStyleData)}
            >
              <EditContainer></EditContainer>
            </div>
          </div>
        </div>
        <Preview></Preview>
      </div>
    );
  },
});
