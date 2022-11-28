<template>
  <Vertical title="name">
    <NInput v-model:value="nameValue" @blur="handleBlur" size="large" />
  </Vertical>
</template>

<script setup>
import { ref, inject, unref, watch } from "vue";
import { NInput } from "naive-ui";
import Vertical from "../Layout/Vertical.vue";

const { currentActiveItem, currentActivePath, updateQuestionNameFieldValue } =
  inject("creator");

const getCurrentActiveItemName = () => unref(currentActiveItem).name;

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
