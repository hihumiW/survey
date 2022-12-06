import { unref } from "vue";
import GridColumnEditor from "../components/GridColumnEditor/index.vue";
import GridRowEditor from "../components/GridRowEditor/index.vue";
import GridCellType from "../components/GridCellType/index.vue";
import generateConditionComp from "./generateValueBinder";
import InputValueBinder from "../components/ValueBinder/Input.vue";
import BooleanValueBinader from "../components/ValueBinder/Boolean.vue";
import ChoicesEditor from "../components/ChoicesEditor/index.vue";
import questionTypeEnum, {
  gridCellTypeEnum,
} from "@survey/util/questionTypeEnum";
import {
  NameEditor,
  TitleEditor,
  IsRequiredEditor,
  ReadOnlyEditor,
  ShowQuestionNumberEditor,
  IndentEditor,
  VisibleIfEditor,
  EditableIfEditor,
  RequiredIfEditor,
} from "./common";

import {
  PlaceHolderEditor,
  InputTypeEditor,
  NumberPrecisionEditor,
  MaximumLengthEditor,
} from "./textConfig";

import { DropdownPlaceholder } from "./selectConfig";

export const gridConfig = [
  {
    categoryName: "General",
    categoryTitle: "General",
    components: [NameEditor, TitleEditor, IsRequiredEditor, ReadOnlyEditor],
  },
  {
    categoryName: "Columns",
    categoryTitle: "Columns",
    components: [GridColumnEditor],
  },
  {
    categoryName: "Rows",
    categoryTitle: "Rows",
    components: [GridRowEditor],
  },
  {
    categoryName: "Layout",
    categoryTitle: "Layout",
    components: [IndentEditor, ShowQuestionNumberEditor],
  },
  {
    categoryName: "Logic",
    categoryTitle: "Logic",
    components: [VisibleIfEditor, RequiredIfEditor, EditableIfEditor],
  },
];

/** -----------input Cell ------------------*/
const isInputCell = ({ currentActiveItem }) =>
  unref(currentActiveItem).cellType === gridCellTypeEnum.input;

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
const GridMaximumLengthEditor = generateConditionComp(
  MaximumLengthEditor,
  undefined,
  "GridMaximumLengthEditor",
  isInputCell
);

/**------------------------------- */

/** -----------text Cell ------------------*/

const isTextCell = ({ currentActiveItem }) =>
  unref(currentActiveItem)?.cellType === gridCellTypeEnum.text;

const CellTextContentEditor = generateConditionComp(
  InputValueBinder,
  {
    title: "Cell text",
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
      title: "Multiple choice",
      bindName: "multipleChoice",
    }}
  />
);

/**------------------------------- */

const GridColumnCellTypeEditor = () => (
  <GridCellType title="Colum cell type" type={questionTypeEnum.gridColumn} />
);

export const gridColumnConfig = ({ currentActiveItem }) => {
  const config = [
    {
      categoryTitle: "Column",
      categoryName: "gridColumn",
      components: [
        GridColumnCellTypeEditor,
        CellTextContentEditor,
        GridInputTypeEditor,
        GridPlaceHolderEditor,
        GridNumberPrecisionEditor,
        GridMaximumLengthEditor,
      ],
    },
  ];
  if (unref(currentActiveItem)?.cellType === gridCellTypeEnum.dropdown) {
    config.push({
      categoryTitle: "Choice",
      categoryName: "gridChoice",
      components: [ChoicesEditor, DropdownPlaceholder, DropdownMuitipleEditor],
    });
  }
  return config;
};

export const gridCellConfig = [
  {
    categoryTitle: "Cell",
    categoryName: "gridCell",
    components: [],
  },
];
