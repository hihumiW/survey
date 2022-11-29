<template>
  <Vertical :title="props.title">
    <NSelect
      :placeholder="placeholder"
      :value="binderValue"
      :options="props.options"
      @update:value="handleValueChange"
      size="large"
      :multiple="props.multiple"
      v-bind="selectProps"
    />
  </Vertical>
</template>

<script setup>
import { computed } from "vue";
import { NSelect } from "naive-ui";
import Vertical from "../Layout/Vertical.vue";
import useBinder from "./hooks/useBinder";
const props = defineProps({
  title: String,
  bindName: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
  selectProps: {
    type: Object,
    default: () => ({}),
  },
});

const { binderValue, handleValueChange } = useBinder(props.bindName);
const placeholder = computed(() => `Please select ${props.title}`);
</script>
