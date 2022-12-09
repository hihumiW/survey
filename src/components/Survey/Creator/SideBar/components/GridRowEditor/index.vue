<template>
  <EditorLayout title="Rows" :onItemAdd="handleRowAdd">
    <RowItem
      v-for="(row, index) in items"
      :key="row"
      :rowValue="row"
      :rowIndex="index"
      :onItemRemove="handleRowRemove"
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

const items = computed(() => unref(currentActiveItem)?.gridRows || []);
const { handleRowAdd, handleRowRemove } = useGridEdit(currentActivePath);
</script>
