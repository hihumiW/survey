<template>
  <QuestionLayout
    :class="['survey-question_text', isStandardVariant && 'variant-standard']"
    :question="props.question"
  >
    <template #title>
      <ElementHead
        :question="props.question"
        :path="props.path"
        v-if="props.showTitle"
      />
    </template>
    <component
      :is="InputComponent"
      disabled
      :placeholder="placeholder"
      size="large"
    />
  </QuestionLayout>
</template>
<script setup>
import { computed } from "vue";
import {
  NInput,
  NInputNumber,
  NTimePicker,
  NDatePicker,
  NSelect,
} from "naive-ui";
import QuestionLayout from "../QuestionLayout.vue";
import ElementHead from "../ElementHead.vue";

const props = defineProps({
  question: Object,
  showTitle: {
    type: Boolean,
    default: true,
  },
  path: {
    type: String,
    required: true,
  },
});

const placeholder = computed(() => {
  switch (props.question.inputType) {
    case "time":
      return "--:--";
    case "date":
      return "year/month/day";
    case "provinceCity":
      return "Please select province";
  }
  return props.question.placeholder || "";
});

const InputComponent = computed(() => {
  switch (props.question.inputType) {
    case "number":
      return NInputNumber;
    case "time":
      return NTimePicker;
    case "date":
      return NDatePicker;
    case "provinceCity":
      return NSelect;
  }
  return NInput;
});

const isStandardVariant = computed(
  () => props.question.inputVariant === "standard"
);
</script>

<style>
.survey-question_text.variant-standard .n-input__border {
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;
}
.survey-question_text.variant-standard .n-input {
  background-color: transparent;
}
</style>
