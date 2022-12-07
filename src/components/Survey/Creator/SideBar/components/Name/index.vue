<template>
  <Vertical title="name">
    <NInput v-model:value="nameValue" @blur="handleBlur" size="large" />
  </Vertical>
</template>

<script setup>
import { ref, unref, watch } from "vue";
import { NInput } from "naive-ui";
import Vertical from "../Layout/Vertical";
import { useInjectCreator } from "@survey/hooks/useCreator";

const { currentActiveItem, currentActivePath, updateQuestionNameFieldValue } =
  useInjectCreator();

const getCurrentActiveItemName = () => unref(currentActiveItem)?.name;

const nameValue = ref(getCurrentActiveItemName());

const handleBlur = () =>
  updateQuestionNameFieldValue(
    unref(currentActivePath),
    unref(nameValue),
    (status) => {
      if (status === "fail") {
        nameValue.value = getCurrentActiveItemName();
      }
    }
  );
watch([currentActiveItem], () => {
  nameValue.value = getCurrentActiveItemName();
});
</script>
