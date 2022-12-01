import { capitalize } from "lodash-es";
const getQuestionDefaultConfig = (questionType, isSubNode) => {
  switch (questionType) {
    case "text":
      return {
        inputType: "text",
        inputVariant: "outlined",
        precision: "",
        ...getCommonDefault(isSubNode),
      };
    case "radiogroup":
    case "checkbox":
    case "dropdown":
      return getSelectTypeDefault(isSubNode);
    case "file":
      return getCommonDefault(isSubNode);
    case "panel":
      return {
        indent: 0,
        showQuestionNumber: false,
        innerIndent: 0,
        title: "",
      };
    case "matrix":
      return getMartixDefault();
  }
};

export default getQuestionDefaultConfig;

const getCommonDefault = (isSubNode) => {
  const config = {
    indent: 0,
    titleLocation: "top",
    showQuestionNumber: true,
  };
  //如果是subNode（Panel下的节点，titleLocation 默认跟随Panel的布局）
  if (isSubNode) {
    config.titleLocation = "inherit";
  }
  return config;
};

const getSelectTypeDefault = (isSubNode) => ({
  ...getCommonDefault(isSubNode),
  orientation: "vertical",
  choices: getItemsByValues(["item1", "item2", "item3"]),
});

const getMartixDefault = () => ({
  indent: 0,
  showQuestionNumber: true,
  rows: getItemsByValues(["row1", "row2"]),
  columns: getItemsByValues(["column1", "column2"]),
});

const getItemsByValues = (values) =>
  values.map((value) => ({
    text: capitalize(value),
    value,
  }));
