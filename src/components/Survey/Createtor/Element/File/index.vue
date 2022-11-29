<template>
  <QuestionLayout :question="props.question">
    <template #title>
      <ElementHead :question="props.question" :path="props.path" />
    </template>
    <FileSelector disabeld />
  </QuestionLayout>
</template>

<script setup>
import QuestionLayout from "../QuestionLayout.vue";
import ElementHead from "../ElementHead.vue";
import FileSelector from "./FileSelector.vue";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});
</script>
