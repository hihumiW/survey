import generateValueBinder from "./generateValueBinder";
import SelectBinder from "../components/ValueBinder/Select.vue";
import BooleanBinder from "../components/ValueBinder/Boolean.vue";
import { NameEditor, TitleEditor, VisibleIfEditor } from "./common";

const FontSizeSelect = generateValueBinder(SelectBinder, {
  title: "字体尺寸",
  options: [
    {
      label: "小",
      value: "small",
    },
    {
      label: "普通",
      value: "medium",
    },
    {
      label: "大",
      value: "large",
    },
    {
      label: "很大",
      value: "xlarge",
    },
  ],
  bindName: "fontSize",
});

export const AlignSelect = generateValueBinder(SelectBinder, {
  title: "对齐方式",
  emptySelectedValue: "left",
  options: [
    {
      label: "左对齐",
      value: "left",
    },
    {
      label: "居中对齐",
      value: "center",
    },
    {
      label: "右对齐",
      value: "right",
    },
  ],
  bindName: "textAlign",
});

export const BoldSelector = () => (
  <BooleanBinder
    {...{
      title: "加粗",
      bindName: "bold",
    }}
  />
);

export default [
  {
    categoryTitle: "通用",
    categoryName: "General",
    components: [NameEditor, TitleEditor],
  },
  {
    categoryTitle: "布局",
    categoryName: "Layout",
    components: [FontSizeSelect, AlignSelect, BoldSelector],
  },
  {
    categoryTitle: "逻辑",
    categoryName: "Logic",
    components: [VisibleIfEditor],
  },
];
