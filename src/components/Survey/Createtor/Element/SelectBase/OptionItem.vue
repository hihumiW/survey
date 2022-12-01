<template>
  <div class="flex gap-x-1.5 items-center survey-question-select_item">
    <NButton
      size="small"
      quaternary
      circle
      :type="selectItemPrefixConfig.buttonType"
      @click="handlePredixButtonClick"
    >
      <template #icon>
        <NIcon size="20px">
          <component :is="selectItemPrefixConfig.component" />
        </NIcon>
      </template>
    </NButton>
    <div class="flex gap-x-2">
      <template v-if="type === 'edit'">
        <component :is="ItemComponent" />
        <Title :value="props.chioceText" @update:value="handleTitleChange" />
      </template>
      <template v-else>
        <component :is="ItemComponent" />
        <span class="text-base ml-1.5">{{ props.chioceText }}</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { NRadio, NCheckbox, NIcon, NButton } from "naive-ui";
import { AddCircleOutline, RemoveCircleOutline } from "@vicons/ionicons5";
import { computed } from "vue";
import Title from "../../../components/Title/index.vue";

const emit = defineEmits(["titleChange", "remove", "addItem"]);
const props = defineProps({
  chioceText: String,
  chioceIndex: Number,
  type: String,
  questionType: {
    type: String,
    required: true,
  },
});

const ItemComponent = computed(() =>
  props.questionType === "checkbox" ? NCheckbox : NRadio
);

const handlePredixButtonClick = () =>
  props.type === "edit" ? emit("remove", props.chioceIndex) : emit("addItem");

const selectItemPrefixConfig = computed(() =>
  props.type === "edit"
    ? {
        component: RemoveCircleOutline,
        buttonType: "error",
      }
    : {
        component: AddCircleOutline,
        buttonType: "primary",
      }
);

const handleTitleChange = (title) =>
  emit("titleChange", props.chioceIndex, title);
</script>

<style>
.survey-question-select_item .n-radio--disabled,
.survey-question-select_item .n-radio-input {
  cursor: auto !important;
}
.survey-question-select_item .n-radio {
  transform: scale(1.2);
}
</style>
