<template>
  <QuestionWrapper
    :questionIndent="question.indent"
    :onClick="handleQuestionContainerClick"
    :class="[isActive && 'active']"
  >
    <component
      :is="RenderComponent"
      :question="props.question"
      :path="props.path"
    />
    <template #footer>
      <div class="flex justify-between items-center">
        <span>{{ questionTypeName }}</span>
        <div class="flex gap-x-3">
          <!-- <NButton strong secondary round type="warning"> Duplicate </NButton> -->
          <NButton
            strong
            secondary
            round
            @click="handleQuestionIndexMove('up')"
          >
            上移
          </NButton>
          <NButton
            strong
            secondary
            round
            @click="handleQuestionIndexMove('down')"
          >
            下移
          </NButton>
          <NButton
            strong
            secondary
            round
            type="error"
            @click="handleDeleteItemClick"
          >
            删除
          </NButton>
        </div>
      </div>
    </template>
  </QuestionWrapper>
</template>
<script setup>
import { computed, unref } from "vue";
import { NButton } from "naive-ui";

import QuestionWrapper from "@survey/components/QuestionWrapper";
import SingleText from "./Text";
import SelectBase from "./SelectBase";
import File from "./File/index.vue";
import Panel from "./Panel/index.vue";
import Matrix from "./Grid/Matrix";
import Grid from "./Grid";

import { useInjectCreator } from "@survey/hooks/useCreator";
import questionTypes from "../ToolBox/questionTypes";
import questionCommonProps from "@survey/Creator/util/questionCommonProps";
import QuestionTypeEnum from "@survey/types/questionTypeEnum";

const props = defineProps({
  ...questionCommonProps,
  panelPath: String,
});

const {
  removeItem,
  currentActiveItem,
  onQuestionItemClick,
  moveQuestionIndex,
} = useInjectCreator();

const isActive = computed(() => unref(currentActiveItem) === props.question);

const handleQuestionContainerClick = () => {
  onQuestionItemClick(props.path);
};

const handleDeleteItemClick = () => removeItem(props.path, props.question.name);

const questionTypeName = computed(
  () => questionTypes.find((item) => item.type === props.question.type)?.name
);

const handleQuestionIndexMove = (forward) =>
  moveQuestionIndex(props.question.name, forward, props.panelPath);

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
    case QuestionTypeEnum.matrixdropdown:
      return Matrix;
    case QuestionTypeEnum.grid:
      return Grid;
  }
});
</script>

<script>
export default {
  name: "ElementDispatch",
};
</script>
