import { unref } from "vue";
import GridColumnEditor from "../components/GridColumnEditor/index.vue";
import GridRowEditor from "../components/GridRowEditor/index.vue";
import GridCellType from "../components/GridCellType/index.vue";
import generateConditionComp from "./generateValueBinder";
import InputValueBinder from "../components/ValueBinder/Input.vue";
import BooleanValueBinader from "../components/ValueBinder/Boolean.vue";
import ChoicesEditor from "../components/ChoicesEditor";
import BlanksSetting from "../components/BlanksSetting";

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

import {
  DropdownPlaceholder,
  EnableOtherOptionEditor,
  OtherOptionTextEditor,
  OtherOptionPlaceholder,
  ChoicesOrientationEditor,
  EnableExternalLoadOptionsEditor,
  ExternalLoadOptionsName,
} from "./selectConfig";

import { AlignSelect } from "./paragraphConfig";

export const HideTableHeader = () => (
  <BooleanValueBinader
    {...{
      title: "隐藏表头",
      bindName: "hideTableHeader",
    }}
  />
);

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
    components: [IndentEditor, ShowQuestionNumberEditor, HideTableHeader],
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

const GridCellRowSpanEditor = () => {
  return (
    <InputValueBinder
      type="number"
      defaultValue={1}
      title="单元格行合并"
      bindName="rowSpan"
      inputProps={{ min: 1, max: 10, clearable: true }}
    />
  );
};

const GridCellColSpanEditor = () => {
  return (
    <InputValueBinder
      title="单元格列合并"
      bindName="colSpan"
      defaultValue={1}
      type="number"
      inputProps={{
        min: 1,
        max: 10,
        clearable: true,
      }}
    />
  );
};

export const GridColumnTitleEditor = () => (
  <InputValueBinder
    title="列标题"
    bindName="text"
    type="textarea"
    inputProps={{ maxlength: 30, showCount: true }}
  />
);

export const GridCollumnWidthInput = () => (
  <InputValueBinder
    title="列宽度"
    type="number"
    bindName="colWidth"
    defaultValue={250}
    inputProps={{ min: 100, max: 500, precision: 0 }}
  />
);

const GridCellAliasInput = () => (
  <InputValueBinder title="单元格别名" bindName="cellAlias" />
);

export const gridCellConfig = ({
  currentActiveItem,
  currentActiveItemType,
}) => {
  const cellType = unref(currentActiveItem)?.cellType;
  const isGridColumn =
    unref(currentActiveItemType) === questionTypeEnum.gridColumn;
  const isDropdownType = cellType === gridCellTypeEnum.dropdown;
  const isCheckboxType = cellType === gridCellTypeEnum.checkbox;
  const isRadioType = cellType === gridCellTypeEnum.radio;
  const isBlanksType = cellType === gridCellTypeEnum.blanks;
  const isTextType = cellType === gridCellTypeEnum.text;
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
    config[0].components.push(GridCollumnWidthInput);
  } else {
    config[0].components.unshift(GridCellAliasInput);
    config[0].components.push(GridCellColSpanEditor);
    config[0].components.push(GridCellRowSpanEditor);
  }
  if (isDropdownType) {
    config.push({
      categoryTitle: "选项",
      categoryName: "gridDropdownChoice",
      components: [ChoicesEditor, DropdownPlaceholder, DropdownMuitipleEditor],
    });
  }
  if (isCheckboxType || isRadioType) {
    config.push({
      categoryTitle: "选项",
      categoryName: isCheckboxType ? "gridCheckChoices" : "gridRadioChoices",
      components: [
        EnableExternalLoadOptionsEditor,
        ExternalLoadOptionsName,
        ChoicesEditor,
        EnableOtherOptionEditor,
        OtherOptionTextEditor,
        OtherOptionPlaceholder,
        ChoicesOrientationEditor,
      ],
    });
  }
  if (isBlanksType) {
    config.push({
      categoryTitle: "填空",
      categoryName: "gridBlanks",
      components: [BlanksSetting],
    });
  }
  if (isTextType) {
    config.push({
      categoryTitle: "布局",
      categoryName: "gridLayout",
      components: [AlignSelect],
    });
  }

  return config;
};
