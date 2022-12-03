<template>
  <ItemsEditor
    :title="titleName"
    :bindName="props.type"
    :items="items"
    :onItemAdd="handleItemAdd"
    :onItemRemove="handleItemRemove"
    :onItemTitleChange="handleTitleChange"
    :onItemValueChange="handleItemValueChange"
  />
</template>

<script setup>
import { computed, unref } from "vue";
import { capitalize } from "lodash-es";
import ItemsEditor from "../ItemsEditor";
import { useInjectCreator } from "@survey/hooks/useCreator";
import useItemEdit from "@survey/Creator/hooks/useItemEdit";

const props = defineProps({
  type: {
    type: String,
    default: "columns",
  },
});

const titleName = capitalize(props.type);
const templateName = props.type === "columns" ? "column" : "row";
const { currentActiveItem, currentActivePath } = useInjectCreator();
const items = computed(() => unref(currentActiveItem)?.[props.type] || []);
const {
  handleTitleChange,
  handleItemValueChange,
  handleItemAdd,
  handleItemRemove,
} = useItemEdit({
  itemsPathRef: `${unref(currentActivePath)}.${props.type}`,
  itemValueTemplate: templateName,
});
</script>
