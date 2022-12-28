import RadioBinder from "../components/ValueBinder/Radio.vue";
import {
  TitleEditor,
  ShowQuestionNumberEditor,
  TitleLocatioEditor,
  IndentEditor,
  VisibleIfEditor,
} from "./common";

const InnerIndentEditor = () => (
  <RadioBinder
    {...{
      title: "内边距",
      bindName: "innerIndent",
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

export default [
  {
    categoryTitle: "通用",
    categoryName: "General",
    components: [TitleEditor],
  },
  {
    categoryTitle: "布局",
    categoryName: "Layout",
    components: [
      TitleLocatioEditor,
      IndentEditor,
      InnerIndentEditor,
      ShowQuestionNumberEditor,
    ],
  },
  {
    categoryTitle: "逻辑",
    categoryName: "Logic",
    components: [VisibleIfEditor],
  },
];
