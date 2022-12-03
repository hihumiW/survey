<template>
  <QuestionContainer
    v-bind="props"
    editable
    @click="stopPropagation"
    hideTitleWhenEmpty
  >
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
  </QuestionContainer>
</template>

<script setup>
import QuestionContainer from "@survey/components/QuestionContainer/index.vue";
import questionCommonProps from "@survey/util/questionCommonProps";
import QuestionTypeDispatch from "../index.vue";
import { NDropdown, NButton } from "naive-ui";
import questionTypes from "../../ToolBox/questionTypes";
import { computed, provide } from "vue";
import { useInjectCreator } from "@survey/hooks/useCreator";
import QuestionTypeEnum from "@survey/util/questionTypeEnum";

const props = defineProps(questionCommonProps);

const { addQuestion } = useInjectCreator();

const getChildQuestionPath = (index) => `${props.path}.questions.${index}`;

const includeTypes = [
  QuestionTypeEnum.text,
  QuestionTypeEnum.radiogroup,
  QuestionTypeEnum.checkbox,
  QuestionTypeEnum.dropdown,
];
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
