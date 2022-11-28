<template>
  <div
    :class="[
      'survey-question-container flex',
      isInline ? 'gap-x-2' : 'flex-col gap-y-4',
    ]"
  >
    <div :class="['survey-question-title', isInline && 'm-w-half mt-2']">
      <slot name="title" />
    </div>
    <div :class="['survey-question-content', isInline && 'flex-1 self-start']">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  question: Object,
});
const isInline = computed(() => props.question.titleLocation === "left");
</script>
