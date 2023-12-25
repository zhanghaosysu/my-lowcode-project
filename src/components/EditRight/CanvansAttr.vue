<template>
  <div>
    <p class="title">画布属性</p>
    <el-form style="padding: 20px;">
      <el-form-item
        v-for="(key, index) in Object.keys(options)"
        :key="index"
        :label="options[key]"
        
      >
        <el-color-picker
          v-if="key.toLowerCase().includes('color')"
          v-model="store.canvansStyleData[key]"
          show-alpha
        ></el-color-picker>
        <el-input v-else-if="key === 'scale'" v-model.number="store.canvansStyleData[key]" type="number" class="scale"/>
        <el-input v-else v-model.number="store.canvansStyleData[key]" type="number" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import useCanvansData from '@/stores/canvansData';
const store = useCanvansData();
const options = reactive({
  width: "画布宽度",
  height: "画布高度",
  scale: "画布比例",
  color: "颜色",
  opacity: "不透明度",
  backgroundColor: "背景色",
  fontSize: "字体大小",
});
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: 10px;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #e4e7ed;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}
.scale::after {
  content: '%';
}
</style>
