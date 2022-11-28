<template>
  <div class="flex flex-col gap-y-1">
    <div
      :class="[
        'text-base font-bold survey-question_title flex',
        props.question.isRequired && 'required',
      ]"
    >
      <span
        class="flex-shrink-0 text-neutral-500 text-sm mt-1"
        v-if="questionIndex"
      >
        {{ questionIndex }}.
      </span>
      <Title
        class="min-w-0"
        :value="props.question.title"
        @update:value="titleChangeHandler"
        placeholder="Question Title"
      />
    </div>
    <div class="text-base text-neutral-500" v-if="props.question.description">
      <Title
        :value="props.question.description"
        @update:value="descriptionChangeHandler"
      />
    </div>
  </div>
</template>
<script setup>
import useBase from "../hooks/useBase";
import Title from "../Title/index.vue";
import { computed, unref } from "vue";
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

const { questionFieldHanlder, surveyQuestionSequence } = useBase(props.path);

const questionIndex = computed(
  () =>
    props.question.showQuestionNumber &&
    unref(surveyQuestionSequence).findIndex(
      (item) => item.name === props.question.name
    ) + 1
);

const titleChangeHandler = questionFieldHanlder("title");
const descriptionChangeHandler = questionFieldHanlder("description");
</script>

<style>
.survey-question_title.required::after {
  content: "*";
  margin-left: 2px;
  color: #f00;
}
</style>
