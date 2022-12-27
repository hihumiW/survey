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
      title: "题目标题",
      bindName: "title",
      type: "textarea",
    }}
  />
);

//编辑Description的组件
export const DescriptionEditor = () => (
  <InputBinder
    {...{
      title: "描述",
      bindName: "description",
      type: "textarea",
    }}
  />
);
// 是否必填
export const IsRequiredEditor = () => (
  <BooleanBinder
    {...{
      title: "必填",
      bindName: "isRequired",
    }}
  />
);

// 是否只读
export const ReadOnlyEditor = () => (
  <BooleanBinder
    {...{
      title: "只读",
      bindName: "readOnly",
    }}
  />
);
// 是否需要显示题目号
export const ShowQuestionNumberEditor = () => (
  <BooleanBinder
    {...{
      title: "显示题目序号",
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
        label: "顶部",
        value: "top",
      },
      {
        label: "左侧",
        value: "left",
      },
    ];
    if (isSubNode) {
      options.unshift({
        label: "继承自父级",
        value: "inherit",
      });
    }
    return {
      title: "标题位置",
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
      title: "题目缩进",
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
      title: "显示条件",
      bindName: "visibleIf",
      type: "textarea",
    }}
  />
);

export const EditableIfEditor = () => (
  <InputBinder
    {...{
      title: "可编辑条件",
      bindName: "editableIf",
      type: "textarea",
    }}
  />
);

export const RequiredIfEditor = () => (
  <InputBinder
    {...{
      title: "必填条件",
      bindName: "requiredIf",
      type: "textarea",
    }}
  />
);

export const DefaultValueExpressionEditor = () => (
  <InputBinder
    {...{
      title: "默认值表达式",
      bindName: "defaultExpression",
      type: "textarea",
    }}
  />
);
