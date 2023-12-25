<script setup lang="ts" name="TopToolbar">
import useSnapshot from "@/stores/snapShot";
import useComponentData from "@/stores";
import useCanvansData from "@/stores/canvansData";
import usePreview from "@/stores/preview";
import { ElMessage } from "element-plus";
import UploadButton from "./UploadButton.vue";
const snapshotStore = useSnapshot();
const componentStore = useComponentData();
const canvansStore = useCanvansData();
const previewStore = usePreview();
const undo = () => {
  snapshotStore.undo();
};
const redo = () => {
  snapshotStore.redo();
};
const preview = () => {
  previewStore.setPreviewVisible(true);
}
const save = () => {
  localStorage.setItem('canvasData', JSON.stringify(componentStore.componentData));
  localStorage.setItem('canvasStyle', JSON.stringify(canvansStore.canvansStyleData));
  ElMessage({
    message: '保存成功',
    type: 'success',
  })
}
</script>

<template>
  <div class="toolbar">
    <el-row>
      <el-col :span="6"><el-button type="primary" @click="undo">撤销</el-button></el-col>
      <el-col :span="6"><el-button type="primary" @click="redo">重做</el-button></el-col>
      <el-col :span="6"><el-button type="primary" @click="preview">预览</el-button></el-col>
      <el-col :span="6"><el-button type="primary" @click="save">保存</el-button></el-col>
      <el-col :span="12"><UploadButton :max-size="2"></UploadButton></el-col>
    </el-row>
  </div>
</template> 

<style lang="scss" scoped>
.toolbar {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
}
.el-row {
  flex-wrap: nowrap;
}
</style>
