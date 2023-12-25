<template>
  <div>
    <div class="div-animation">
      <el-button @click="isShowAnimation = true">添加动画</el-button>
      <el-button @click="previewAnimate">预览动画</el-button>
      <div>
        <el-tag
          v-for="(tag, index) in componentDataStore.curComponent.animations"
          :key="index"
          closable
          @close="removeAnimation(index)"
        >
          {{ tag.label }}
        </el-tag>
      </div>
    </div>

    <!-- 选择动画 -->
    <Modal v-model="isShowAnimation">
      <el-tabs v-model="animationActiveName">
        <el-tab-pane
          v-for="item in animationClassData"
          :key="item.label"
          :label="item.label"
          :name="item.label"
        >
          <el-scrollbar>
            <div class="animate-container">
              <div
                v-for="animate in item.children"
                :ref="(ref) => handleRef(ref, animate.value)"
                :key="animate.value"
                class="animate"
                @mouseenter="runAnimationAttr(animate)"
                @click="addAnimation(animate)"
              >
                {{ animate.label }}
              </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import useComponentData from "@/stores";
import useAnimateData from "@/stores/animation";
import events from "@/utils/event";
import animationClassData from "@/utils/animationClassData";
import runAnimation from "@/utils/runAnimation";
import Modal from "./Modal.vue";

const isShowAnimation = ref(false);
const componentDataStore = useComponentData();
const animatedStore = useAnimateData();
const animationActiveName = ref("进入");
const eleRefs = reactive({});
const previewAnimate = () => {
  events.emit("runAnimation");
};
const removeAnimation = (index: number) => {
  events.emit(
    "removeAnimation",
    componentDataStore.curComponent.animations[index].value
  );
  animatedStore.deleteAnimation(index);
};

const handleRef = (elementRef: any, antimateName: string) => {
  if (elementRef) {
    eleRefs[antimateName] = elementRef;
  }
};

const runAnimationAttr = async (animate: any) => {
  if (animate.pending) return;

  animate.pending = true;
  await runAnimation(eleRefs[animate.value], [animate]);

  // 防止无限触发同一元素的动画
  setTimeout(() => {
    animate.pending = false;
  }, 100);
};

const addAnimation = (animate: {value: string; label: string}) => {
  animatedStore.addAnimation(animate);
  isShowAnimation.value = false;
};
</script>

<style lang="scss" scoped>
.div-animation {
  text-align: center;

  & > div {
    margin-top: 20px;
  }

  .el-tag {
    display: block;
    width: 50%;
    margin: auto;
    margin-bottom: 10px;
  }
}

.el-scrollbar__view {
  .animate-container {
    padding-top: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 10px;

    .animate {
      cursor: pointer;
      width: 100px;
      height: 60px;
      background: #f5f8fb;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 12px;
      margin-bottom: 10px;
      font-size: 12px;
      color: #333;
      border-radius: 3px;
      user-select: none;
      cursor: pointer;
    }
  }
}
</style>
