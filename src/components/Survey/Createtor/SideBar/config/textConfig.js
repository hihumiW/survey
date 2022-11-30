import { unref } from "vue";
import generateValueBinder from "./generateValueBinder";
import InputBinder from "../components/ValueBinder/Input.vue";
import SelectBinder from "../components/ValueBinder/Select.vue";
import RadioBinder from "../components/ValueBinder/Radio.vue";
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
  RequiredIfEditor,
  DefaultValueExpressionEditor,
} from "./common";

//文本Placeholder的组件
const PlaceHolderEditor = generateValueBinder(
  InputBinder,
  {
    title: "Input area placeholder",
    bindName: "placeholder",
  },
  "PlaceHolderEditor",
  // 只会在inputType 为默认值(text) 和 number时显示
  ({ currentActiveItem }) =>
    ["text", "number"].includes(unref(currentActiveItem).inputType)
);

const MinimumLengthEditor = generateValueBinder(
  InputBinder,
  {
    title: "Minimum length",
    bindName: "minLength",
    type: "number",
    inputProps: {
      min: 0,
      max: 500,
    },
  },
  "MinimumLengthEditor",
  ({ currentActiveItem }) =>
    ["text"].includes(unref(currentActiveItem).inputType)
);

//文本输入长度限制
const MaximumLengthEditor = generateValueBinder(
  InputBinder,
  {
    title: "Maximum length",
    bindName: "maxLength",
    type: "number",
    inputProps: {
      min: 0,
      max: 500,
    },
  },
  "MaximumLengthEditor",
  ({ currentActiveItem }) =>
    ["text"].includes(unref(currentActiveItem).inputType)
);

//文本类型
const InputTypeEditor = generateValueBinder(
  SelectBinder,
  {
    title: "Input type",
    bindName: "inputType",
    options: [
      {
        label: "text",
        value: "text",
      },
      {
        label: "number",
        value: "number",
      },
      {
        label: "date",
        value: "date",
      },
      {
        label: "time",
        value: "time",
      },
      {
        label: "provinceCity",
        value: "provinceCity",
      },
    ],
  },
  "InputTypeEditor"
);

const InputVariantEditor = generateValueBinder(RadioBinder, {
  title: "Input variant",
  bindName: "inputVariant",
  options: [
    {
      label: "Outlined",
      value: "outlined",
    },
    {
      label: "Standard",
      value: "standard",
    },
  ],
});

const NumberPrecisionEditor = generateValueBinder(
  RadioBinder,
  {
    title: "Precision of input value",
    bindName: "precision",
    options: [
      {
        label: "Free",
        value: "",
      },
      {
        label: "Integrate",
        value: 0,
      },
      {
        label: "1",
        value: 1,
      },
      {
        label: "2",
        value: 2,
      },
      {
        label: "3",
        value: 3,
      },
    ],
  },
  "NumberPrecisonEditor",
  ({ currentActiveItem }) =>
    ["number"].includes(unref(currentActiveItem).inputType)
);

export default [
  {
    categoryName: "General",
    categoryTitle: "General",
    components: [
      NameEditor,
      TitleEditor,
      IsRequiredEditor,
      ReadOnlyEditor,
      PlaceHolderEditor,
      InputTypeEditor,
      NumberPrecisionEditor,
      MinimumLengthEditor,
      MaximumLengthEditor,
    ],
  },
  {
    categoryName: "Layout",
    categoryTitle: "Layout",
    components: [
      TitleLocatioEditor,
      IndentEditor,
      InputVariantEditor,
      ShowQuestionNumberEditor,
    ],
  },
  {
    categoryName: "Logic",
    categoryTitle: "Logic",
    components: [
      VisibleIfEditor,
      EditableIfEditor,
      RequiredIfEditor,
      DefaultValueExpressionEditor,
    ],
  },
];
