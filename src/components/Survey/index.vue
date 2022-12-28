<template>
  <div class="h-full flex">
    <div class="flex flex-col flex-1 min-w-0">
      <div
        class="h-[52px] flex-shrink-0 bg-white border-b border-neutral-300 flex survey-top-bar dark:bg-black dark:border-neutral-700"
      >
        <NTabs type="bar" size="large" v-model:value="tabValue">
          <NTabPane name="designer" tab="问卷设计" />
          <NTabPane name="json" tab="JSON" />
          <NTabPane name="preview" tab="预览" />
        </NTabs>
      </div>
      <div class="flex-1 min-h-0 flex flex-col">
        <template v-if="isMounted">
          <Creator v-if="tabValue === 'designer'" />
          <JSONPreview v-if="tabValue === 'json'" :creator="creator" />
          <SurveyPreview v-if="tabValue === 'preview'" :creator="creator" />
        </template>
      </div>
    </div>

    <div
      id="sideBar"
      v-show="tabValue === 'designer' && showSideBar"
      class="w-[440px] bg-white flex-shrink-0 box-border border-l border-neutral-300 dark:bg-black dark:border-neutral-700"
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
import { useRoute } from "vue-router";

const props = defineProps({
  editSurveyData: {
    type: Object,
    default: () => ({}),
  },
  readOnly: {
    type: Boolean,
    default: () => false,
  },
});

const route = useRoute();
const creator = useCreator(props.editSurveyData, props.readOnly);
const { showSideBar } = creator;
useQuestionSequenceInit(creator.surveyQuestions);

const isMounted = useMounted();
if (route.name === "creator") {
  onMounted(() => {
    creator.addQuestion("dropdown");
  });
}

const tabValue = ref("designer");
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
