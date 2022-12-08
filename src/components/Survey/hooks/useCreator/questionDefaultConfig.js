import { capitalize } from "lodash-es";
import questionTypeEnum, {
  gridCellTypeEnum,
  textTypeEnum,
} from "@survey/util/questionTypeEnum";

const getQuestionDefaultConfig = (questionType, isSubNode) => {
  switch (questionType) {
    case questionTypeEnum.text:
      return {
        inputType: "text",
        inputVariant: "outlined",
        precision: "",
        ...getCommonDefault(isSubNode),
      };
    case questionTypeEnum.radiogroup:
    case questionTypeEnum.checkbox:
    case questionTypeEnum.dropdown:
      return getSelectTypeDefault(isSubNode);
    case questionTypeEnum.file:
      return getCommonDefault(isSubNode);
    case questionTypeEnum.panel:
      return {
        indent: 0,
        showQuestionNumber: false,
        innerIndent: 0,
        title: "",
      };
    case questionTypeEnum.matrixradio:
    case questionTypeEnum.matrixcheckbox:
    case questionTypeEnum.matrixinput:
    case questionTypeEnum.matrixdropdown:
      return getMartixDefault();
    case questionTypeEnum.grid:
      return {
        indent: 0,
        showQuestionNumber: true,
        rows: ["row1", "row2", "row3"],
        columns: getItemsByValues(["column1", "column2"], GridColumnGenerator),
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
  ...getGridCellDefaultConfig(gridCellTypeEnum.text),
});

export const getGridCellDefaultConfig = (cellType) => {
  const config = {
    cellType,
  };
  switch (cellType) {
    case gridCellTypeEnum.input:
      config.inputType = textTypeEnum.text;
      break;
    case gridCellTypeEnum.dropdown:
      config.choices = getItemsByValues(["item1", "item2", "item3"]);
      break;
  }
  return config;
};
