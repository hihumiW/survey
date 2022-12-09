<template>
  <div class="survey-title-container">
    <div class="p-6 flex items-center">
      <div class="flex-1 flex flex-col gap-y-2">
        <div class="text-3xl leading-10 text-primary-main font-bold">
          <Title
            placeholder="Survey Title"
            :value="survey.title"
            editable
            @update:value="updateSurveyTitle"
          />
        </div>
        <div class="text-base">
          <Title
            placeholder="Description"
            :value="survey.description"
            editable
            @update:value="updateSurveyDescription"
          />
        </div>
      </div>
      <div class="w-[240px] flex-shrink-0">
        <NSelect placeholder="请指定分类" class="survey-title_category" />
      </div>
    </div>
    <div class="h-0.5 bg-primary-main" />
  </div>
</template>

<script setup>
import { inject } from "vue";
import { NSelect } from "naive-ui";
import Title from "../../../components/Title/index.vue";
const creator = inject("creator");

const { updateSurveyTitle, updateSurveyDescription, survey } = creator;
</script>

<style>
.survey-title_category .n-base-selection {
  border-radius: 1rem;
}
</style>
