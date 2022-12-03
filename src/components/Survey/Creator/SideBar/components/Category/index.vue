<template>
  <div class="side-bar-category_container mt-3">
    <NCollapse accordion>
      <NCollapseItem
        v-for="{
          categoryName,
          categoryTitle,
          components,
        } in props.categoryConfig"
        :key="`${props.questionType}_${categoryName}`"
        :title="categoryTitle"
        :name="categoryName"
      >
        <div class="bg-neutral-100 p-6">
          <div
            class="flex flex-col gap-y-6"
            v-if="components && components.length"
          >
            <component
              v-for="component in components"
              :is="component"
              :key="component.name"
            />
          </div>
          <div class="flex items-center justify-center" v-else>
            <NEmpty description="No availabel config" />
          </div>
        </div>
      </NCollapseItem>
    </NCollapse>
  </div>
</template>

<script>
import { NCollapse, NCollapseItem, NEmpty } from "naive-ui";

export default {
  name: "SideBarCategory",
  props: {
    questionType: String,
    categoryConfig: Array,
  },
  components: {
    NCollapse,
    NCollapseItem,
    NEmpty,
  },
};
</script>

<style>
.side-bar-category_container .n-collapse-item__content-inner {
  padding: 0px !important;
}
.side-bar-category_container .n-collapse-item {
  margin: 0px !important;
}

.side-bar-category_container .n-collapse-item__header-main {
  padding-bottom: 0.75rem;
  padding-inline: 0.75rem;
}
</style>
