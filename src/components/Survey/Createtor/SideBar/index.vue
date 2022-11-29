<template>
  <div class="side-bar_container h-full flex flex-col">
    <div class="side-bar_title p-3 border-primary-main border-b-2">
      <p
        :class="['text-right text-base', !haveActiveItem && 'text-neutral-500']"
      >
        {{ sideBarTitle }}
      </p>
    </div>
    <div :class="['flex h-full', activeConfig ? 'flex-col' : 'justify-center']">
      <div class="self-center" v-if="!activeConfig">
        <NEmpty size="huge" />
      </div>
      <Category
        v-else
        :questionType="currentActiveItem.type"
        :categoryConfig="activeConfig"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, inject, unref } from "vue";
import { NEmpty } from "naive-ui";
import Category from "./components/Category/index.vue";
import sideBarConfig from "./config/index.js";

const { currentActiveItem } = inject("creator");
const haveActiveItem = computed(() => !!unref(currentActiveItem));
const sideBarTitle = computed(() => {
  const item = unref(currentActiveItem);
  return item ? item.name : "No question selected";
});

const activeConfig = computed(() => {
  const { type } = unref(currentActiveItem) || {};
  return sideBarConfig[type];
});
</script>

<style></style>
