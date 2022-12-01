<template>
  <QuestionHeader v-bind="props" editable>
    <NDataTable v-bind="tableProps" />
  </QuestionHeader>
</template>

<script setup>
import QuestionHeader from "@survey/components/QuestionHeader/index.vue";
import questionCommonProps from "@survey/hooks/questionCommonProps";
import { NDataTable, NInput } from "naive-ui";
import createColumns from "./hooks/createColumns";
const props = defineProps(questionCommonProps);

const tableProps = createColumns(props);
console.log(tableProps);
</script>
