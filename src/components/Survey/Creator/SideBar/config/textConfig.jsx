import { unref } from "vue";
import generateConditionComp from "./generateValueBinder";
import InputBinder from "../components/ValueBinder/Input.vue";
import ProvinceSelect from "../components/ProvinceSelect";
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

const isProvinceInputType = generateVisibleInputConditon([
  textTypeEnum.provinceCity,
]);

//文本Placeholder的组件
export const PlaceHolderEditor = generateConditionComp(
  InputBinder,
  {
    title: "输入框占位符",
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
    title: "输入的最大长度",
    bindName: "maxLength",
    type: "number",
    inputProps: {
      min: 1,
      max: 500,
      clearable: true,
    },
  },
  "MaximumLengthEditor",
  isTextInputType
);

//文本类型
export const InputTypeEditor = (
  <SelectBinder
    {...{
      title: "输入类型",
      bindName: "inputType",
      emptySelectedValue: "text",
      options: [
        {
          label: "文本",
          value: textTypeEnum.text,
        },
        {
          label: "数字",
          value: textTypeEnum.number,
        },
        {
          label: "日期",
          value: textTypeEnum.date,
        },
        {
          label: "时间",
          value: textTypeEnum.time,
        },
        {
          label: "省市选择",
          value: textTypeEnum.provinceCity,
        },
      ],
    }}
  />
);

const InputVariantEditor = (
  <RadioBinder
    {...{
      title: "输入框变体",
      bindName: "inputVariant",
      options: [
        {
          label: "边框",
          value: "outlined",
        },
        {
          label: "标准",
          value: "standard",
        },
      ],
    }}
  />
);

export const NumberPrecisionEditor = generateConditionComp(
  RadioBinder,
  {
    title: "输入的精度",
    bindName: "precision",
    options: [
      {
        label: "无限制",
        value: -1,
      },
      {
        label: "整数",
        value: 1,
      },
      {
        label: "保留1位",
        value: 2,
      },
      {
        label: "保留2位",
        value: 3,
      },
      {
        label: "保留3位",
        value: 4,
      },
    ],
  },
  "NumberPrecisonEditor",
  isNumberInputType
);

export const ProvinceSelector = generateConditionComp(
  ProvinceSelect,
  {
    title: "可用的省市",
  },
  "ProvinceSelector",
  isProvinceInputType
);

export default [
  {
    categoryName: "通用",
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
      ProvinceSelector,
    ],
  },
  {
    categoryName: "布局",
    categoryTitle: "Layout",
    components: [
      TitleLocatioEditor,
      IndentEditor,
      InputVariantEditor,
      ShowQuestionNumberEditor,
    ],
  },
  {
    categoryName: "逻辑",
    categoryTitle: "Logic",
    components: [
      VisibleIfEditor,
      EditableIfEditor,
      DefaultValueExpressionEditor,
    ],
  },
];
