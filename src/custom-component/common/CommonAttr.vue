<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="通用样式" name="style">
        <el-form>
          <el-form-item
            v-for="({ key, label }, index) in styleKeys"
            :key="index"
            :label="label"
          >
            <el-color-picker
              v-if="key.toLowerCase().includes('color')"
              v-model="store.curComponent.style[key]"
              show-alpha
            ></el-color-picker>
            <el-select
              v-else-if="selectKey.includes(key)"
              v-model="store.curComponent.style[key]"
            >
              <el-option
                v-for="item in optionMap[key]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-else
              v-model.number="store.curComponent.style[key]"
              type="number"
            />
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useComponentData from "@/stores/index";
import { styleData, selectKey, optionMap } from "@/utils/attr";
const store = useComponentData();
const activeName = ref("style");
const styleKeys = ref([] as any[]);
if (store.curComponent) {
  const curComponentStyleKeys = Object.keys(store.curComponent.style);
  styleKeys.value = styleData.filter((style) =>
    curComponentStyleKeys.includes(style.key)
  );
}
</script>
<style lang="scss" scoped></style>
