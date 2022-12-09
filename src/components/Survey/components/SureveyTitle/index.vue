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
      <div class="flex-shrink-0">
        <NDropdown trigger="hover" :options="options">
          <NButton class="text-base" text> Category </NButton>
        </NDropdown>
      </div>
    </div>
    <div class="h-0.5 bg-primary-main" />
  </div>
</template>

<script setup>
import { inject } from "vue";
import { NDropdown, NButton } from "naive-ui";
import Title from "../Title/index.vue";
const creator = inject("creator");

const { updateSurveyTitle, updateSurveyDescription, survey } = creator;

const options = [
  {
    label: "妈妈生的",
    value: "madeInMAMA",
  },
];
</script>

<style>
.survey-title_category .n-base-selection {
  border-radius: 1rem;
}
</style>
