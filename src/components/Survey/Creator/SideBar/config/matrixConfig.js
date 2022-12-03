import generateValueBinder from "./generateValueBinder";
import MatrixItemEditor from "../components/MatrixItemEditor/index.vue";

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

const ColumnsEditor = generateValueBinder(
  MatrixItemEditor,
  {
    type: "columns",
  },
  "ColumnsEditor"
);

const RowsEditor = generateValueBinder(
  MatrixItemEditor,
  {
    type: "rows",
  },
  "RowsEditor"
);

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
    components: [VisibleIfEditor, RequiredIfEditor, EditableIfEditor],
  },
];
