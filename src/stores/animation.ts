import { defineStore } from "pinia";
import useComponentData from "./index";

export default defineStore("animationStore", () => {
  const store = useComponentData();
  const addAnimation = (animate: { value: string; label: string}) => {
    store.curComponent.animations.push(animate);
  };
  const deleteAnimation = (index: number) => {
    store.curComponent.animations.splice(index, 1);
  };
  return {
    addAnimation,
    deleteAnimation
  };
});
