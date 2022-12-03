<template>
  <ItemsEditor
    title="Choices"
    bindName="choices"
    :items="currentActiveItem.choices"
    :onItemAdd="handleChoiceAdd"
    :onItemRemove="handleChoiceRemove"
    :onItemTitleChange="handleChoiceTitleChange"
    :onItemValueChange="handleItemValueChange"
  />
</template>

<script setup>
import ItemsEditor from "../ItemsEditor";
import useChoice from "@survey/Creator/hooks/useChoice";
import { useInjectCreator } from "@survey/hooks/useCreator";

const { currentActiveItem, currentActivePath } = useInjectCreator();

const {
  handleChoiceTitleChange,
  handleChoiceRemove,
  handleChoiceAdd,
  handleItemValueChange,
} = useChoice(currentActivePath);
</script>
