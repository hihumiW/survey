import generateValueBinder from "./generateValueBinder";
import InputBinder from "../components/ValueBinder/Input.vue";
import SelectBinder from "../components/ValueBinder/Select.vue";
import BooleanBinder from "../components/ValueBinder/Boolean.vue";
import RadioBinder from "../components/ValueBinder/Radio.vue";
export { default as NameEditor } from "../components/Name/index.vue";

//编辑Title的组件
export const TitleEditor = generateValueBinder(
  InputBinder,
  {
    title: "Title",
    bindName: "title",
    type: "textarea",
  },
  "TitleEditor"
);
//编辑Description的组件
export const DescriptionEditor = generateValueBinder(
  InputBinder,
  {
    title: "Description",
    bindName: "description",
    type: "textarea",
  },
  "DescriptionEditor"
);

// 是否必填
export const IsRequiredEditor = generateValueBinder(
  BooleanBinder,
  {
    title: "Required",
    bindName: "isRequired",
  },
  "IsRequiredEditor"
);

// 是否只读
export const ReadOnlyEditor = generateValueBinder(
  BooleanBinder,
  {
    title: "Readonly",
    bindName: "readOnly",
  },
  "ReadOnlyEditor"
);

// 是否需要显示题目号
export const ShowQuestionNumberEditor = generateValueBinder(
  BooleanBinder,
  {
    title: "Show question number",
    bindName: "showQuestionNumber",
  },
  "ShowQuestionNumberEditor"
);

// 标题的位置
export const TitleLocatioEditor = generateValueBinder(
  SelectBinder,
  {
    title: "Title location",
    bindName: "titleLocation",
    options: [
      {
        label: "Top",
        value: "top",
      },
      {
        label: "Left",
        value: "left",
      },
    ],
  },
  "TitleLocationEditor"
);

export const IndentEditor = generateValueBinder(
  RadioBinder,
  {
    title: "Add indent",
    bindName: "indent",
    options: [
      {
        label: "0",
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
  "IdentEditor"
);

export const VisibleIfEditor = generateValueBinder(
  InputBinder,
  {
    title: "Visible if",
    bindName: "visibleIf",
    type: "textarea",
  },
  "VisibleIfEditor"
);

export const EditableIfEditor = generateValueBinder(
  InputBinder,
  {
    title: "Editable if",
    bindName: "editableIf",
    type: "textarea",
  },
  "EditableIfEditor"
);

export const RequiredIfEditor = generateValueBinder(
  InputBinder,
  {
    title: "Required if",
    bindName: "requiredIf",
    type: "textarea",
  },
  "RequiredIfEditor"
);

export const DefaultValueExpressionEditor = generateValueBinder(
  InputBinder,
  {
    title: "Default value expression",
    bindName: "defaultExpression",
    type: "textarea",
  },
  "DefaultValueExpressionEditor"
);
