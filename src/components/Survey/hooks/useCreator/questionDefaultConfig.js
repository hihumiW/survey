import { capitalize } from "lodash-es";
import QuestionTypeEnum from "@survey/util/questionTypeEnum";

const getQuestionDefaultConfig = (questionType, isSubNode) => {
  switch (questionType) {
    case QuestionTypeEnum.text:
      return {
        inputType: "text",
        inputVariant: "outlined",
        precision: "",
        ...getCommonDefault(isSubNode),
      };
    case QuestionTypeEnum.radiogroup:
    case QuestionTypeEnum.checkbox:
    case QuestionTypeEnum.dropdown:
      return getSelectTypeDefault(isSubNode);
    case QuestionTypeEnum.file:
      return getCommonDefault(isSubNode);
    case QuestionTypeEnum.panel:
      return {
        indent: 0,
        showQuestionNumber: false,
        innerIndent: 0,
        title: "",
      };
    case QuestionTypeEnum.matrixradio:
    case QuestionTypeEnum.matrixcheckbox:
    case QuestionTypeEnum.matrixinput:
      return getMartixDefault();
    case QuestionTypeEnum.grid:
      return {
        indent: 0,
        showQuestionNumber: true,
        rows: ["row1", "row2", "row3"],
        columns: getItemsByValues(["column1", "column2"], GridColumnGenerator),
        cells: {
          row1: {
            column1: {
              cellType: "text",
            },
            column2: {
              cellType: "input",
            },
          },
          row2: {
            column1: {
              cellType: "any",
            },
          },
        },
      };
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

const getItemsByValues = (values, generator = getItem) =>
  values.map((value) => generator(value));

export const getItem = (value) => ({
  text: capitalize(value),
  value,
});

export const GridColumnGenerator = (value) => ({
  value,
  text: capitalize(value),
  cellType: "text",
});
