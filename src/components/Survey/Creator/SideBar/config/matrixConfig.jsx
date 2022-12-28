import MatrixItemEditor from "../components/MatrixItemEditor";
import { GridColumnTitleEditor } from "./gridConfig";
import InputValueBinder from "../components/ValueBinder/Input.vue";
import ChoicesEditor from "../components/ChoicesEditor";
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

export const ColumnsEditor = () => <MatrixItemEditor type="columns" />;

const RowsEditor = () => <MatrixItemEditor type="rows" />;

export default [
  {
    categoryName: "General",
    categoryTitle: "通用",
    components: [NameEditor, TitleEditor, IsRequiredEditor, ReadOnlyEditor],
  },
  {
    categoryName: "Columns",
    categoryTitle: "列设置",
    components: [ColumnsEditor],
  },
  {
    categoryName: "Rows",
    categoryTitle: "行设置",
    components: [RowsEditor],
  },
  {
    categoryName: "Layout",
    categoryTitle: "布局",
    components: [IndentEditor, ShowQuestionNumberEditor],
  },
  {
    categoryName: "Logic",
    categoryTitle: "逻辑",
    components: [VisibleIfEditor, EditableIfEditor],
  },
];

const ScoreValueBinder = () => (
  <InputValueBinder
    title="分数"
    type="number"
    bindName="score"
    inputProps={{ min: 0 }}
    defaultValue={0}
  />
);

export const matrixSelectColumnConfig = [
  {
    categoryTitle: "列设置",
    categoryName: "matrixSelectColumn",
    components: [GridColumnTitleEditor, ScoreValueBinder],
  },
];

export const matrixInputColumnConfig = [
  {
    categoryTitle: "列设置",
    categoryName: "matrixInputColumn",
    components: [GridColumnTitleEditor],
  },
];

export const matrixDropdownColumnConfig = [
  {
    categoryTitle: "列设置",
    categoryName: "matrixDropdownColumn",
    components: [GridColumnTitleEditor],
  },
  {
    categoryTitle: "选项",
    categoryName: "matrixDropdownColumnChoices",
    components: [() => <ChoicesEditor showScore />],
  },
];
