import generateValueBinder from "./generateValueBinder";
import InputBinder from "../components/ValueBinder/Input.vue";
import RadioBinder from "../components/ValueBinder/Radio.vue";
import BooleanBinder from "../components/ValueBinder/Boolean.vue";
import generateConditionComp from "./generateValueBinder";
import ChoicesEditor from "../components/ChoicesEditor";
import questionTypeEnum from "@survey/types/questionTypeEnum";
import { unref } from "vue";
import {
  NameEditor,
  TitleEditor,
  IsRequiredEditor,
  ReadOnlyEditor,
  ShowQuestionNumberEditor,
  TitleLocatioEditor,
  IndentEditor,
  VisibleIfEditor,
  EditableIfEditor,
  DefaultValueExpressionEditor,
} from "./common";

export const ChoicesOrientationEditor = () => (
  <RadioBinder
    {...{
      title: "选项方向",
      bindName: "orientation",
      options: [
        {
          label: "垂直",
          value: "vertical",
        },
        {
          label: "水平",
          value: "horizontal",
        },
      ],
    }}
  />
);

export const EnableOtherOptionEditor = () => (
  <BooleanBinder
    {...{
      title: "启用其他选项 (描述)",
      bindName: "showOtherItem",
    }}
  />
);

export const OtherOptionTextEditor = generateValueBinder(
  InputBinder,
  {
    title: "其他选项文本",
    bindName: "otherText",
  },
  "OtherOptionTextEditor",
  ({ currentActiveItem }) => unref(currentActiveItem).showOtherItem
);

export const OtherOptionPlaceholder = generateValueBinder(
  InputBinder,
  {
    title: "其他选项描述占位符",
    bindName: "otherPlaceholder",
  },
  "OtherOptionPlaceholder",
  ({ currentActiveItem }) => unref(currentActiveItem).showOtherItem
);

const isDropDownType = ({ currentActiveItem }) =>
  unref(currentActiveItem).type === questionTypeEnum.dropdown;

export const DropdownPlaceholder = () => (
  <InputBinder
    title="下拉选择框占位符"
    bindName="dropdownPlaceholder"
    inputProps={{ maxlength: 30, showCount: true }}
  />
);

export const EnableExternalLoadOptionsEditor = () => (
  <BooleanBinder
    {...{
      title: "选项通过外部加载",
      bindName: "enableExternalLoadOptions",
      options: [
        {
          label: "否",
          value: 0,
        },
        {
          label: "是",
          value: 1,
        },
      ],
    }}
  />
);
export const ExternalLoadOptionsName = generateConditionComp(
  () => (
    <InputBinder title="外部加载字段名" bindName="externalLoadOptionsName" />
  ),
  {},
  "ExternalLoadOptionsName",
  ({ currentActiveItem }) =>
    Boolean(unref(currentActiveItem).enableExternalLoadOptions)
);
const DropDownPlaceholderEditor = generateConditionComp(
  DropdownPlaceholder,
  {},
  "DropDownPlaceholderEditor",
  isDropDownType
);

export default [
  {
    categoryTitle: "通用",
    categoryName: "General",
    components: [NameEditor, TitleEditor, IsRequiredEditor, ReadOnlyEditor],
  },
  {
    categoryTitle: "选项",
    categoryName: "Choices",
    components: [
      () => <ChoicesEditor showScore />,
      DropDownPlaceholderEditor,
      EnableOtherOptionEditor,
      OtherOptionTextEditor,
      OtherOptionPlaceholder,
    ],
  },
  {
    categoryTitle: "布局",
    categoryName: "Layout",
    components: [
      TitleLocatioEditor,
      IndentEditor,
      ChoicesOrientationEditor,
      ShowQuestionNumberEditor,
    ],
  },
  {
    categoryTitle: "逻辑",
    categoryName: "Logic",
    components: [
      VisibleIfEditor,
      EditableIfEditor,
      DefaultValueExpressionEditor,
    ],
  },
];
