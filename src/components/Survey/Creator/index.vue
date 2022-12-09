<template>
  <div class="flex flex-col h-full relative">
    <div class="flex-1 pl-3 bg-neutral-100 flex h-full">
      <div class="w-[160px] flex-shrink-0">
        <ToolBox />
      </div>
      <div class="flex-1 min-h-0 h-full overflow-y-auto">
        <div
          class="mx-auto flex flex-col gap-y-3"
          :class="shouldFullWidth ? 'mx-6' : ' max-w-[700px]'"
        >
          <SureveyTitle />
          <div class="my-8 flex flex-col gap-y-8">
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
    <div class="absolute -top-9 right-2">
      <NButton text title="collapse side bar" @click="toggleSideBarShow">
        <template #icon>
          <NIcon size="20">
            <ChevronForwardSharp v-if="showSideBar" />
            <ChevronBackSharp v-else />
          </NIcon>
        </template>
      </NButton>
    </div>
  </div>
</template>

<script setup>
import ToolBox from "./ToolBox/index.vue";
import SureveyTitle from "../components/SureveyTitle/index.vue";
import SurveyElement from "./Element/index.vue";
import SideBar from "./SideBar/index.vue";
import { Teleport, computed, unref } from "vue";
import QuestionTypeEnum from "@survey/util/questionTypeEnum";
import { NButton, NIcon } from "naive-ui";
import { ChevronForwardSharp, ChevronBackSharp } from "@vicons/ionicons5";
import { useInjectCreator } from "@survey/hooks/useCreator";

const { surveyQuestions, showSideBar, toggleSideBarShow } = useInjectCreator();

const shouldFullWidth = computed(() =>
  Boolean(
    unref(surveyQuestions).find((question) =>
      [
        QuestionTypeEnum.matrixradio,
        QuestionTypeEnum.matrixcheckbox,
        QuestionTypeEnum.matrixinput,
        QuestionTypeEnum.matrixdropdown,
        QuestionTypeEnum.grid,
      ].includes(question.type)
    )
  )
);
</script>

<script>
export default {
  name: "SurveyCreator",
  components: { NButton },
};
</script>
