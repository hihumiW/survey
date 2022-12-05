import GridColumnEditor from "../components/GridColumnEditor/index.vue";
import GridRowEditor from "../components/GridRowEditor/index.vue";
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

export default [
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
