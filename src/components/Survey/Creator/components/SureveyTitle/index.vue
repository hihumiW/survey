<template>
  <SurveyTitleContainer>
    <template #title>
      <Title
        placeholder="Survey Title"
        :value="survey.title"
        editable
        @update:value="updateSurveyTitle"
      />
    </template>

    <template #description>
      <Title
        placeholder="Description"
        :value="survey.description"
        editable
        @update:value="updateSurveyDescription"
      />
    </template>
    <template #category>
      <NDropdown trigger="hover" :options="options">
        <NButton class="text-base" text> Category </NButton>
      </NDropdown>
    </template>
  </SurveyTitleContainer>
</template>

<script setup>
import { inject } from "vue";
import { NDropdown, NButton } from "naive-ui";
import SurveyTitleContainer from "@survey/components/SurveyTitleContainer";
import Title from "@survey/components/Title/index.vue";
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
