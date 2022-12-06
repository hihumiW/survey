<template>
  <Vertical :title="props.title">
    <NSelect
      :placeholder="placeholder"
      :value="selectValue"
      :options="props.options"
      @update:value="handleValueChange"
      size="large"
      :multiple="props.multiple"
      v-bind="selectProps"
    />
  </Vertical>
</template>

<script setup>
import { computed, ref, unref, watch } from "vue";
import { NSelect } from "naive-ui";
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
  selectProps: {
    type: Object,
    default: () => ({}),
  },
  emptySelectedValue: {
    type: String,
  },
});

const isControlled = computed(() => !!props.emptySelectedValue);

const { binderValue, handleValueChange } = useBinder(props.bindName);

const controlledValue = ref();
const placeholder = computed(() => `Please select ${props.title}`);

const selectValue = computed(() =>
  unref(isControlled) ? unref(controlledValue) : unref(binderValue)
);
const setControlledValue = () => {
  const val = unref(binderValue);
  if (val) {
    controlledValue.value = val;
  } else {
    controlledValue.value = props.emptySelectedValue;
  }
};
if (isControlled) {
  watch(binderValue, setControlledValue);
  setControlledValue();
}
</script>
