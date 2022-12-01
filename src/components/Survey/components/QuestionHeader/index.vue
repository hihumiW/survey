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
import { toRefs } from "vue";
import QuestionLayout from "./QuestionLayout.vue";
import QuestionTitle from "./QuestionTitle.jsx";
import questionCommonProps from "../../hooks/questionCommonProps";
import useFeildChange from "@survey/Createtor/hooks/useGetFeildChange";
import { useQuestionIndex } from "@survey/hooks/useQuestionIndex";
const props = defineProps({
  ...questionCommonProps,
  editable: {
    type: Boolean,
    default: false,
  },
  hideTitleWhenEmpty: Boolean,
});

console.log(props, "iinnin");
const { path: pathRef, question: questionRef } = toRefs(props);
const getFeildChangehandler = props.editable
  ? useFeildChange(pathRef)
  : () => () => {};
const handleTitleChange = getFeildChangehandler("title");
const questionIndex = useQuestionIndex(questionRef);
</script>
