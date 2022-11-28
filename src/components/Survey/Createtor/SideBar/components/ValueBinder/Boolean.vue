<template>
  <NCheckbox
    size="large"
    :label="props.title"
    :checked="binderValue"
    @update:checked="handleValueChange"
  />
</template>

<script setup>
import { NCheckbox } from "naive-ui";
import useBinder from "./hooks/useBinder";

const props = defineProps({
  title: String,
  bindName: {
    type: String,
    required: true,
  },
});

const { binderValue, handleValueChange } = useBinder(props.bindName);
</script>
