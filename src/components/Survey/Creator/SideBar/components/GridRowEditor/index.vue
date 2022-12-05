<template>
  <EditorLayout title="Rows" :onItemAdd="handleColumnAdd">
    <RowItem
      v-for="(row, index) in items"
      :key="row"
      :rowValue="row"
      :rowIndex="index"
    />
  </EditorLayout>
</template>

<script setup>
import { computed, unref } from "vue";
import EditorLayout from "../ItemsEditor/Layout/EditorLayout";
import RowItem from "./RowItem";

import { useInjectCreator } from "@survey/hooks/useCreator";
import useGridEdit from "@survey/Creator/hooks/useGridEdit";

const { currentActiveItem, currentActivePath } = useInjectCreator();

const items = computed(() => unref(currentActiveItem)?.rows || []);
const {
  handleColumnTitleChange,
  handleColumnValueChange,
  handleColumnRemove,
  handleColumnAdd,
} = useGridEdit(currentActivePath);
</script>
