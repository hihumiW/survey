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
} from "@survey/types/questionTypeEnum";
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
  filterCellsEmpty,
  filterCellEmptyRows,
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
    { label: "文本", value: gridCellTypeEnum.text },
    {
      label: "输入框",
      value: gridCellTypeEnum.input,
    },
    {
      label: "下拉选择",
      value: gridCellTypeEnum.dropdown,
    },
  ];
  if (unref(isGridCell)) {
    options.unshift({
      label: "继承列",
      value: gridCellTypeEnum.inherit,
    });
  }
  return options;
});

const handleCellTypeChange = (value) => {
  const activeCell = unref(currentActiveItem);

  const unRefIsGridCell = unref(isGridCell);
  if (value === gridCellTypeEnum.inherit) {
    if (unRefIsGridCell) {
      currentActiveItem.value = null;
      removeItem(unref(currentActivePath));
      const cellsPath = unref(currentActivePath).split(".cells")[0] + ".cells";
      filterCellEmptyRows(cellsPath);
      filterCellsEmpty(cellsPath);
    }
  } else {
    let mergedConfig = {};
    if (!unRefIsGridCell) {
      const { value, text } = activeCell;
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
