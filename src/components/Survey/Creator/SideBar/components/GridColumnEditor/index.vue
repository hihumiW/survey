<template>
  <EditorLayout title="Columns" :onItemAdd="handleColumnAdd">
    <div
      class="flex flex-col"
      v-for="(column, index) in items"
      :key="column.value"
    >
      <RowItem
        :item="column"
        :itemIndex="index"
        :onItemTitleChange="handleColumnTitleChange"
        :onItemValueChange="handleColumnValueChange"
        :onItemRemove="handleColumnRemove"
        :onEditClick="handleEditClick"
      />
    </div>
  </EditorLayout>
</template>

<script setup>
import { computed, unref } from "vue";
import EditorLayout from "../ItemsEditor/Layout/EditorLayout";
import RowItem from "../ItemsEditor/ItemRow";
import questionTypeEnum from "@survey/util/questionTypeEnum";
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
} = useGridEdit(currentActivePath);
</script>
