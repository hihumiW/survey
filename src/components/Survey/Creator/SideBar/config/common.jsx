import generateValueBinder from "./generateValueBinder";
import InputBinder from "../components/ValueBinder/Input.vue";
import SelectBinder from "../components/ValueBinder/Select.vue";
import BooleanBinder from "../components/ValueBinder/Boolean.vue";
import RadioBinder from "../components/ValueBinder/Radio.vue";
import { unref } from "vue";
export { default as NameEditor } from "../components/Name/index.vue";

//编辑Title的组件
export const TitleEditor = () => (
  <InputBinder
    {...{
      title: "Title",
      bindName: "title",
      type: "textarea",
    }}
  />
);

//编辑Description的组件
export const DescriptionEditor = () => (
  <InputBinder
    {...{
      title: "Description",
      bindName: "description",
      type: "textarea",
    }}
  />
);
// 是否必填
export const IsRequiredEditor = () => (
  <BooleanBinder
    {...{
      title: "Required",
      bindName: "isRequired",
    }}
  />
);

// 是否只读
export const ReadOnlyEditor = () => (
  <BooleanBinder
    {...{
      title: "Readonly",
      bindName: "readOnly",
    }}
  />
);
// 是否需要显示题目号
export const ShowQuestionNumberEditor = () => (
  <BooleanBinder
    {...{
      title: "Show question number",
      bindName: "showQuestionNumber",
    }}
  />
);
// 标题的位置
export const TitleLocatioEditor = generateValueBinder(
  SelectBinder,
  ({ currentActivePath }) => {
    const isSubNode = unref(currentActivePath).split(".")?.length > 1;
    const options = [
      {
        label: "Top",
        value: "top",
      },
      {
        label: "Left",
        value: "left",
      },
    ];
    if (isSubNode) {
      options.unshift({
        label: "Inherit",
        value: "inherit",
      });
    }
    return {
      title: "Title location",
      bindName: "titleLocation",
      options,
      emptySelectedValue: "top",
    };
  },
  "TitleLocationEditor"
);

export const IndentEditor = () => (
  <RadioBinder
    {...{
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
      defaultValue: 0,
    }}
  />
);

export const VisibleIfEditor = () => (
  <InputBinder
    {...{
      title: "Visible if",
      bindName: "visibleIf",
      type: "textarea",
    }}
  />
);

export const EditableIfEditor = () => (
  <InputBinder
    {...{
      title: "Editable if",
      bindName: "editableIf",
      type: "textarea",
    }}
  />
);

export const RequiredIfEditor = () => (
  <InputBinder
    {...{
      title: "Required if",
      bindName: "requiredIf",
      type: "textarea",
    }}
  />
);

export const DefaultValueExpressionEditor = () => (
  <InputBinder
    {...{
      title: "Default value expression",
      bindName: "defaultExpression",
      type: "textarea",
    }}
  />
);
