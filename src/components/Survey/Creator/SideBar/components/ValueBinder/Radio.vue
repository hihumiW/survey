<template>
  <Vertical :title="props.title" class="survey-radio-binder_container">
    <NRadioGroup
      :value="binderValue"
      @update:value="handleValueChange"
      size="large"
    >
      <NRadioButton
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :label="label"
      />
    </NRadioGroup>
  </Vertical>
</template>

<script setup>
import { NRadioButton, NRadioGroup } from "naive-ui";
import Vertical from "../Layout/Vertical";
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
});

const { binderValue, handleValueChange } = useBinder(props.bindName);
</script>

<style>
.survey-radio-binder_container .n-radio-group {
  display: flex;
}
.survey-radio-binder_container .n-radio-button {
  flex: 1;
  text-align: center;
}
</style>
