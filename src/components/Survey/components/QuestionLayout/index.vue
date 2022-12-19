<template>
  <div :class="['flex', isInline ? 'gap-x-2' : 'flex-col gap-y-4']">
    <div :class="['survey-question-title', isInline && 'm-w-half mt-2']">
      <slot name="title" />
    </div>
    <div :class="['survey-question-content', isInline && 'flex-1 self-start']">
      <div class="">
        <slot />
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>

<script setup>
import { computed, unref, inject } from "vue";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
});

const parentConfig = inject("parentConfig", () => ({}));

const titleLocation = computed(
  () =>
    (props.question.titleLocation === "inherit" &&
      unref(parentConfig)?.titleLocation) ||
    props.question.titleLocation
);
const isInline = computed(() => unref(titleLocation) === "left");
</script>
