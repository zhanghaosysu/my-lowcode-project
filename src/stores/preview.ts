import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('preview', () => {
  const previewIsVisible = ref(false);
  const setPreviewVisible = (visible: boolean) => {
    previewIsVisible.value = visible;
  } 
  return { previewIsVisible, setPreviewVisible };
});