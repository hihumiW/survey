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
      title: "接受的文件类型",
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
      title: "最大文件数量",
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
      title: "最大文件总大小 (单位字节B)",
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
    categoryTitle: "通用",
    categoryName: "General",
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
    categoryTitle: "布局",
    categoryName: "Layout",
    components: [TitleLocatioEditor, IndentEditor, ShowQuestionNumberEditor],
  },
  {
    categoryTitle: "逻辑",
    categoryName: "Logic",
    components: [VisibleIfEditor, EditableIfEditor],
  },
];
