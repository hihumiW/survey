<template>
  <Vertical :title="props.title">
    <component
      :is="RenderComponent"
      :value="binderValue"
      :type="props.type"
      :placeholder="placeholder"
      @update:value="handleValueChange"
      v-bind="inputProps"
      size="large"
    />
  </Vertical>
</template>

<script setup>
import { computed } from "vue";
import { NInput, NInputNumber } from "naive-ui";
import Vertical from "../Layout/Vertical";
import useBinder from "./hooks/useBinder";

const props = defineProps({
  title: String,
  bindName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  inputProps: {
    type: Object,
    default: () => ({}),
  },
  defaultValue: {
    type: [String, Number],
  },
});

const { binderValue, handleValueChange } = useBinder(
  props.bindName,
  props.defaultValue
);

const placeholder = computed(() => `Please input ${props.title.toLowerCase()}`);

const RenderComponent = computed(() =>
  props.type === "number" ? NInputNumber : NInput
);
</script>
