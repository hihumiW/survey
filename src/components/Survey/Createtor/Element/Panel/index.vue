<template>
  <QuestionLayout :question="props.question" @click="stopPropagation">
    <ElementHead
      :question="props.question"
      :path="props.path"
      v-if="props.question.title"
      class="mb-6"
    />
    <div
      class="flex flex-col gap-y-6"
      :class="['ml-0', 'ml-6', 'ml-8', 'ml-10'][props.question.innerIndent]"
    >
      <QuestionTypeDispatch
        class="border border-dashed border-neutral-200"
        v-for="(childQuestion, index) in props.question.questions"
        :key="childQuestion.name"
        :question="childQuestion"
        :path="getChildQuestionPath(index)"
      />
    </div>

    <div class="flex justify-center p-3">
      <NDropdown
        :options="panelQuestionTypeOptions"
        trigger="click"
        size="huge"
        @select="handlePanelQuestionAdd"
      >
        <NButton quaternary type="primary" strong round size="large"
          >Add question</NButton
        >
      </NDropdown>
    </div>
  </QuestionLayout>
</template>

<script setup>
import QuestionLayout from "../QuestionLayout.vue";
import ElementHead from "../ElementHead.vue";
import QuestionTypeDispatch from "../index.vue";
import { NDropdown, NButton } from "naive-ui";
import questionTypes from "../../ToolBox/questionTypes";
import { computed, inject, provide } from "vue";
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

const { addQuestion } = inject("creator");

const getChildQuestionPath = (index) => `${props.path}.questions.${index}`;

const includeTypes = ["text", "radiogroup", "checkbox", "dropdown"];
const panelQuestionTypeOptions = questionTypes
  .filter((item) => includeTypes.includes(item.type))
  .map(({ name, type }) => ({
    label: name,
    key: type,
  }));

const handlePanelQuestionAdd = (addType) => {
  addQuestion(addType, `${props.path}.questions`);
};
const stopPropagation = (e) => e.stopPropagation();

const injectParentConfig = computed(() => {
  const { titleLocation } = props.question;
  return {
    titleLocation,
  };
});
provide("parentConfig", injectParentConfig);
</script>
