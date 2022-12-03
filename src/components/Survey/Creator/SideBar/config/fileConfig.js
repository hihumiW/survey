import generateValueBinder from "./generateValueBinder";
import SelectBinder from "../components/ValueBinder/Select.vue";
import InputBinder from "../components/ValueBinder/Input.vue";
import fileTypeOptions from "../../util/fileTypeOptions";
import {
  NameEditor,
  TitleEditor,
  IsRequiredEditor,
  ShowQuestionNumberEditor,
  TitleLocatioEditor,
  IndentEditor,
  VisibleIfEditor,
  EditableIfEditor,
  RequiredIfEditor,
} from "./common";

const FileAcceptedTypesEditor = generateValueBinder(
  SelectBinder,
  {
    title: "Accepted file types",
    bindName: "acceptedTypes",
    options: fileTypeOptions,
    selectProps: {
      multiple: true,
      filterable: true,
    },
  },
  "FileAcceptedTypesEditor"
);

const MaxFileCount = generateValueBinder(SelectBinder, {
  title: "Maximum number of file",
  bindName: "maxNumber",
  options: Array(10)
    .fill(undefined)
    .map((_i, i) => ({
      label: i + 1,
      value: i + 1,
    })),
  selectProps: {
    clearable: true,
  },
});

const FileMaxSizeEditor = generateValueBinder(
  InputBinder,
  {
    title: "Maximum file size (in bytes)",
    bindName: "maxSize",
    type: "number",
    inputProps: {
      min: 1,
    },
  },
  "FileMaxSizeEditor"
);

export default [
  {
    categoryName: "General",
    categoryTitle: "General",
    components: [
      NameEditor,
      TitleEditor,
      IsRequiredEditor,
      MaxFileCount,
      FileAcceptedTypesEditor,
      FileMaxSizeEditor,
    ],
  },
  {
    categoryName: "Layout",
    categoryTitle: "Layout",
    components: [TitleLocatioEditor, IndentEditor, ShowQuestionNumberEditor],
  },
  {
    categoryName: "Logic",
    categoryTitle: "Logic",
    components: [VisibleIfEditor, RequiredIfEditor, EditableIfEditor],
  },
];
