<template>
  <div class="side-bar_container h-full flex flex-col">
    <div class="side-bar_title p-3 border-primary-main border-b-2">
      <p
        :class="['text-right text-base', !haveActiveItem && 'text-neutral-500']"
      >
        {{ sideBarTitle }}
      </p>
    </div>
    <div
      :class="[
        'flex h-full min-h-0 overflow-y-auto',
        activeConfig ? 'flex-col' : 'justify-center',
      ]"
    >
      <div class="self-center" v-if="!activeConfig">
        <NEmpty size="huge" />
      </div>
      <Category
        v-else
        :questionType="currentActiveItemType"
        :categoryConfig="activeConfig"
        :expandedName="sideBarExpandedName"
        :updateSideBarExpandedName="updateSideBarExpandedName"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, unref, watch } from "vue";
import { NEmpty } from "naive-ui";
import Category from "./components/Category";
import sideBarConfig from "./config/index.js";
import { useInjectCreator } from "@survey/hooks/useCreator";
import QuestionTypeEnum from "../../util/questionTypeEnum";

const creator = useInjectCreator();
const {
  currentActiveItem,
  currentActiveItemType,
  currentActivePath,
  sideBarExpandedName,
  updateSideBarExpandedName,
} = creator;
const haveActiveItem = computed(() => !!unref(currentActiveItem));
const sideBarTitle = computed(() => {
  const item = unref(currentActiveItem);
  const type = unref(currentActiveItemType);
  if (
    [
      QuestionTypeEnum.gridColumn,
      QuestionTypeEnum.matrixSelectColumn,
      QuestionTypeEnum.matrixInputColumn,
      QuestionTypeEnum.matrixDropdownColumn,
    ].includes(type)
  ) {
    return item?.value;
  }
  if (type === QuestionTypeEnum.gridCell) {
    return unref(currentActivePath).split("cells.")[1];
  }

  return item?.name || "No question selected";
});

const activeConfig = computed(() => {
  const type = unref(currentActiveItemType);
  const config = sideBarConfig[type];
  return typeof config === "function" ? config(creator) : config;
});

watch(activeConfig, (config) => {
  const expandedName = unref(sideBarExpandedName);
  if (!expandedName || config?.length === 0) return;
  if (
    config.findIndex(
      (configItem) => configItem.categoryName === expandedName
    ) === -1
  ) {
    updateSideBarExpandedName([config[0].categoryName]);
  }
});
</script>

<style></style>
