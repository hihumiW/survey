<template>
  <ItemsEditor
    title="Choices"
    bindName="choices"
    :items="currentActiveItem.choices || []"
    :onItemAdd="handleItemAdd"
    :onItemRemove="handleItemRemove"
    :onItemTitleChange="handleTitleChange"
    :onItemValueChange="handleItemValueChange"
  />
</template>

<script setup>
import ItemsEditor from "../ItemsEditor";

import { useInjectCreator } from "@survey/hooks/useCreator";
import useChoices from "@survey/Creator/hooks/useChoices";

const { currentActiveItem, currentActivePath } = useInjectCreator();

const {
  handleTitleChange,
  handleItemValueChange,
  handleItemAdd,
  handleItemRemove,
} = useChoices(currentActivePath);
</script>
