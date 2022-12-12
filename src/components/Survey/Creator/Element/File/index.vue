<template>
  <QuestionContainer v-bind="props" editable>
    <FileSelector disabeld />
  </QuestionContainer>
</template>

<script setup>
import QuestionContainer from "@survey/Creator/components/QuestionContainer/index.vue";
import questionCommonProps from "@survey/Creator/util/questionCommonProps";
import FileSelector from "./FileSelector.vue";

const props = defineProps(questionCommonProps);
</script>

<script>
export default {
  name: "FileElement",
};
</script>
