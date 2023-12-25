import useComponentData from "@/stores";
import useSnapshot from "@/stores/snapShot";
import useCopy from "@/stores/copy";

const ctrlKey = 93,
  commandKey = 91, // mac command
  vKey = 86, // 粘贴
  cKey = 67, // 复制
  xKey = 88, // 剪切
  deleteKey = 46; // 删除

let isCtrlOrCommandDown = false;
export default function listenGlobalKeyDown() {
  window.onkeydown = (e) => {
    const componentStore = useComponentData();
    const snapshotStore = useSnapshot();
    const copyStore = useCopy();
    const { keyCode } = e;
    if (keyCode === ctrlKey || keyCode === commandKey) {
      isCtrlOrCommandDown = true;
    } else if (keyCode === deleteKey && componentStore.curComponent) {
      componentStore.deleteComponent();
      snapshotStore.recordSnapshot();
    } else if (isCtrlOrCommandDown) {
      if (keyCode === vKey) {
        e.preventDefault();
        copyStore.paste();
        snapshotStore.recordSnapshot();
      } else if (keyCode === cKey) {
        e.preventDefault();
        copyStore.copy();
      } else if (keyCode === xKey) {
        e.preventDefault();
        copyStore.cut();
      }
    }
  };

  window.onkeyup = (e) => {
    const { keyCode } = e;
    if (keyCode === ctrlKey || keyCode === commandKey) {
      isCtrlOrCommandDown = false;
    }
  };
}
