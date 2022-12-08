import MatrixItemEditor from "../components/MatrixItemEditor";

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
    components: [VisibleIfEditor, RequiredIfEditor, EditableIfEditor],
  },
];
