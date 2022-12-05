<template>
  <ItemsEditor
    title="Columns"
    bindName="columns"
    :items="items"
    :onItemAdd="handleColumnAdd"
    :onItemRemove="handleColumnRemove"
    :onItemTitleChange="handleColumnTitleChange"
    :onItemValueChange="handleColumnValueChange"
  />
</template>

<script setup>
import { computed, unref } from "vue";

import ItemsEditor from "../ItemsEditor";
import { useInjectCreator } from "@survey/hooks/useCreator";
import useGridEdit from "@survey/Creator/hooks/useGridEdit";

const { currentActiveItem, currentActivePath } = useInjectCreator();
const items = computed(() => unref(currentActiveItem)?.columns || []);
const {
  handleColumnTitleChange,
  handleColumnValueChange,
  handleColumnRemove,
  handleColumnAdd,
} = useGridEdit(currentActivePath);
</script>
