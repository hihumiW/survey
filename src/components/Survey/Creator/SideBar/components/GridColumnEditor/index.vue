<template>
  <EditorLayout title="Columns" :onItemAdd="handleColumnAdd">
    <RowItem
      v-for="(column, index) in items"
      :key="column.value"
      :item="column"
      :itemIndex="index"
      :onItemTitleChange="handleColumnTitleChange"
      :onItemValueChange="handleColumnValueChange"
      :onItemRemove="handleColumnRemove"
      :onEditClick="handleEditClick"
      :onItemMove="(direction) => handleColumnMove(index, direction)"
    />
  </EditorLayout>
</template>

<script setup>
import { computed, unref } from "vue";
import EditorLayout from "../ItemsEditor/Layout/EditorLayout";
import RowItem from "../ItemsEditor/ItemRow";
import questionTypeEnum from "@survey/types/questionTypeEnum";
import { useInjectCreator } from "@survey/hooks/useCreator";
import useGridEdit from "@survey/Creator/hooks/useGridEdit";

const { currentActiveItem, currentActivePath, onQuestionItemClick } =
  useInjectCreator();
const items = computed(() => unref(currentActiveItem)?.columns || []);
const handleEditClick = (columnIndex) => {
  onQuestionItemClick(
    `${unref(currentActivePath)}.columns.${columnIndex}`,
    questionTypeEnum.gridColumn
  );
};

const {
  handleColumnTitleChange,
  handleColumnValueChange,
  handleColumnRemove,
  handleColumnAdd,
  handleColumnMove,
} = useGridEdit(currentActivePath);
</script>
