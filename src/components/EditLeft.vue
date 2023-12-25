<script lang="ts" name="EditLeft">
export default {
  props: {
    data: { type: Object },
  },
  setup(props) {
    function handleDragStart(e: any) {
      e.dataTransfer.setData("index", e.target.dataset.index);
    }
    return {
      componentData: props.data,
      handleDragStart,
    };
  },
};
</script>

<template>
  <div class="container" @dragstart="handleDragStart">
    <div
      v-for="(item, index) in componentData"
      :key="index"
      class="list"
      draggable="true"
      :data-index="index"
    >
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  grid-gap: 10px 20px;
  grid-template-columns: repeat(auto-fill, 80px);
  grid-template-rows: repeat(auto-fill, 40px);
  .list {
    width: 80px;
    height: 40px;
    border: 1px solid #ddd;
    cursor: grab;
    text-align: center;
    color: #333;
    padding: 2px 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
      cursor: grabbing;
    }
  }
  .test {
    width: 150px;
    height: 500px;
    border: 1px solid black;
  }
}
</style>
