<template>
  <Vertical :title="props.title">
    <NInput
      v-if="['text', 'textarea'].includes(props.type)"
      :placeholder="placeholder"
      :type="props.type"
      :value="binderValue"
      @update:value="handleValueChange"
      size="large"
    />
    <NInputNumber
      v-if="props.type === 'number'"
      :value="binderValue"
      :min="props.min"
      :max="props.max"
      @update:value="handleValueChange"
      size="large"
    />
  </Vertical>
</template>

<script setup>
import { computed } from "vue";
import { NInput, NInputNumber } from "naive-ui";
import Vertical from "../Layout/Vertical.vue";
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
  // only works when type is number
  min: Number,
  max: Number,
});

const { binderValue, handleValueChange } = useBinder(props.bindName);

const placeholder = computed(() => `Please input ${props.title.toLowerCase()}`);
</script>
