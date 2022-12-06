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

const isGridCell = props.type === questionTypeEnum.gridCell;

const selectValue = ref();
const cellTypePath = () => `${unref(currentActivePath)}.cellType`;
const setSelectValue = () => {
  selectValue.value =
    getModelV(cellTypePath()) ||
    (isGridCell ? gridCellTypeEnum.inherit : undefined);
};
setSelectValue();

watch(currentActivePath, setSelectValue);

const CellTypeOptions = [
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

if (isGridCell) {
  CellTypeOptions.push([
    {
      label: "Inherit",
      value: gridCellTypeEnum.inherit,
    },
  ]);
}

const handleCellTypeChange = (value) => {
  const activeItem = unref(currentActiveItem);
  if (value === gridCellTypeEnum.inherit) {
    if (isGridCell) {
      removeItem(unref(currentActivePath));
      currentActiveItem.value = null;
    }
  } else {
    let mergedConfig = {};
    if (!isGridCell) {
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
