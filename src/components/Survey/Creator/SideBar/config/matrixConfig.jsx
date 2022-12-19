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
    categoryTitle: "General",
    components: [NameEditor, TitleEditor, IsRequiredEditor, ReadOnlyEditor],
  },
  {
    categoryName: "Columns",
    categoryTitle: "Columns",
    components: [ColumnsEditor],
  },
  {
    categoryName: "Rows",
    categoryTitle: "Rows",
    components: [RowsEditor],
  },
  {
    categoryName: "Layout",
    categoryTitle: "Layout",
    components: [IndentEditor, ShowQuestionNumberEditor],
  },
  {
    categoryName: "Logic",
    categoryTitle: "Logic",
    components: [VisibleIfEditor, EditableIfEditor],
  },
];

const ScoreValueBinder = () => (
  <InputValueBinder
    title="Score"
    type="number"
    bindName="score"
    inputProps={{ min: 0 }}
    defaultValue={0}
  />
);

export const matrixSelectColumnConfig = [
  {
    categoryTitle: "Column",
    categoryName: "matrixSelectColumn",
    components: [GridColumnTitleEditor, ScoreValueBinder],
  },
];

export const matrixInputColumnConfig = [
  {
    categoryTitle: "Column",
    categoryName: "matrixInputColumn",
    components: [GridColumnTitleEditor],
  },
];

export const matrixDropdownColumnConfig = [
  {
    categoryTitle: "Column",
    categoryName: "matrixDropdownColumn",
    components: [GridColumnTitleEditor],
  },
  {
    categoryTitle: "Choices",
    categoryName: "matrixDropdownColumnChoices",
    components: [() => <ChoicesEditor showScore />],
  },
];
