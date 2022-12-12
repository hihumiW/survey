<template>
  <div class="flex flex-col h-full relative">
    <div class="flex-1 pl-3 bg-neutral-100 flex h-full">
      <div class="w-[160px] flex-shrink-0">
        <ToolBox />
      </div>
      <SurveyContainer :questions="surveyQuestions">
        <template #title>
          <SureveyTitle />
        </template>
        <SurveyElement
          v-for="(question, index) in surveyQuestions"
          :key="question.name"
          :question="question"
          :path="String(index)"
        />
      </SurveyContainer>
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
import SureveyTitle from "./components/SureveyTitle/index.vue";
import SurveyElement from "./Element/index.vue";
import SideBar from "./SideBar/index.vue";
import { Teleport } from "vue";
import SurveyContainer from "../components/SurveyContainer";
import { NButton, NIcon } from "naive-ui";
import { ChevronForwardSharp, ChevronBackSharp } from "@vicons/ionicons5";
import { useInjectCreator } from "@survey/hooks/useCreator";

const { surveyQuestions, showSideBar, toggleSideBarShow } = useInjectCreator();
</script>

<script>
export default {
  name: "SurveyCreator",
  components: { NButton },
};
</script>
