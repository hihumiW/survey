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
  RequiredIfEditor,
  DefaultValueExpressionEditor,
} from "./common";

const ChoicesOrientationEditor = () => (
  <RadioBinder
    {...{
      title: "Choice orientation",
      bindName: "orientation",
      options: [
        {
          label: "Vertical",
          value: "vertical",
        },
        {
          label: "Horizontal",
          value: "horizontal",
        },
      ],
    }}
  />
);

const EnableOtherOptionEditor = () => (
  <BooleanBinder
    {...{
      title: "Enable other option (describe)",
      bindName: "showOtherItem",
    }}
  />
);

const OtherOptionTextEditor = generateValueBinder(
  InputBinder,
  {
    title: "Other option text",
    bindName: "otherText",
  },
  "OtherOptionTextEditor",
  ({ currentActiveItem }) => unref(currentActiveItem).showOtherItem
);

const OtherOptionPlaceholder = generateValueBinder(
  InputBinder,
  {
    title: "Other placeholder",
    bindName: "otherPlaceholder",
  },
  "OtherOptionPlaceholder",
  ({ currentActiveItem }) => unref(currentActiveItem).showOtherItem
);

const isDropDownType = ({ currentActiveItem }) =>
  unref(currentActiveItem).type === questionTypeEnum.dropdown;

export const DropdownPlaceholder = () => (
  <InputBinder title="Dropdown placeholder" bindName="dropdownPlaceholder" />
);

const DropDownPlaceholderEditor = generateConditionComp(
  DropdownPlaceholder,
  {},
  "DropDownPlaceholderEditor",
  isDropDownType
);

export default [
  {
    categoryName: "General",
    categoryTitle: "General",
    components: [NameEditor, TitleEditor, IsRequiredEditor, ReadOnlyEditor],
  },
  {
    categoryName: "Choices",
    categoryTitle: "Choices",
    components: [
      () => <ChoicesEditor showScore />,
      DropDownPlaceholderEditor,
      EnableOtherOptionEditor,
      OtherOptionTextEditor,
      OtherOptionPlaceholder,
    ],
  },
  {
    categoryName: "Layout",
    categoryTitle: "Layout",
    components: [
      TitleLocatioEditor,
      IndentEditor,
      ChoicesOrientationEditor,
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
