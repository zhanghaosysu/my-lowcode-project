import { ref } from 'vue'
import { defineStore } from 'pinia'
import toast from '@/utils/toast';

const useComponentData = defineStore('componentData', () => {
  const componentData = ref([] as any[]);
  const curComponent = ref(null as any);
  const isClickComponent = ref(false);
  function setCurComponent(component: any) {
    curComponent.value = component;
  }
  function addComponent(component: any, index?: number) {
    if (index !== undefined) {
      componentData.value.splice(index, 0, component);
    } else {
      componentData.value.push(component);
    }
  }
  // 必须要选中组件才能删除
  function deleteComponent() {
    if (curComponent.value) {
      componentData.value = componentData.value.filter((com) => com.id !== curComponent.value.id);
      curComponent.value = null;
      isClickComponent.value = false;
    } else {
      toast('请选中一个组件');
    }
  }
  function setComponentData(components: any[]) {
    componentData.value = components;
  }
  function setShapeStyle(style: any) {
    const { top, left, width, height } = style;
    if (top) curComponent.value.style.top = top;
    if (left) curComponent.value.style.left = left;
    if (width) curComponent.value.style.width = Math.round(width)
    if (height) curComponent.value.style.height = Math.round(height)
  }
  function setClickComponent(isClick: boolean) {
    isClickComponent.value = isClick;
  }

  return { 
    componentData, 
    curComponent, 
    isClickComponent, 
    addComponent, 
    deleteComponent,
    setComponentData,
    setCurComponent, 
    setShapeStyle, 
    setClickComponent 
  }
})

export default useComponentData;