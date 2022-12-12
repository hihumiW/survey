<template>
  <QuestionLayout v-bind="props">
    <template #title>
      <QuestionTitle
        :hideTitleWhenEmpty="props.hideTitleWhenEmpty"
        :questionIndex="questionIndex"
        :question="questionRef"
        :editable="props.editable"
        @titleChange="handleTitleChange"
      />
    </template>
    <slot />
  </QuestionLayout>
</template>

<script setup>
import { computed, toRef } from "vue";
import QuestionLayout from "@survey/components/QuestionLayout/index.vue";
import QuestionTitle from "@survey/components/QuestionLayout/QuestionTitle.jsx";
import questionCommonProps from "@survey/Creator/util/questionCommonProps";
import { useQuestionIndex } from "@survey/hooks/useQuestionIndex";
import { useInjectCreator } from "@survey/hooks/useCreator";

const props = defineProps({
  ...questionCommonProps,
  editable: {
    type: Boolean,
    default: false,
  },
  hideTitleWhenEmpty: Boolean,
});
const emit = defineEmits(["titleChange"]);

const questionRef = toRef(props, "question");
const questionIndex = useQuestionIndex(questionRef);
const { generateFieldPathBinder } = useInjectCreator();
const titlePath = computed(() => `${props.path}.title`);
const handleTitleChange = generateFieldPathBinder
  ? generateFieldPathBinder(titlePath)
  : () => {};
</script>

<script>
export default {
  name: "QuestionContainer",
};
</script>
