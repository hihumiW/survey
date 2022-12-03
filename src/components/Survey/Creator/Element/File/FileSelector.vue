<template>
  <div
    class="border-dashed border p-3 h-[200px] flex items-center justify-center"
  >
    <NButton quaternary strong :disabled="props.disabeld">
      Choose file
    </NButton>
  </div>
</template>

<script setup>
import { NButton } from "naive-ui";
const props = defineProps({
  disabeld: {
    type: Boolean,
  },
});
</script>
