<template>
  <Vertical :title="props.title">
    <NSelect
      size="large"
      :options="CellTypeOptions"
      :value="selectValue"
      @update:value="handleCellTypeChange"
    />
  </Vertical>
</template>

<script setup>
import Vertical from "../Layout/Vertical";
import { NSelect } from "naive-ui";
import { useInjectCreator } from "@survey/hooks/useCreator";
import questionTypeEnum, {
  gridCellTypeEnum,
} from "@survey/util/questionTypeEnum";
import { getGridCellDefaultConfig } from "@survey/hooks/useCreator/questionDefaultConfig";
import { unref, ref, watch, nextTick } from "vue";
import { computed } from "@vue/reactivity";

const props = defineProps({
  title: String,
  type: {
    type: String,
    required: true,
  },
});

const {
  currentActivePath,
  currentActiveItem,
  getModelV,
  updateQuestionFieldValueByPath,
  removeItem,
} = useInjectCreator();

const isGridCell = computed(() => props.type === questionTypeEnum.gridCell);

const selectValue = ref();
const cellTypePath = () => `${unref(currentActivePath)}.cellType`;
const setSelectValue = () => {
  selectValue.value =
    getModelV(cellTypePath()) ||
    (unref(isGridCell) ? gridCellTypeEnum.inherit : undefined);
};
setSelectValue();

watch(currentActivePath, setSelectValue);

const CellTypeOptions = computed(() => {
  const options = [
    { label: "Text", value: gridCellTypeEnum.text },
    {
      label: "Input",
      value: gridCellTypeEnum.input,
    },
    {
      label: "Dropdown",
      value: gridCellTypeEnum.dropdown,
    },
  ];
  if (unref(isGridCell)) {
    options.unshift({
      label: "Inherit",
      value: gridCellTypeEnum.inherit,
    });
  }
  return options;
});

const handleCellTypeChange = (value) => {
  const activeItem = unref(currentActiveItem);
  const unRefIsGridCell = unref(isGridCell);
  if (value === gridCellTypeEnum.inherit) {
    if (unRefIsGridCell) {
      currentActiveItem.value = null;
      removeItem(unref(currentActivePath));
    }
  } else {
    let mergedConfig = {};
    if (!unRefIsGridCell) {
      const { value, text } = activeItem;
      mergedConfig = {
        value,
        text,
      };
    }
    const cellConfig = getGridCellDefaultConfig(value);
    const updateConfig = {
      ...mergedConfig,
      ...cellConfig,
    };
    updateQuestionFieldValueByPath(unref(currentActivePath), updateConfig);
    currentActiveItem.value = updateConfig;
  }
  nextTick(() => setSelectValue());
};
</script>
