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
} from "./common";

const FileAcceptedTypesEditor = () => (
  <SelectBinder
    {...{
      title: "Accepted file types",
      bindName: "acceptedTypes",
      options: fileTypeOptions,
      selectProps: {
        multiple: true,
        filterable: true,
      },
    }}
  />
);

const MaxFileCount = () => (
  <SelectBinder
    {...{
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
    }}
  />
);

const FileMaxSizeEditor = () => (
  <InputBinder
    {...{
      title: "Maximum file size (in bytes)",
      bindName: "maxSize",
      type: "number",
      inputProps: {
        min: 1,
      },
    }}
  />
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
    components: [VisibleIfEditor, EditableIfEditor],
  },
];
