<template>
  <ItemsEditor
    :title="TitleName"
    :bindName="props.type"
    :items="items"
    :onItemAdd="handleChoiceAdd"
    :onItemRemove="handleChoiceRemove"
    :onItemTitleChange="handleTitleChangeWrapper"
    :onItemValueChange="handleItemValueChange"
  />
</template>

<script setup>
import { computed, unref } from "vue";
import ItemsEditor from "../ItemsEditor";
import { useInjectCreator } from "@survey/hooks/useCreator";
import useMatrixEdit from "@survey/Creator/hooks/useMatrixEdit";

const props = defineProps({
  type: {
    type: String,
    default: "columns",
  },
});

const TitleName = props.type === "columns" ? "Columns" : "Rows";
const { currentActiveItem, currentActivePath } = useInjectCreator();
const items = computed(() => unref(currentActiveItem)?.[props.type] || []);

const { handleTitleChange } = useMatrixEdit(currentActivePath);

const handleChoiceAdd = () => {};
const handleChoiceRemove = () => {};
const handleTitleChangeWrapper = (index, text) =>
  handleTitleChange(props.type, index, text);
const handleItemValueChange = () => {};
</script>
