<template>
  <QuestionContainer
    v-bind="props"
    editable
    @click="stopPropagation"
    hideTitleWhenEmpty
  >
    <PanelContainer :innerIndent="props.question.innerIndent">
      <QuestionTypeDispatch
        class="border border-dashed border-neutral-200"
        v-for="(childQuestion, index) in props.question.questions"
        :key="childQuestion.name"
        :question="childQuestion"
        :path="getChildQuestionPath(index)"
        :panelPath="path"
      />
    </PanelContainer>

    <div class="flex justify-center p-3">
      <NDropdown
        :options="panelQuestionTypeOptions"
        trigger="click"
        size="huge"
        @select="handlePanelQuestionAdd"
      >
        <NButton quaternary type="primary" strong round size="large"
          >添加子项</NButton
        >
      </NDropdown>
    </div>
  </QuestionContainer>
</template>

<script setup>
import QuestionContainer from "@survey/Creator/components/QuestionContainer/index.vue";
import questionCommonProps from "@survey/Creator/util/questionCommonProps";
import QuestionTypeDispatch from "../index.vue";
import { NDropdown, NButton } from "naive-ui";
import questionTypes from "../../ToolBox/questionTypes";
import { toRef } from "vue";
import { useInjectCreator } from "@survey/hooks/useCreator";
import { usePanelConifigProvide } from "@survey/hooks/Panel/useConfigInject";
import PanelContainer from "@survey/components/PanelContainer";
import QuestionTypeEnum from "@survey/types/questionTypeEnum";

const props = defineProps(questionCommonProps);

const questionRef = toRef(props, "question");

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

usePanelConifigProvide(questionRef);
</script>
