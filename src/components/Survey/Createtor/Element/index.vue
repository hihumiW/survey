<template>
  <div
    :class="[
      'survey-question_container px-6 pt-6 pb-4 bg-white rounded-sm',
      isActive && 'active',
    ]"
    @click="handleQuestionContainerClick"
  >
    <div :class="['ml-0', 'ml-6', 'ml-8', 'ml-10'][question.indent]">
      <SingleText
        v-if="props.question.type === 'text'"
        :question="props.question"
        :path="props.path"
      />
      <SelectBase
        v-else-if="
          ['radiogroup', 'checkbox', 'dropdown'].includes(props.question.type)
        "
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
import SingleText from "./Text/SingleText.vue";
import SelectBase from "./SelectBase/index.jsx";
import questionTypes from "../ToolBox/questionTypes";
import { NButton } from "naive-ui";
import useBase from "../hooks/useBase";
import { computed, unref } from "vue";

const props = defineProps({
  question: {
    type: Object,
  },
  path: {
    type: String,
    required: true,
  },
});

const { questionName, removeItem, currentActiveItem, onQuestionItemClick } =
  useBase(props.path);

const isActive = computed(() => unref(currentActiveItem) === props.question);

const handleQuestionContainerClick = () => onQuestionItemClick(props.path);

const handleDeleteItemClick = () => removeItem(props.path);

const questionTypeName = computed(
  () => questionTypes.find((item) => item.type === props.question.type)?.name
);
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
