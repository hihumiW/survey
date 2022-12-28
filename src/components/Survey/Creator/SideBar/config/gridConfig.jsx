import { unref } from "vue";
import GridColumnEditor from "../components/GridColumnEditor/index.vue";
import GridRowEditor from "../components/GridRowEditor/index.vue";
import GridCellType from "../components/GridCellType/index.vue";
import generateConditionComp from "./generateValueBinder";
import InputValueBinder from "../components/ValueBinder/Input.vue";
import BooleanValueBinader from "../components/ValueBinder/Boolean.vue";
import ChoicesEditor from "../components/ChoicesEditor";
import questionTypeEnum, {
  gridCellTypeEnum,
} from "@survey/types/questionTypeEnum";
import {
  NameEditor,
  TitleEditor,
  IsRequiredEditor,
  ReadOnlyEditor,
  ShowQuestionNumberEditor,
  IndentEditor,
  VisibleIfEditor,
  EditableIfEditor,
} from "./common";

import {
  PlaceHolderEditor,
  InputTypeEditor,
  NumberPrecisionEditor,
  MaximumLengthEditor,
  ProvinceSelector,
} from "./textConfig";

import { DropdownPlaceholder } from "./selectConfig";

export const gridConfig = [
  {
    categoryTitle: "通用",
    categoryName: "General",
    components: [NameEditor, TitleEditor, IsRequiredEditor, ReadOnlyEditor],
  },
  {
    categoryTitle: "表格列",
    categoryName: "Columns",
    components: [GridColumnEditor],
  },
  {
    categoryTitle: "表格行",
    categoryName: "Rows",
    components: [GridRowEditor],
  },
  {
    categoryTitle: "布局",
    categoryName: "Layout",
    components: [IndentEditor, ShowQuestionNumberEditor],
  },
  {
    categoryTitle: "逻辑",
    categoryName: "Logic",
    components: [VisibleIfEditor, EditableIfEditor],
  },
];

/** -----------input Cell ------------------*/
const isInputCell = ({ currentActiveItem }) => {
  return unref(currentActiveItem)?.cellType === gridCellTypeEnum.input;
};

const GridInputTypeEditor = generateConditionComp(
  InputTypeEditor,
  undefined,
  "GridInputTypeEditor",
  isInputCell
);

const GridPlaceHolderEditor = generateConditionComp(
  PlaceHolderEditor,
  undefined,
  "GridPlaceHolderEditor",
  isInputCell
);

const GridNumberPrecisionEditor = generateConditionComp(
  NumberPrecisionEditor,
  undefined,
  "GridNumberPrecisionEditor",
  [isInputCell]
);
const GridProvinceSelectEditor = generateConditionComp(
  ProvinceSelector,
  undefined,
  "GridProvinceSelectEditor",
  [isInputCell]
);

const GridMaximumLengthEditor = generateConditionComp(
  MaximumLengthEditor,
  undefined,
  "GridMaximumLengthEditor",
  isInputCell
);

/**------------------------------- */

/** -----------text Cell ------------------*/

const isTextCell = ({ currentActiveItem }) => {
  return unref(currentActiveItem)?.cellType === gridCellTypeEnum.text;
};

const CellTextContentEditor = generateConditionComp(
  InputValueBinder,
  {
    title: "单元格文本内容",
    bindName: "cellText",
    type: "textarea",
  },
  "CellTextContentEditor",
  isTextCell
);

/**------------------------------- */

/** -----------dropdown Cell ------------------*/

const DropdownMuitipleEditor = () => (
  <BooleanValueBinader
    {...{
      title: "启用多选",
      bindName: "multipleChoice",
    }}
  />
);

/**------------------------------- */

const GridColumnCellTypeEditor = () => (
  <GridCellType title="列单元格类型" type={questionTypeEnum.gridColumn} />
);

const GridCellTypeEditor = () => (
  <GridCellType title="单元格类型" type={questionTypeEnum.gridCell} />
);

export const GridColumnTitleEditor = () => (
  <InputValueBinder
    title="列标题"
    bindName="text"
    type="textarea"
    inputProps={{ maxlength: 30, showCount: true }}
  />
);

export const gridCellConfig = ({
  currentActiveItem,
  currentActiveItemType,
}) => {
  const isGridColumn =
    unref(currentActiveItemType) === questionTypeEnum.gridColumn;
  const isDropdownType =
    unref(currentActiveItem)?.cellType === gridCellTypeEnum.dropdown;

  const config = [
    {
      categoryTitle: isGridColumn ? "列" : "单元格",
      categoryName: isGridColumn ? "gridColumn" : "gridCell",
      components: [
        isGridColumn ? GridColumnCellTypeEditor : GridCellTypeEditor,
        CellTextContentEditor,
        GridInputTypeEditor,
        GridPlaceHolderEditor,
        GridNumberPrecisionEditor,
        GridMaximumLengthEditor,
        GridProvinceSelectEditor,
      ],
    },
  ];
  if (isGridColumn) {
    config[0].components.unshift(GridColumnTitleEditor);
  }
  if (isDropdownType) {
    config.push({
      categoryTitle: "选项",
      categoryName: "gridChoice",
      components: [ChoicesEditor, DropdownPlaceholder, DropdownMuitipleEditor],
    });
  }

  return config;
};
