<template>
  <div class="flex flex-col p-3 text-sm text-neutral-600">
    <div
      class="flex items-center p-3 rounded-3xl cursor-pointer hover:bg-white"
      v-for="{ name, type } in questionTypes"
      :key="type"
      @click="handleItemClick(type)"
    >
      {{ name }}
    </div>
  </div>
</template>

<script setup>
import questionTypes from "./questionTypes";
import { useInjectCreator } from "@survey/hooks/useCreator";

const { addQuestion } = useInjectCreator();

const handleItemClick = (type) => addQuestion(type);
</script>
