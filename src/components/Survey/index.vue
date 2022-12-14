<template>
  <div class="h-full flex">
    <div class="flex flex-col flex-1 min-w-0">
      <div
        class="h-[52px] flex-shrink-0 bg-white border-b border-neutral-300 flex survey-top-bar"
      >
        <NTabs type="bar" size="large" v-model:value="tabValue">
          <NTabPane name="designer" tab="Designer" />
          <NTabPane name="json" tab="JSON" />
          <NTabPane name="preview" tab="Preview" />
        </NTabs>
      </div>
      <div class="flex-1 min-h-0">
        <template v-if="isMounted">
          <Creator v-if="tabValue === 'designer'" />
          <JSONPreview v-if="tabValue === 'json'" />
          <SurveyPreview v-if="tabValue === 'preview'" :creator="creator" />
        </template>
      </div>
    </div>

    <div
      id="sideBar"
      v-show="tabValue === 'designer' && showSideBar"
      class="w-[450px] flex-shrink-0 box-border border-l border-neutral-300"
    />
  </div>
</template>

<script setup>
import { useMounted } from "@vueuse/core";
import { NTabs, NTabPane } from "naive-ui";
import { onMounted, ref } from "vue";
import Creator from "./Creator/index.vue";
import JSONPreview from "./JSON";
import SurveyPreview from "./Preview";
import useCreator from "./hooks/useCreator";
import { useQuestionSequenceInit } from "./hooks/useQuestionIndex";

const creator = useCreator();
const { showSideBar } = creator;
useQuestionSequenceInit(creator.surveyQuestions);
const isMounted = useMounted();
onMounted(() => {
  creator.addQuestion("dropdown");
});

const tabValue = ref("preview");
</script>

<script>
export default {
  name: "Survey",
};
</script>

<style>
.survey-top-bar .ntabs,
.survey-top-bar .n-tabs-nav,
.survey-top-bar .n-tabs-nav-scroll-wrapper,
.survey-top-bar .v-x-scroll,
.survey-top-bar .n-tabs-nav-scroll-content {
  height: 100%;
}

.survey-top-bar .n-tabs-tab__label {
  font-weight: bold;
  padding: 0px 1.5rem;
}
.survey-top-bar .n-tabs-tab-pad {
  display: none;
}
</style>
