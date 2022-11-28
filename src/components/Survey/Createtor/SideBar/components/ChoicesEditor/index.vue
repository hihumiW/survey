<template>
  <Vertical>
    <template #title>
      <div class="flex justify-between">
        <span>{{ props.title }}</span>
        <NButton circle quaternary size="small" @click="handleChoiceAdd">
          <template #icon>
            <NIcon size="20px">
              <AddCircleOutline />
            </NIcon>
          </template>
        </NButton>
      </div>
    </template>
    <div class="border-neutral-200 border bg-white">
      <ChoiceItem
        v-for="(choice, index) in currentActiveItem.choices"
        :key="choice.value"
        :choice="choice"
        :choiceIndex="index"
        @titleChange="handleChoiceTitleChange"
        @valueChange="handleItemValueChange"
        @remove="handleChoiceRemove"
      />
    </div>
  </Vertical>
</template>

<script setup>
import Vertical from "../Layout/Vertical.vue";
import { NButton, NIcon } from "naive-ui";
import { AddCircleOutline } from "@vicons/ionicons5";
import ChoiceItem from "./ChoiceItem.vue";
import { inject, unref } from "vue";
import useChoice from "../../../hooks/useChoice";

const { currentActiveItem, currentActivePath } = inject("creator");

const props = defineProps({
  title: {
    type: String,
    default: "Choices",
  },
  bindName: {
    type: String,
    default: "choices",
  },
});
const {
  handleChoiceTitleChange,
  handleChoiceRemove,
  handleChoiceAdd,
  updateChoiceItemValue,
} = useChoice(currentActivePath);

const handleItemValueChange = (choiceIndex, newValue) =>
  updateChoiceItemValue(unref(currentActivePath), choiceIndex, newValue);
</script>
