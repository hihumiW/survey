<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 pl-3 bg-neutral-100 flex h-full">
      <div class="w-[250px] flex-shrink-0">
        <ToolBox />
      </div>
      <div class="flex-1 min-h-0 h-full overflow-y-auto">
        <div class="max-w-[700px] mx-auto flex flex-col gap-y-3">
          <SureveyTitle />
          <div class="mt-4 flex flex-col gap-y-8">
            <SurveyElement
              v-for="(question, index) in survey.questions"
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
import SureveyTitle from "./Title/SureveyTitle.vue";
import SurveyElement from "./Element/index.vue";
import SideBar from "./SideBar/index.vue";
import { Teleport, inject } from "vue";
const { survey } = inject("creator");
</script>
