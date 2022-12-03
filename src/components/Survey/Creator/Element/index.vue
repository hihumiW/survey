<template>
  <div
    :class="[
      'survey-question_container px-6 pt-6 pb-4 bg-white rounded-sm',
      isActive && 'active',
    ]"
    @click="handleQuestionContainerClick"
  >
    <div :class="['ml-0', 'ml-6', 'ml-8', 'ml-10'][question.indent]">
      <component
        :is="RenderComponent"
        :question="props.question"
        :path="props.path"
      />
    </div>
    <div class="survey-question_footer mt-4">
      <div class="flex justify-between items-center">
        <span>{{ questionTypeName }}</span>
        <div class="flex">
          <NButton strong secondary round type="warning"> Duplicate </NButton>
          <NButton
            strong
            secondary
            round
            type="error"
            @click="handleDeleteItemClick"
          >
            Delete
          </NButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, unref } from "vue";
import SingleText from "./Text/SingleText.vue";
import SelectBase from "./SelectBase";
import File from "./File/index.vue";
import Panel from "./Panel/index.vue";
import Matrix from "./Matrix";
import questionTypes from "../ToolBox/questionTypes";
import { NButton } from "naive-ui";
import { useInjectCreator } from "@survey/hooks/useCreator";

import questionCommonProps from "@survey/util/questionCommonProps";
import QuestionTypeEnum from "@survey/util/questionTypeEnum";

const props = defineProps(questionCommonProps);

const { removeItem, currentActiveItem, onQuestionItemClick } =
  useInjectCreator();

const isActive = computed(() => unref(currentActiveItem) === props.question);

const handleQuestionContainerClick = () => {
  onQuestionItemClick(props.path);
};

const handleDeleteItemClick = () => removeItem(props.path);

const questionTypeName = computed(
  () => questionTypes.find((item) => item.type === props.question.type)?.name
);

const RenderComponent = computed(() => {
  switch (props.question.type) {
    case QuestionTypeEnum.text:
      return SingleText;
    case QuestionTypeEnum.radiogroup:
    case QuestionTypeEnum.checkbox:
    case QuestionTypeEnum.dropdown:
      return SelectBase;
    case QuestionTypeEnum.file:
      return File;
    case QuestionTypeEnum.panel:
      return Panel;
    case QuestionTypeEnum.matrixradio:
    case QuestionTypeEnum.matrixcheckbox:
    case QuestionTypeEnum.matrixinput:
      return Matrix;
  }
});
</script>

<script>
export default {
  name: "ElementDispatch",
};
</script>

<style>
.survey-question_container:hover {
  box-shadow: 0 0 0 2px rgba(255, 152, 20, 0.2);
}
.survey-question_footer {
  visibility: hidden;
}
.survey-question_container.active .survey-question_footer,
.survey-question_container:hover .survey-question_footer {
  visibility: visible;
}
.survey-question_container.active {
  box-shadow: 0 0 0 2px rgba(255, 152, 20);
}
</style>
