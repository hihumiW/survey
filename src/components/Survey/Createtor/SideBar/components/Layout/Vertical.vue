<template>
  <div class="flex flex-col gap-y-2">
    <div class="text-base text-neutral-500">
      <template v-if="props.title">{{ props.title }}</template>
      <slot name="title" v-else />
    </div>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>
