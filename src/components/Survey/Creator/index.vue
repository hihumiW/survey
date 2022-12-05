<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 pl-3 bg-neutral-100 flex h-full">
      <div class="w-[160px] flex-shrink-0">
        <ToolBox />
      </div>
      <div class="flex-1 min-h-0 h-full overflow-y-auto">
        <div
          class="mx-auto flex flex-col gap-y-3"
          :class="shouldFullWidth ? 'mx-4' : ' max-w-[700px]'"
        >
          <SureveyTitle />
          <div class="mt-4 flex flex-col gap-y-8">
            <SurveyElement
              v-for="(question, index) in surveyQuestions"
              :key="question.name"
              :question="question"
              :path="String(index)"
            />
          </div>
        </div>
      </div>
    </div>
    <Teleport to="#sideBar">
      <SideBar />
    </Teleport>
  </div>
</template>

<script setup>
import ToolBox from "./ToolBox/index.vue";
import SureveyTitle from "./components/SureveyTitle/index.vue";
import SurveyElement from "./Element/index.vue";
import SideBar from "./SideBar/index.vue";
import { Teleport, inject, computed, unref } from "vue";
import QuestionTypeEnum from "@survey/util/questionTypeEnum";

const { surveyQuestions } = inject("creator");

const shouldFullWidth = computed(() =>
  Boolean(
    unref(surveyQuestions).find((question) =>
      [
        QuestionTypeEnum.matrixradio,
        QuestionTypeEnum.matrixcheckbox,
        QuestionTypeEnum.matrixinput,
        QuestionTypeEnum.grid,
      ].includes(question.type)
    )
  )
);
</script>

<script>
export default {
  name: "SurveyCreator",
};
</script>
