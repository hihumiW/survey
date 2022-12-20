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
      <NSelect
        placeholder="FormTypes"
        :value="survey.categoryId"
        :options="formTypes"
        label-field="name"
        value-field="id"
        filterable
        @update:value="updateSurveyFormType"
      />
    </template>
  </SurveyTitleContainer>
</template>

<script setup>
import { NSelect } from "naive-ui";
import SurveyTitleContainer from "@survey/components/SurveyTitleContainer";
import Title from "@survey/components/Title/index.vue";
import useFormTypes from "@survey/hooks/useFormTypes";
const props = defineProps({
  creator: {
    type: Object,
  },
});

const {
  updateSurveyTitle,
  updateSurveyDescription,
  updateSurveyFormType,
  survey,
} = props.creator;

const { data: formTypes } = useFormTypes();
</script>

<style>
.survey-title_category .n-base-selection {
  border-radius: 1rem;
}
</style>
