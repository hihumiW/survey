import { unref } from "vue";
import generateConditionComp from "./generateValueBinder";
import InputBinder from "../components/ValueBinder/Input.vue";
import SelectBinder from "../components/ValueBinder/Select.vue";
import RadioBinder from "../components/ValueBinder/Radio.vue";
import { textTypeEnum } from "@survey/types/questionTypeEnum";
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

const generateVisibleInputConditon =
  (inputTypes) =>
  ({ currentActiveItem }) =>
    inputTypes.includes(unref(currentActiveItem).inputType);

const isTextInputType = generateVisibleInputConditon([
  undefined,
  textTypeEnum.text,
]);
const isNumberInputType = generateVisibleInputConditon([textTypeEnum.number]);

const isTextOrNumberInputType = generateVisibleInputConditon([
  undefined,
  textTypeEnum.text,
  textTypeEnum.number,
]);

//文本Placeholder的组件
export const PlaceHolderEditor = generateConditionComp(
  InputBinder,
  {
    title: "Input area placeholder",
    bindName: "placeholder",
    defaultValue: "",
  },
  "PlaceHolderEditor",
  // 只会在inputType 为默认值(text) 和 number时显示
  isTextOrNumberInputType
);

const MinimumLengthEditor = generateConditionComp(
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
  isTextInputType
);

//文本输入长度限制
export const MaximumLengthEditor = generateConditionComp(
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
  isTextInputType
);

//文本类型
export const InputTypeEditor = (
  <SelectBinder
    {...{
      title: "Input type",
      bindName: "inputType",
      emptySelectedValue: "text",
      options: [
        {
          label: "text",
          value: textTypeEnum.text,
        },
        {
          label: "number",
          value: textTypeEnum.number,
        },
        {
          label: "date",
          value: textTypeEnum.date,
        },
        {
          label: "time",
          value: textTypeEnum.time,
        },
        {
          label: "provinceCity",
          value: textTypeEnum.provinceCity,
        },
      ],
    }}
  />
);

const InputVariantEditor = (
  <RadioBinder
    {...{
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
    }}
  />
);

export const NumberPrecisionEditor = generateConditionComp(
  RadioBinder,
  {
    title: "Precision of input value",
    bindName: "precision",
    options: [
      {
        label: "Free",
        value: -1,
      },
      {
        label: "Integrate",
        value: 1,
      },
      {
        label: "1",
        value: 2,
      },
      {
        label: "2",
        value: 3,
      },
      {
        label: "3",
        value: 4,
      },
    ],
  },
  "NumberPrecisonEditor",
  isNumberInputType
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
      // MinimumLengthEditor,
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
