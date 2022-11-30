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
  choices: [
    {
      value: "item1",
      text: "item1",
    },
    {
      value: "item2",
      text: "item2",
    },
    {
      value: "item3",
      text: "item3",
    },
  ],
});
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
        ...getCommonDefault(),
        showQuestionNumber: false,
        title: "",
        innerIndent: 0,
      };
  }
};

export default getQuestionDefaultConfig;
