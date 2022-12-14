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
      title: "Add inner indent",
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
    categoryName: "General",
    categoryTitle: "General",
    components: [TitleEditor],
  },
  {
    categoryName: "Layout",
    categoryTitle: "Layout",
    components: [
      TitleLocatioEditor,
      IndentEditor,
      InnerIndentEditor,
      ShowQuestionNumberEditor,
    ],
  },
  {
    categoryName: "Logic",
    categoryTitle: "Logic",
    components: [VisibleIfEditor],
  },
];
