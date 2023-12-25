<template>
  <div @click="onClick">
    <component
      :is="props.config.component"
      ref="componentRef"
      class="component"
      :style="getComponentStyle(config.style, props.index, props.config.component)"
      :prop-value="props.config.propValue"
      :element="props.config"
    />
  </div>
</template>

<script setup lang="ts">
import { events } from "@/utils/eventList";
import runAnimation from "@/utils/runAnimation";
import { getComponentStyle } from "@/utils/util";
import { onMounted, ref } from "vue";

const props = defineProps(['config', 'index']);
const componentRef = ref();
const onClick = () => {
  const eventsData = props.config.events;
  Object.keys(eventsData).forEach((event) => {
    events[event](eventsData[event]);
  });
}
onMounted(() => {
  runAnimation(componentRef.value.VTextRef, props.config.animations);
})
</script>

<style lang="scss" scoped>
.component {
  position: absolute;
}
</style>
